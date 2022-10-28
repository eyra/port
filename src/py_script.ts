export const PyScript: string = `
import pandas as pd
import zipfile

def process():
    yield render_start_page()

    platforms = ["Twitter", "Instagram", "Youtube"]
    for index, platform in enumerate(platforms):
        meta_data = []        
        meta_data.append(("debug", f"{platform}: start"))

        data = None
        while True:
            meta_data.append(("debug", f"{platform}: prompt file"))
            promptFile = prompt_file(platform, "application/zip, text/plain")
            fileResult = yield render_donation_page(index+1, platform, promptFile)
            if fileResult.__type__ == 'PayloadString':
                meta_data.append(("debug", f"{platform}: extracting file"))
                extractionResult = doSomethingWithTheFile(platform, fileResult.value)
                if extractionResult != 'invalid':                
                    meta_data.append(("debug", f"{platform}: extraction successful, go to consent form")) 
                    data = extractionResult
                    break
                else:
                    meta_data.append(("debug", f"{platform}: prompt confirmation to retry file selection")) 
                    retry_result = yield render_donation_page(index+1, platform, retry_confirmation())
                    if retry_result.__type__ == 'PayloadTrue':
                        meta_data.append(("debug", f"{platform}: skip due to invalid file")) 
                        continue
                    else:   
                        meta_data.append(("debug", f"{platform}: retry prompt file")) 
                        break
            else:
                meta_data.append(("debug", f"{platform}: skip to next step")) 
                break

        if data is not None:
            meta_data.append(("debug", f"{platform}: prompt consent"))
            prompt = prompt_consent(platform, data, meta_data)
            consent_result = yield render_donation_page(index+1, platform, prompt)
            if consent_result.__type__ == "PayloadJSON":
                meta_data.append(("debug", f"{platform}: donate consent data"))
                yield donate(platform, consent_result.value)

    yield render_end_page()


def render_start_page():
    page = PropsUIPageStart()
    return CommandUIRender(page)


def render_end_page():
    header = PropsUIHeader(Translatable({
        "en": "Thank you",
        "nl": "Dank je wel"
    }))
    page = PropsUIPageEnd(header)
    return CommandUIRender(page)


def render_donation_page(index, platform, body):
    header = PropsUIHeader(Translatable({
        "en": f"Step {index}: {platform}",
        "nl": f"Stap {index}: {platform}"
    }))
    page = PropsUIPageDonation(header, body, spinner())
    return CommandUIRender(page)


def retry_confirmation():
    text = Translatable({
        "en": "The selected file is invalid. Do you want to select a different file?",
        "nl": "Het geselecteerde bestaand is ongeldig. Wil je een ander bestand selecteren ?"
    })
    ok = Translatable({
        "en": "Different file",
        "nl": "Ander bestand"
    })
    cancel = Translatable({
        "en": "Cancel",
        "nl": "Annuleren"
    })
    return PropsUIPromptConfirm(text, ok, cancel)


def spinner():
    return PropsUISpinner(Translatable({
        "en": "One moment please",
        "nl": "Een moment geduld"
    }))


def prompt_file(platform, extensions):
    title = Translatable({
        "en": f"Select {platform} file",
        "nl": f"Selecteer {platform} bestand"
    })

    description = Translatable({
        "en": "Please select this file so we can extract relevant information for our research.",
        "nl": "Je kan deze file nu selecteren zodat wij er relevante informatie uit kunnen halen voor ons onderzoek."
    })

    return PropsUIPromptFileInput(title, description, extensions)


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
    title = Translatable({
        "en": "Extracted data",
        "nl": "Gevonden gegevens"
    })

    description = Translatable({
        "en": "Please have a good look at the extracted data before giving consent to use this data.",
        "nl": "Bekijk de gegevens goed voordat je consent geeft om deze te gebruiken."
    })

    data_frame = pd.DataFrame(data, columns=["filename", "compressed size", "size"])
    table = PropsUIPromptConsentFormTable("zip_content", "The zip contains the following files:", data_frame)
    meta_frame = pd.DataFrame(meta_data, columns=["type", "message"])
    meta_table = PropsUIPromptConsentFormTable("log_messages", "Log messages:", meta_frame)
    return PropsUIPromptConsentForm(title, description, [table], [meta_table])


def donate(key, json_string):
    return CommandSystemDonate(key, json_string)
`
