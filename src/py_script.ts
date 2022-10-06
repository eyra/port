export const PyScript: string = `
import pandas as pd
import logging
logging.basicConfig(level=logging.INFO)

from ddpinspect import unzipddp
from ddpinspect import twitter
from ddpinspect import instagram


def process():
    twitter_zip = yield prompt_file_twitter()
    yield extract_twitter(twitter_zip)

    instagram_zip = yield prompt_file_instagram()
    yield extract_instagram(instagram_zip)



def extract_twitter(twitter_zip):

    validation = twitter.validate_zip(twitter_zip)
    interests_bytes = unzipddp.extract_file_from_zip(twitter_zip, "personalization.js")  
    interests_listdict = twitter.bytesio_to_listdict(interests_bytes)
    interests = twitter.interests_to_list(interests_listdict)

    df = pd.DataFrame([{"Interest": item} for item in interests])

    if not df.empty:
        title = "The following interests where extracted:"
    elif validation.status_code == 0 and df.empty:
        title = "We could not find any interests in your Twitter package"
    else:
        title = validation.get_status_message()

    result = [{
        "id": "overview",
        "title": title,
        "data_frame": df
    }]

    return NextFlow(result)



def extract_instagram(instagram_zip):

    validation = instagram.validate_zip(instagram_zip)
    interests_bytes = unzipddp.extract_file_from_zip(instagram_zip, "ads_interests.json")  
    interests_dict = unzipddp.read_json_from_bytes(interests_bytes)
    interests = instagram.interests_to_list(interests_dict)

    your_topics_bytes = unzipddp.extract_file_from_zip(instagram_zip, "your_topics.json")  
    your_topics_dict = unzipddp.read_json_from_bytes(your_topics_bytes)
    your_topics = instagram.your_topics_to_list(your_topics_dict)

    df_interests = pd.DataFrame([{"Interest": item} for item in interests])
    df_your_topics = pd.DataFrame([{"Topics": item} for item in your_topics])

    to_donate = [
        ("interests", df_interests),
        ("topics", df_your_topics),
     ]

    results = []
    for subject, df in to_donate:

        if not df.empty:
            title = f"The following {subject} where extracted:"
        elif validation.status_code == 0 and df.empty:
            title = f"We could not find any {subject} in your Interest package"
        else:
            title = validation.get_status_message()

        results.append({
            "id": "overview",
            "title": title,
            "data_frame": df
        })

    return EndOfFlow(results)


def prompt_file_twitter():
    title = Translatable()
    title.add("en", "Select the twitter.zip file")
    title.add("nl", "Select the twitter.zip file")

    description = Translatable()
    description.add("en", "Select the twitter.zip file")
    description.add("nl", "Select the twitter.zip file")

    extensions = "application/zip, text/plain"

    return FileInput(title, description, extensions)

def prompt_file_instagram():
    title = Translatable()
    title.add("en", "Select the instagram.zip file")
    title.add("nl", "Select the instagram.zip file")

    description = Translatable()
    description.add("en", "Select the instagram.zip file")
    description.add("nl", "Select the instagram.zip file")

    extensions = "application/zip, text/plain"

    return FileInput(title, description, extensions)



def result():
    return EndOfFlow(results)
`
