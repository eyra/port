import port.api.props as props
from port.api.commands import (CommandSystemDonate, CommandUIRender)
import port.whatsapp

def process(sessionId):
    yield donate(f"{sessionId}-tracking", '[{ "message": "user entered script" }]')

    platforms = ["Whatsapp","Whatsapp","Whatsapp","Whatsapp","Whatsapp"]

    subflows = len(platforms)
    steps = 2
    step_percentage = (100/subflows)/steps
    counter = 0
    # progress in %
    progress = 0

    for _, platform in enumerate(platforms):

        data = None
        progress += step_percentage
        counter = counter + 1

        while True:
            promptFile = prompt_file(platform, "application/zip, text/plain")
            fileResult = yield render_donation_page(platform, counter, promptFile, progress)
            if fileResult.__type__ == 'PayloadString':

                df_with_chats = port.whatsapp.parse_chat(fileResult.value)

                # If data extracted was successful
                if not df_with_chats.empty:

                    df_with_chats = port.whatsapp.remove_empty_chats(df_with_chats)
                    selection = yield prompt_radio_menu(platform, progress, df_with_chats)

                    # steps after selection
                    df_with_chats = port.whatsapp.filter_username(df_with_chats, selection.value)
                    df_with_chats = port.whatsapp.remove_name_column(df_with_chats)
                    data = df_with_chats
                    break
                # If not enter retry flow
                else:
                    retry_result = yield render_donation_page(platform, counter, retry_confirmation(platform), progress)
                    if retry_result.__type__ == "PayloadTrue":
                        continue
                    else:
                        break
            else:
                break

        # STEP 2: ask for consent
        progress += step_percentage
        if not (data is None):
            prompt = prompt_consent(data)
            consent_result = yield render_donation_page(platform, counter, prompt, progress)
            if consent_result.__type__ == "PayloadJSON":
                yield donate(f"{sessionId}-{platform}", consent_result.value)

    yield render_end_page()



def prompt_radio_menu(platform, progress, df_with_chats):

    title = props.Translatable({
        "en": f"Title",
        "nl": f"Title"
    })
    description = props.Translatable({
        "en": f"Description",
        "nl": f"Description"
    })
    header = props.PropsUIHeader(props.Translatable({
        "en": "Header",
        "nl": "Header"
    }))

    list_with_users = port.whatsapp.extract_users(df_with_chats)
    radio_input = [{"id": index, "value": username} for index, username in enumerate(list_with_users)]
    body = props.PropsUIPromptRadioInput(title, description, radio_input)
    footer = props.PropsUIFooter(progress)
    page = props.PropsUIPageDonation(platform, header, body, footer)
    return CommandUIRender(page)


def render_end_page():
    page = props.PropsUIPageEnd()
    return CommandUIRender(page)


def render_donation_page(platform,counter, body, progress):
    header = props.PropsUIHeader(props.Translatable({
        "en": platform + ' Conversation ' + str(counter),
        "nl": platform + ' Conversatie ' + str(counter)
    }))

    # radiobutton = props.PropsUIPromptRadioInput("bla","desc","itemssss")

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



def prompt_consent(data_frame):

    table_title = props.Translatable({
        "en": "Zip file contents",
        "nl": "Inhoud zip bestand"
    })

    table = props.PropsUIPromptConsentFormTable("zip_content", table_title, data_frame)
    return props.PropsUIPromptConsentForm([table], [])


def donate(key, json_string):
    return CommandSystemDonate(key, json_string)
