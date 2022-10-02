export const PyScript: string = `
import pandas as pd


def process():
    chat_file_name = yield prompt_file()
    usernames = extract_usernames(chat_file_name)
    username = yield prompt_radio(usernames)
    yield result(usernames, username)


def prompt_file():
    title = Translatable()
    title.add("en", "Step 1: Select the chat file")
    title.add("nl", "Stap 1: Selecteer het chat file")

    description = Translatable()
    description.add("en", "We previously asked you to export a chat file from Whatsapp. Please select this file so we can extract relevant information for our research.")
    description.add("nl", "We hebben je gevraagd een chat bestand te exporteren uit Whatsapp. Je kan deze file nu selecteren zodat wij er relevante informatie uit kunnen halen voor ons onderzoek.")

    extensions = "application/zip, text/plain"

    return FileInput(title, description, extensions)


def prompt_radio(usernames):
    title = Translatable()
    title.add("en", "Step 2: Select your username")
    title.add("nl", "Stap 2: Selecteer je gebruikersnaam")

    description = Translatable()
    description.add("en", "The following users are extracted from the chat file. Which one are you?")
    description.add("nl", "De volgende gebruikers hebben we uit de chat file gehaald. Welke ben jij?")

    return RadioInput(title, description, usernames)


def extract_usernames(chat_file_name):
    print(f"filename: {chat_file_name}")

    with open(chat_file_name) as chat_file:
        while (line := chat_file.readline().rstrip()):
            print(line)

    return ["emielvdveen", "a.m.mendrik", "9bitcat"]


def result(usernames, selected_username):
    data = []
    for username in usernames:
        description = "you" if username == selected_username else "-"
        data.append((username, description))

    data_frame = pd.DataFrame(data, columns=["username", "description"])

    print(data_frame)

    result = [{
        "id": "overview",
        "title": "The following usernames where extracted:",
        "data_frame": data_frame
    }]
    return EndOfFlow(result)
`
