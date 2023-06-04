import logging
import json
import io

import pandas as pd

import port.api.props as props
import port.helpers as helpers
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
    table_list = None

    while True:
        LOGGER.info("Prompt for file for %s", platform_name)
        yield donate_logs(f"{session_id}-tracking")

        promptFile = prompt_file("application/zip, text/plain", platform_name)
        file_result = yield render_donation_page(platform_name, promptFile, progress)
        selected_user = ""

        if file_result.__type__ == "PayloadString":
            validation = netflix.validate_zip(file_result.value)

            # Flow logic
            # Happy flow: Valid DDP, user was set selected
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
                    table_list = extraction_result
                elif len(users) > 1:
                    selection = yield prompt_radio_menu_select_username(users, progress)
                    if selection.__type__ == "PayloadString":
                        selected_user = selection.value
                        extraction_result = extract_netflix(file_result.value, selected_user)
                        table_list = extraction_result
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

        if table_list is not None:
            LOGGER.info("Prompt consent; %s", platform_name)
            yield donate_logs(f"{session_id}-tracking")
            prompt = create_consent_form(table_list)
            consent_result = yield render_donation_page(platform_name, prompt, progress)

            if consent_result.__type__ == "PayloadJSON":
                LOGGER.info("Data donated; %s", platform_name)
                yield donate(platform_name, consent_result.value)
                yield donate_logs(f"{session_id}-tracking")
            else:
                LOGGER.info("Skipped ater reviewing consent: %s", platform_name)
                yield donate_logs(f"{session_id}-tracking")

            break

    yield render_end_page()


##################################################################

def create_consent_form(table_list: list[props.PropsUIPromptConsentFormTable]) -> props.PropsUIPromptConsentForm:
    """
    Assembles all donated data in consent form to be displayed
    """
    return props.PropsUIPromptConsentForm(table_list, meta_tables=[], visualizations=specify_visualizations())


def create_consent_form_tables(unique_table_id: str, title: props.Translatable, df: pd.DataFrame) -> list[props.PropsUIPromptConsentFormTable]:
    """
    This function chunks extracted data into tables of 5000 rows that can be renderd on screen

    COMMENT: is chunking necessary? I don't think it matters how many rows a table has as long as UI doesn't render it all at once
    """

    df_list = helpers.split_dataframe(df, 5000)
    out = []

    if len(df_list) == 1:
        table = props.PropsUIPromptConsentFormTable(unique_table_id, title, df_list[0])
        out.append(table)
    else:
        for i, df in enumerate(df_list):
            index = i + 1
            title_with_index = props.Translatable({lang: f"{val} {index}" for lang, val in title.translations.items()})
            table = props.PropsUIPromptConsentFormTable(f"{unique_table_id}_{index}", title_with_index, df)
            out.append(table)

    return out

def create_consent_form_visualization(unique_vis_id: str, title: props.Translatable, df: pd.DataFrame, settings: dict) -> props.PropsUIDataVisualization:
    """
    This function creates a visualization of the extracted data
    """
    return props.PropsUIDataVisualization(unique_vis_id, title, df, settings)

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
# Extraction function

def extract_netflix(netflix_zip: str, selected_user: str) -> list[props.PropsUIPromptConsentFormTable]:
    """
    Main data extraction function
    Assemble all extraction logic here, results are stored in a dict

    COMMENT: does this also make sense as the place to formulate data visualizations?
    """
    tables_to_render = []
    
    # Extract the ratings
    df = netflix.ratings_to_df(netflix_zip, selected_user)
    if not df.empty:
        table_title = props.Translatable({"en": "Netflix ratings", "nl": "Netflix ratings"})
        tables = create_consent_form_tables("netflix_ratings", table_title, df) 
        tables_to_render.extend(tables)

    # Extract the viewing activity
    df = netflix.viewing_activity_to_df(netflix_zip, selected_user)
    if not df.empty:
        table_title = props.Translatable({"en": "Netflix viewings", "nl": "Netflix viewings"})
        tables = create_consent_form_tables("netflix_viewings", table_title, df) 
        tables_to_render.extend(tables)
    
    # Extract the clickstream
    df = netflix.clickstream_to_df(netflix_zip, selected_user)
    if not df.empty:
        table_title = props.Translatable({"en": "Netflix clickstream", "nl": "Netflix clickstream"})
        tables = create_consent_form_tables("netflix_clickstream", table_title, df) 
        tables_to_render.extend(tables)

    # Extract my list
    df = netflix.my_list_to_df(netflix_zip, selected_user)
    if not df.empty:
        table_title = props.Translatable({"en": "Netflix bookmarks", "nl": "Netflix bookmarks"})
        tables = create_consent_form_tables("netflix_my_list", table_title, df) 
        tables_to_render.extend(tables)

    # Extract Indicated preferences
    df = netflix.my_list_to_df(netflix_zip, selected_user)
    if not df.empty:
        table_title = props.Translatable({"en": "Netflix indicated preferences", "nl": "Netflix indicated preferences"})
        tables = create_consent_form_tables("netflix_indicated_preferences", table_title, df) 
        tables_to_render.extend(tables)

    # Extract playback related events
    df = netflix.playback_related_events_to_df(netflix_zip, selected_user)
    if not df.empty:
        table_title = props.Translatable({"en": "Netflix playback related events", "nl": "Netflix playback related events"})
        tables = create_consent_form_tables("netflix_playback", table_title, df) 
        tables_to_render.extend(tables)

    # Extract search history
    df = netflix.search_history_to_df(netflix_zip, selected_user)
    if not df.empty:
        table_title = props.Translatable({"en": "Netflix search history", "nl": "Netflix search history"})
        tables = create_consent_form_tables("netflix_search", table_title, df) 
        tables_to_render.extend(tables)

    # Extract messages sent by netflix
    df = netflix.messages_sent_by_netflix_to_df(netflix_zip, selected_user)
    if not df.empty:
        table_title = props.Translatable({"en": "Netflix messages", "nl": "Netflix messages"})
        tables = create_consent_form_tables("netflix_messages", table_title, df) 
        tables_to_render.extend(tables)

    return tables_to_render


def extract_users(netflix_zip):
    """
    Reads viewing activity and extracts users from the first column
    returns list[str]
    """
    b = unzipddp.extract_file_from_zip(netflix_zip, "ViewingActivity.csv")
    df = unzipddp.read_csv_from_bytes_to_df(b)
    users = netflix.extract_users_from_df(df)
    return users


##################################################################
# Visualization settings

def specify_visualizations():
    settings = dict(type="keyword_frequency", keyword="title")
    most_viewed = props.PropsUIDataVisualization(id="netflix_viewings", settings=settings)

    return [most_viewed]


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
