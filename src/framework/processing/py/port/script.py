import logging
import json
import io

import pandas as pd

import port.api.props as props
import port.unzipddp as unzipddp
import port.netflix as netflix
from port.api.commands import (CommandSystemDonate, CommandUIRender)

LOG_STREAM = io.StringIO()

logging.basicConfig(
    stream=LOG_STREAM,
    level=logging.INFO,
    format="%(asctime)s --- %(name)s --- %(levelname)s --- %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S%z",
)

LOGGER = logging.getLogger("script")

TABLE_TITLES = {
    "netflix_ratings": props.Translatable(
        {
            "en": "Ratings you gave according to Netlix:",
            "nl": "Jouw beoordelingen volgens Netflix:",
        }
    ),
}


def process(session_id):
    LOGGER.info("Starting the donation flow")
    yield donate_logs(f"{session_id}-tracking")

    # progress in %
    subflows = 1
    steps = 2
    step_percentage = (100 / subflows) / steps
    progress = 0
    progress += step_percentage

    platform_name = "Netflix"
    data = None

    while True:
        LOGGER.info("Prompt for file for %s", platform_name)
        yield donate_logs(f"{session_id}-tracking")

        promptFile = prompt_file("application/zip, text/plain", platform_name)
        file_result = yield render_donation_page(platform_name, promptFile, progress)
        selected_user = ""

        if file_result.__type__ == "PayloadString":
            validation = netflix.validate_zip(file_result.value)

            # Flow logic
            # Happy flow: Valid DDP, user could be selected
            # Retry flow 1: No user was selected, cause could be for multiple reasons see code
            # Retry flow 2: No valid Netflix DDP was found
            # Retry flows are separated for clarity and you can provide different messages to the user

            if validation.ddp_category is not None:
                LOGGER.info("Payload for %s", platform_name)
                yield donate_logs(f"{session_id}-tracking")

                # Extract the user
                users = extract_users(file_result.value)
                if len(users) == 1:
                    selected_user = users[0]
                    extraction_result = extract_netflix(file_result.value, selected_user)
                    data = extraction_result
                elif len(users) > 1:
                    selection = yield prompt_radio_menu_select_username(users, progress)
                    # If user skips during this process, selected_user remains equal to ""
                    if selection.__type__ == "PayloadString":
                        selected_user = selection.value
                        extraction_result = extract_netflix(file_result.value, selected_user)
                        data = extraction_result
                    else:
                        LOGGER.info("User skipped during user selection")
                        pass
                else:
                    LOGGER.info("No users could be found in DDP")
                    pass

            # Enter retry flow, reason: if DDP was not a Netflix DDP
            if validation.ddp_category is None:
                LOGGER.info("Not a valid %s zip; No payload; prompt retry_confirmation", platform_name)
                yield donate_logs(f"{session_id}-tracking")
                retry_result = yield render_donation_page(platform_name, retry_confirmation(platform_name), progress)

                if retry_result.__type__ == "PayloadTrue":
                    continue
                else:
                    LOGGER.info("Skipped during retry ending flow")
                    yield donate_logs(f"{session_id}-tracking")
                    break

            # Enter retry flow, reason: valid DDP but no users could be extracted
            if selected_user == "":
                LOGGER.info("Selected user is empty after selection, enter retry flow")
                yield donate_logs(f"{session_id}-tracking")
                retry_result = yield render_donation_page(platform_name, retry_confirmation(platform_name), progress)

                if retry_result.__type__ == "PayloadTrue":
                    continue
                else:
                    LOGGER.info("Skipped during retry ending flow")
                    yield donate_logs(f"{session_id}-tracking")
                    break

        else:
            LOGGER.info("Skipped at file selection ending flow")
            yield donate_logs(f"{session_id}-tracking")
            break

        # STEP 2: ask for consent
        progress += step_percentage

        if data is not None:
            LOGGER.info("Prompt consent; %s", platform_name)
            yield donate_logs(f"{session_id}-tracking")
            prompt = prompt_consent(platform_name, data)
            consent_result = yield render_donation_page(platform_name, prompt, progress)

            if consent_result.__type__ == "PayloadJSON":
                LOGGER.info("Data donated; %s", platform_name)
                yield donate_logs(f"{session_id}-tracking")
                yield donate(platform_name, consent_result.value)
            else:
                LOGGER.info("Skipped ater reviewing consent: %s", platform_name)
                yield donate_logs(f"{session_id}-tracking")

            break

    yield render_end_page()


##################################################################
# helpers

def prompt_consent(platform_name, data):
    """
    Assembles all donated data in consent form tables
    data is the result from extract_netflix()
    """
    table_list = []

    for k, v in data.items():
        df = v["data"]
        table = props.PropsUIPromptConsentFormTable(f"{platform_name}_{k}", v["title"], df)
        table_list.append(table)

    return props.PropsUIPromptConsentForm(table_list, [])


def return_empty_result_set():
    result = {}

    df = pd.DataFrame(["No data found"], columns=["No data found"])
    result["empty"] = {"data": df, "title": TABLE_TITLES["empty_result_set"]}

    return result


def donate_logs(key):
    log_string = LOG_STREAM.getvalue()  # read the log stream
    if log_string:
        log_data = log_string.split("\n")
    else:
        log_data = ["no logs"]

    return donate(key, json.dumps(log_data))


def extract_users(netflix_zip):
    """
    Reads viewing activity and extracts users from the first column
    returns list[str]
    """
    b = unzipddp.extract_file_from_zip(netflix_zip, "ViewingActivity.csv")
    df = unzipddp.read_csv_from_bytes_to_df(b)
    users = netflix.extract_users_from_df(df)
    return users


def prompt_radio_menu_select_username(users, progress):
    """
    Prompt selection menu to select which user you are
    """

    title = props.Translatable({ "en": "Select", "nl": "Select" })
    description = props.Translatable({ "en": "Please select your username", "nl": "Selecteer uw gebruikersnaam" })
    header = props.PropsUIHeader(props.Translatable({"en": "Select", "nl": "Select"}))

    radio_items = [{"id": i, "value": username} for i, username in enumerate(users)]
    body = props.PropsUIPromptRadioInput(title, description, radio_items)
    footer = props.PropsUIFooter(progress)

    page = props.PropsUIPageDonation("Netflix", header, body, footer)

    return CommandUIRender(page)


##################################################################
# Extraction functions

def extract_netflix(netflix_zip, selected_user):
    """
    Main data extraction function
    Assemble all extraction logic here, results are stored in a dict
    """
    result = {}

    # Extract the ratings
    ratings_bytes = unzipddp.extract_file_from_zip(netflix_zip, "Ratings.csv")
    df = unzipddp.read_csv_from_bytes_to_df(ratings_bytes)
    if not df.empty:
        df = netflix.filter_user(df, selected_user)
        result["ratings"] = {"data": df, "title": TABLE_TITLES["netflix_ratings"]}

    # Extract the viewing activity
    viewing_activity_bytes = unzipddp.extract_file_from_zip(netflix_zip, "ViewingActivity.csv")
    df = unzipddp.read_csv_from_bytes_to_df(viewing_activity_bytes)

    if not df.empty:
        df = netflix.filter_user(df, selected_user)
        df_list = netflix.split_dataframe(df, 5000)
        for i, df in enumerate(df_list):
            index = i + 1
            title_translatable = props.Translatable(
                {
                    "en": f"Your viewing activity according to Netlix {index}:",
                    "nl": f"Jouw kijk activiteit volgens Netflix {index}:",
                }
            )
            result[f"viewing_activity_{index}"] = {"data": df, "title": title_translatable}

    return result


##########################################
# Functions provided by Eyra did not change

def render_end_page():
    page = props.PropsUIPageEnd()
    return CommandUIRender(page)


def render_donation_page(platform, body, progress):
    header = props.PropsUIHeader(props.Translatable({"en": platform, "nl": platform}))

    footer = props.PropsUIFooter(progress)
    page = props.PropsUIPageDonation(platform, header, body, footer)
    return CommandUIRender(page)


def retry_confirmation(platform):
    text = props.Translatable(
        {
            "en": f"Unfortunately, we could not process your {platform} file. If you are sure that you selected the correct file, press Continue. To select a different file, press Try again.",
            "nl": f"Helaas, kunnen we uw {platform} bestand niet verwerken. Weet u zeker dat u het juiste bestand heeft gekozen? Ga dan verder. Probeer opnieuw als u een ander bestand wilt kiezen."
        }
    )
    ok = props.Translatable({"en": "Try again", "nl": "Probeer opnieuw"})
    cancel = props.Translatable({"en": "Continue", "nl": "Verder"})
    return props.PropsUIPromptConfirm(text, ok, cancel)


def prompt_file(extensions, platform):
    description = props.Translatable(
        {
            "en": f"Please follow the download instructions and choose the file that you stored on your device. Click “Skip” at the right bottom, if you do not have a file from {platform}.",
            "nl": f"Volg de download instructies en kies het bestand dat u opgeslagen heeft op uw apparaat. Als u geen {platform} bestand heeft klik dan op “Overslaan” rechts onder."
        }
    )
    return props.PropsUIPromptFileInput(description, extensions)


def donate(key, json_string):
    return CommandSystemDonate(key, json_string)
