"""
DDP extract Netflix module
"""
from pathlib import Path
import logging
import zipfile
import json
from collections import Counter

import pandas as pd

import port.api.props as props
import port.unzipddp as unzipddp

from port.validate import (
    DDPCategory,
    Language,
    DDPFiletype,
    ValidateInput,
    StatusCode,
)

logger = logging.getLogger(__name__)

DDP_CATEGORIES = [
    DDPCategory(
        id="csv",
        ddp_filetype=DDPFiletype.CSV,
        language=Language.EN,
        known_files=["MyList.csv", "ViewingActivity.csv", "SearchHistory.csv", "IndicatedPreferences.csv", "PlaybackRelatedEvents.csv", "InteractiveTitles.csv", "Ratings.csv", "GamePlaySession.txt", "IpAddressesLogin.csv", "IpAddressesAccountCreation.txt", "IpAddressesStreaming.csv", "Additional Information.pdf", "MessagesSentByNetflix.csv", "SocialMediaConnections.txt", "AccountDetails.csv", "ProductCancellationSurvey.txt", "CSContact.csv", "ChatTranscripts.csv", "Cover sheet.pdf", "Devices.csv", "ParentalControlsRestrictedTitles.txt", "AvatarHistory.csv", "Profiles.csv", "Clickstream.csv", "BillingHistory.csv"]
    )
]

STATUS_CODES = [
    StatusCode(id=0, description="Valid zip", message="Valid zip"),
    StatusCode(id=1, description="Bad zipfile", message="Bad zipfile"),
]


def validate_zip(zfile: Path) -> ValidateInput:
    """
    Validates the input of an Instagram zipfile

    NOTE FOR KASPER:
    This function sets a validation object generated with ValidateInput
    This validation object can be read later on to infer possible problems with the zipfile
    I dont like this design myself, but I also havent found any alternatives that are better
    """

    validate = ValidateInput(STATUS_CODES, DDP_CATEGORIES)

    try:
        paths = []
        with zipfile.ZipFile(zfile, "r") as zf:
            for f in zf.namelist():
                p = Path(f)
                if p.suffix in (".txt", ".csv", ".pdf"):
                    logger.debug("Found: %s in zip", p.name)
                    paths.append(p.name)

        validate.set_status_code(0)
        validate.infer_ddp_category(paths)
    except zipfile.BadZipFile:
        validate.set_status_code(1)

    return validate


def extract_users_from_df(df: pd.DataFrame) -> list[str]:
    """
    Extracts all users from a netflix csv file 
    This function expects all users to be present in the first column
    of a pd.DataFrame
    """
    out = []
    try:
        out = df[df.columns[0]].unique().tolist()
        out.sort()
    except Exception as e:
        logger.error("Cannot extract users: %s", e)

    return out
    
def keep_user(df: pd.DataFrame, selected_user: str) -> pd.DataFrame:
    """
    Keep only the rows where the first column of df
    is equal to selected_user
    """
    try:
        df =  df.loc[df.iloc[:, 0] == selected_user].reset_index(drop=True)
    except Exception as e:  
        logger.info(e)

    return df

    
def netflix_to_df(netflix_zip: str, file_name: str, selected_user: str) -> pd.DataFrame:
    """
    netflix csv to df
    returns empty df in case of error
    """
    ratings_bytes = unzipddp.extract_file_from_zip(netflix_zip, file_name)
    df = unzipddp.read_csv_from_bytes_to_df(ratings_bytes)
    df = keep_user(df, selected_user)

    return df


def ratings_to_df(netflix_zip: str, selected_user: str)  -> pd.DataFrame:
    """
    Extract ratings from netflix zip to df
    Only keep the selected user
    """

    columns_to_keep = ["Title Name", "Thumbs Value", "Device Model", "Event Utc Ts"]
    columns_to_rename =  {
        "Event Utc Ts": "Date",
        "Device Model": "Device"
    }

    df = netflix_to_df(netflix_zip, "Ratings.csv", selected_user)

    # Extraction logic here
    try:
        if not df.empty:
            df = df[columns_to_keep]
            df = df.rename(columns=columns_to_rename)
    except Exception as e:
        logger.error("Data extraction error: %s", e)
        
    return df


def viewing_activity_to_df(netflix_zip: str, selected_user: str)  -> pd.DataFrame:
    """
    Extract ViewingActivity from netflix zip to df
    Only keep the selected user
    """

    columns_to_keep = ["Start Time","Duration","Attributes","Title","Supplemental Video Type","Device Type"]
    columns_to_rename =  {
        "Device Type": "Device"
    }

    df = netflix_to_df(netflix_zip, "ViewingActivity.csv", selected_user)

    # Extraction logic here
    try:
        if not df.empty:
            df = df[columns_to_keep]
            df = df.rename(columns=columns_to_rename)
    except Exception as e:
        logger.error("Data extraction error: %s", e)
        
    return df


def clickstream_to_df(netflix_zip: str, selected_user: str)  -> pd.DataFrame:
    """
    Extract Clickstream from netflix zip to df
    """

    columns_to_keep = ["Source","Navigation Level","Referrer Url","Webpage Url", "Click Utc Ts"]
    columns_to_rename =  {
        "Click Utc Ts": "Time"
    }

    df = netflix_to_df(netflix_zip, "Clickstream.csv", selected_user)

    try:
        if not df.empty:
            df = df[columns_to_keep]
            df = df.rename(columns=columns_to_rename)
    except Exception as e:
        logger.error("Data extraction error: %s", e)
        
    return df

def my_list_to_df(netflix_zip: str, selected_user: str)  -> pd.DataFrame:
    """
    Extract MyList.csv from netflix zip to df
    """

    columns_to_keep = ["Title Name", "Utc Title Add Date"]
    columns_to_rename =  {
        "Utc Title Add Date": "Date"
    }

    df = netflix_to_df(netflix_zip, "MyList.csv", selected_user)

    try:
        if not df.empty:
            df = df[columns_to_keep]
            df = df.rename(columns=columns_to_rename)
            print("renamed")
    except Exception as e:
        logger.error("Data extraction error: %s", e)
        
    return df



def indicated_preferences_to_df(netflix_zip: str, selected_user: str)  -> pd.DataFrame:
    """
    Extract MyList.csv from netflix zip to df
    """

    columns_to_keep = ["Show", "Has Watched", "Is Interested", "Event Date"]
    columns_to_rename =  {
        "Event Date": "Date"
    }

    df = netflix_to_df(netflix_zip, "IndicatedPreferences.csv", selected_user)

    try:
        if not df.empty:
            df = df[columns_to_keep]
            df = df.rename(columns=columns_to_rename)
    except Exception as e:
        logger.error("Data extraction error: %s", e)
        
    return df


def playtraces_counts_to_df(df):
    """
    creates a df with counts for playback
    """
    out = []
    for item in df["Playtraces"]:
        events = json.loads(item)
        out.append(Counter([event.get("eventType") for event in events]))

    return pd.DataFrame(out).fillna(0)


def playback_related_events_to_df(netflix_zip: str, selected_user: str)  -> pd.DataFrame:
    """
    Extract PlaybackRelatedEvents.csv from netflix zip to df
    """

    columns_to_keep = ["Title Description", "Device", "Playback Start Utc Ts"]
    columns_to_rename =  {
        "Title Description": "Title",
        "Playback Start Utc Ts": "Date time"
    }

    df = netflix_to_df(netflix_zip, "PlaybackRelatedEvents.csv", selected_user)

    try:
        if not df.empty:
            playtraces_df = playtraces_counts_to_df(df)
            df = df[columns_to_keep]
            df = df.rename(columns=columns_to_rename)
            df = df.join(playtraces_df)

    except Exception as e:
        logger.error("Data extraction error: %s", e)
        
    return df


def search_history_to_df(netflix_zip: str, selected_user: str)  -> pd.DataFrame:
    """
    Extract SearchHistory.csv from netflix zip to df
    """

    columns_to_keep = ["Device", "Is Kids", "Query Typed", "Displayed Name", "Action", "Section", "Utc Timestamp"]
    columns_to_rename =  {
        "Utc Timestamp": "Date time"
    }

    df = netflix_to_df(netflix_zip, "SearchHistory.csv", selected_user)

    try:
        if not df.empty:
            df = df[columns_to_keep]
            df = df.rename(columns=columns_to_rename)
    except Exception as e:
        logger.error("Data extraction error: %s", e)
        
    return df


def messages_sent_by_netflix_to_df(netflix_zip: str, selected_user: str)  -> pd.DataFrame:
    """
    Extract MessagesSentByNetflix.csv from netflix zip to df
    """

    columns_to_keep = ["Sent Utc Ts", "Message Name", "Channel", "Title Name", "Click Cnt"]
    columns_to_rename =  {
        "Sent Utc Ts": "Date time",
        "Click Cnt": "Click Count"
    }

    df = netflix_to_df(netflix_zip, "MessagesSentByNetflix.csv", selected_user)

    try:
        if not df.empty:
            df = df[columns_to_keep]
            df = df.rename(columns=columns_to_rename)
    except Exception as e:
        logger.error("Data extraction error: %s", e)
        
    return df

