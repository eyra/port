"""
DDP extract Netflix module
"""
from pathlib import Path
import logging
import zipfile

import pandas as pd

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
        id="html",
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
    
def filter_user(df: pd.DataFrame, selected_user: str) -> pd.DataFrame:
    """
    Keep only the rows where the first column of df
    is equal to selected_user
    """
    df =  df.loc[df.iloc[:, 0] == selected_user].reset_index(drop=True)
    return df

    
def split_dataframe(df: pd.DataFrame, row_count: int) -> list[pd.DataFrame]:
    """
    NOTE FOR KASPER:

    Port has trouble putting large tables in memory. 
    Has to be expected. Solution split tables into smaller tables.
    I have tried non-bespoke table soluions they did not perform any better

    I hope you have an idea to make tables faster! Would be nice
    """
    # Calculate the number of splits needed.
    num_splits = int(len(df) / row_count) + (len(df) % row_count > 0)

    # Split the DataFrame into chunks of size row_count.
    df_splits = [df[i*row_count:(i+1)*row_count].reset_index(drop=True) for i in range(num_splits)]

    return df_splits
