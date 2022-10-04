export const PyScript: string = `
import pandas as pd
import logging
logging.basicConfig(level=logging.INFO)

from ddpinspect import unzipddp
from ddpinspect import twitter

def process():
    twitter_zip = yield prompt_file_twitter()
    twitter_interests = extract_twitter_interests(twitter_zip)
    yield result(twitter_interests)


def extract_twitter_interests(twitter_zip):
    interests_bytes = unzipddp.extract_file_from_zip(twitter_zip, "personalization.js")  
    interests_listdict = twitter.bytesio_to_listdict(interests_bytes)
    interests = twitter.interests_to_list(interests_listdict)
    return interests


def prompt_file_twitter():
    title = Translatable()
    title.add("en", "Select the twitter.zip file")
    title.add("nl", "Select the twitter.zip file")

    description = Translatable()
    description.add("en", "Select the twitter.zip file")
    description.add("nl", "Select the twitter.zip file")

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


def result(interests):

    df = pd.DataFrame([{"Interest": item} for item in interests])
    # df = pd.DataFrame([{"num": i} for i in range(10)])

    result = [{
        "id": "overview",
        "title": "The following interests where extracted:",
        "data_frame": df
    }]
    return EndOfFlow(result)
`
