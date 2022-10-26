export const PyScript: string = `
import pandas as pd
import zipfile

def process():
    yield render_start_page()

    platforms = ["Twitter", "Instagram", "Youtube"]
    for index, platform in enumerate(platforms):
        data = None
        while True:
            promptFile = prompt_file(platform, "application/zip, text/plain")
            fileResult = yield render_donation_page(index+1, platform, promptFile)
            if fileResult.__type__ == 'PayloadString':
                extractionResult = doSomethingWithTheFile(platform, fileResult.value)
                if extractionResult != 'invalid':
                    data = extractionResult
                    break
                else:
                    retry_result = yield render_donation_page(index+1, platform, retry_confirmation())
                    if retry_result.__type__ == 'PayloadTrue':
                        continue
                    else:    
                        break
            else:
                break

        if data is not None:
            prompt = prompt_consent(platform, data)
            consent_result = yield render_donation_page(index+1, platform, prompt)
            if consent_result.__type__ == "PayloadString":
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


def prompt_consent(id, data):
    title = Translatable({
        "en": "Extracted data",
        "nl": "Gevonden gegevens"
    })

    description = Translatable({
        "en": "Please have a good look at the extracted data before giving consent to use this data.",
        "nl": "Bekijk de gegevens goed voordat je consent geeft om deze te gebruiken."
    })

    data_frame = pd.DataFrame(data, columns=["filename", "compressed size", "size"])
    table = PropsUIPromptConsentFormTable(id, "The zip contains the following files:", data_frame)
    return PropsUIPromptConsentForm(title, description, [table])


def donate(key, consent_data):
    return CommandSystemDonate(key, consent_data)
`
