export const PyScript: string = `
import pandas as pd
import zipfile

def process(sessionId):
    yield donate(f"{sessionId}-tracking", '[{ "message": "user entered script" }]')

    platforms = ["Twitter", "Facebook", "Instagram", "Youtube"]

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
        data = None
        while True:
            meta_data.append(("debug", f"{platform}: prompt file"))
            promptFile = prompt_file(platform, "application/zip, text/plain")
            fileResult = yield render_donation_page(platform, promptFile, progress)
            if fileResult.__type__ == 'PayloadString':
                meta_data.append(("debug", f"{platform}: extracting file"))
                extractionResult = doSomethingWithTheFile(platform, fileResult.value)
                if extractionResult != 'invalid':                
                    meta_data.append(("debug", f"{platform}: extraction successful, go to consent form")) 
                    data = extractionResult
                    break
                else:
                    meta_data.append(("debug", f"{platform}: prompt confirmation to retry file selection")) 
                    retry_result = yield render_donation_page(platform, retry_confirmation(platform), progress)
                    if retry_result.__type__ == 'PayloadTrue':
                        meta_data.append(("debug", f"{platform}: skip due to invalid file")) 
                        continue
                    else:   
                        meta_data.append(("debug", f"{platform}: retry prompt file")) 
                        break
            else:
                meta_data.append(("debug", f"{platform}: skip to next step")) 
                break

        # STEP 2: ask for consent
        progress += step_percentage
        if data is not None:
            meta_data.append(("debug", f"{platform}: prompt consent"))
            prompt = prompt_consent(platform, data, meta_data)
            consent_result = yield render_donation_page(platform, prompt, progress)
            if consent_result.__type__ == "PayloadJSON":
                meta_data.append(("debug", f"{platform}: donate consent data"))
                yield donate(f"{sessionId}-{platform}", consent_result.value)

    yield render_end_page()


def render_end_page():
    page = PropsUIPageEnd()
    return CommandUIRender(page)


def render_donation_page(platform, body, progress):
    header = PropsUIHeader(Translatable({
        "en": platform,
        "nl": platform
    }))

    footer = PropsUIFooter(progress)
    page = PropsUIPageDonation(platform, header, body, footer)
    return CommandUIRender(page)


def retry_confirmation(platform):
    text = Translatable({
        "en": f"We can not process your {platform} file, please try again if you want to choose another file.",
        "nl": f"We kunnen uw {platform} bestand niet verwerken, probeer opnieuw als u een ander bestand wilt kiezen."
    })
    ok = Translatable({
        "en": "Try again",
        "nl": "Probeer opnieuw"
    })
    cancel = Translatable({
        "en": "Continue",
        "nl": "Verder"
    })
    return PropsUIPromptConfirm(text, ok, cancel)


def prompt_file(platform, extensions):
    description = Translatable({
        "en": "Please select this file so we can extract relevant information for our research.",
        "nl": "Je kan deze file nu selecteren zodat wij er relevante informatie uit kunnen halen voor ons onderzoek."
    })

    return PropsUIPromptFileInput(description, extensions)


def doSomethingWithTheFile(platform, filename):
    return extract_zip_contents(filename)


def extract_zip_contents(filename):
    names = []
    try:
        file = zipfile.ZipFile(filename)
        data = []
        for name in file.namelist():
            names.append(name)
            info = file.getinfo(name)
            data.append((name, info.compress_size, info.file_size))
        return data
    except:
        return "invalid"        


def prompt_consent(id, data, meta_data):

    table_title = Translatable({
        "en": "Zip file contents",
        "nl": "Inhoud zip bestand"
    })

    log_title = Translatable({
        "en": "Log messages",
        "nl": "Log berichten"
    })

    data_frame = pd.DataFrame(data, columns=["filename", "compressed size", "size"])
    table = PropsUIPromptConsentFormTable("zip_content", table_title, data_frame)
    meta_frame = pd.DataFrame(meta_data, columns=["type", "message"])
    meta_table = PropsUIPromptConsentFormTable("log_messages", log_title, meta_frame)
    return PropsUIPromptConsentForm([table], [meta_table])


def donate(key, json_string):
    return CommandSystemDonate(key, json_string)
`
