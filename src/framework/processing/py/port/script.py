import zipfile
import logging

import pandas as pd

import port.api.props as props
from port.api.commands import (CommandSystemDonate, CommandUIRender)
import port.whatsapp

def process(sessionId):
    yield donate(f"{sessionId}-tracking", '[{ "message": "user entered script" }]')

    platforms = ["Whatsapp"]

    subflows = len(platforms)
    steps = 2
    step_percentage = (100/subflows)/steps

    # progress in %
    progress = 0

    for index, platform in enumerate(platforms):
        meta_data = []
        meta_data.append(("debug", f"{platform}: start"))

        # STEP 1: select the file
        progress += step_percentage

        while True:
            meta_data.append(("debug", f"{platform}: prompt file"))
            promptFile = prompt_file(platform, "application/zip, text/plain")
            fileResult = yield render_donation_page(platform, promptFile, progress)
            if fileResult.__type__ == 'PayloadString':
                meta_data.append(("debug", f"{platform}: extracting file"))

                df_with_chats = port.whatsapp.parse_chat(fileResult.value)

                if not df_with_chats.empty:
                    meta_data.append(("debug", f"{platform}: extraction successful, go to consent form"))
                    df_with_chats = port.whatsapp.remove_empty_chats(df_with_chats)

                    break
                #else:
                #    meta_data.append(("debug", f"{platform}: prompt confirmation to retry file selection"))
                #    retry_result = yield render_donation_page(platform, retry_confirmation(platform), progress)
                #    if retry_result.__type__ == 'PayloadTrue':
                #        meta_data.append(("debug", f"{platform}: skip due to invalid file"))
                #        continue
                #    else:
                #        meta_data.append(("debug", f"{platform}: retry prompt file"))
                #        break
                else:
                    print("CRASHHHHH")
            else:
                meta_data.append(("debug", f"{platform}: skip to next step"))
                break

        # STEP 2: ask for consent
        progress += step_percentage
        if not df_with_chats.empty:
            meta_data.append(("debug", f"{platform}: prompt consent"))
            prompt = prompt_consent(platform, df_with_chats, meta_data)
            consent_result = yield render_donation_page(platform, prompt, progress)
            if consent_result.__type__ == "PayloadJSON":
                meta_data.append(("debug", f"{platform}: donate consent data"))
                yield donate(f"{sessionId}-{platform}", consent_result.value)

    yield render_end_page()


def render_end_page():
    page = props.PropsUIPageEnd()
    return CommandUIRender(page)


def render_donation_page(platform, body, progress):
    header = props.PropsUIHeader(props.Translatable({
        "en": platform,
        "nl": platform
    }))

    footer = props.PropsUIFooter(progress)
    page = props.PropsUIPageDonation(platform, header, body, footer)
    return CommandUIRender(page)


def retry_confirmation(platform):
    text = props.Translatable({
        "en": f"Unfortunately, we cannot process your {platform} file. Continue, if you are sure that you selected the right file. Try again to select a different file.",
        "nl": f"Helaas, kunnen we uw {platform} bestand niet verwerken. Weet u zeker dat u het juiste bestand heeft gekozen? Ga dan verder. Probeer opnieuw als u een ander bestand wilt kiezen."
    })
    ok = props.Translatable({
        "en": "Try again",
        "nl": "Probeer opnieuw"
    })
    cancel = props.Translatable({
        "en": "Continue",
        "nl": "Verder"
    })
    return props.PropsUIPromptConfirm(text, ok, cancel)


def prompt_file(platform, extensions):
    description = props.Translatable({
        "en": f"Please follow the download instructions and choose the file that you stored on your device. Click “Skip” at the right bottom, if you do not have a {platform} file. ",
        "nl": f"Volg de download instructies en kies het bestand dat u opgeslagen heeft op uw apparaat. Als u geen {platform} bestand heeft klik dan op “Overslaan” rechts onder."
    })

    return props.PropsUIPromptFileInput(description, extensions)



def prompt_consent(id, data_frame, meta_data):

    table_title = props.Translatable({
        "en": "Zip file contents",
        "nl": "Inhoud zip bestand"
    })

    log_title = props.Translatable({
        "en": "Log messages",
        "nl": "Log berichten"
    })

    table = props.PropsUIPromptConsentFormTable("zip_content", table_title, data_frame)
    meta_frame = pd.DataFrame(meta_data, columns=["type", "message"])
    meta_table = props.PropsUIPromptConsentFormTable("log_messages", log_title, meta_frame)
    return props.PropsUIPromptConsentForm([table], [meta_table])


def donate(key, json_string):
    return CommandSystemDonate(key, json_string)
