import re
from typing import Tuple, TypedDict
import unicodedata
import logging
import zipfile

import pandas as pd
import port.PrivacyFilter as pfltr
import time

logger = logging.getLogger(__name__)


SIMPLIFIED_REGEXES = [
    r"^%m/%d/%y, %H:%M - %name: %chat_message$",
    r"^\[%d/%m/%y, %H:%M:%S\] %name: %chat_message$",
    r"^%d-%m-%y %H:%M - %name: %chat_message$",
    r"^\[%d-%m-%y %H:%M:%S\] %name: %chat_message$",
    r"^\[%m/%d/%y, %H:%M:%S\] %name: %chat_message$",
    r"^%d/%m/%y, %H:%M – %name: %chat_message$",
    r"^%d/%m/%y, %H:%M - %name: %chat_message$",
    r"^%d.%m.%y, %H:%M – %name: %chat_message$",
    r"^%d.%m.%y, %H:%M - %name: %chat_message$",
    r"^%m.%d.%y, %H:%M - %name: %chat_message$",
    r"^%m.%d.%y %H:%M - %name: %chat_message$",
    r"^\[%d/%m/%y, %H:%M:%S %P\] %name: %chat_message$",
    r"^\[%m/%d/%y, %H:%M:%S %P\] %name: %chat_message$",
    r"^\[%d.%m.%y, %H:%M:%S\] %name: %chat_message$",
    r"^\[%m/%d/%y %H:%M:%S\] %name: %chat_message$",
    r"^\[%m-%d-%y, %H:%M:%S\] %name: %chat_message$",
    r"^\[%m-%d-%y %H:%M:%S\] %name: %chat_message$",
    r"^%m-%d-%y %H:%M - %name: %chat_message$",
    r"^%m-%d-%y, %H:%M - %name: %chat_message$",
    r"^%m-%d-%y, %H:%M , %name: %chat_message$",
    r"^%m/%d/%y, %H:%M , %name: %chat_message$",
    r"^%d-%m-%y, %H:%M , %name: %chat_message$",
    r"^%d/%m/%y, %H:%M , %name: %chat_message$",
    r"^%d.%m.%y %H:%M – %name: %chat_message$",
    r"^%m.%d.%y, %H:%M – %name: %chat_message$",
    r"^%m.%d.%y %H:%M – %name: %chat_message$",
    r"^\[%d.%m.%y %H:%M:%S\] %name: %chat_message$",
    r"^\[%m.%d.%y, %H:%M:%S\] %name: %chat_message$",
    r"^\[%m.%d.%y %H:%M:%S\] %name: %chat_message$",
    r"^(?P<year>.*?)(?:\] | - )%name: %chat_message$"  # Fallback catch all regex
]


REGEX_CODES = {
    "%Y": r"(?P<year>\d{2,4})",
    "%y": r"(?P<year>\d{2,4})",
    "%m": r"(?P<month>\d{1,2})",
    "%d": r"(?P<day>\d{1,2})",
    "%H": r"(?P<hour>\d{1,2})",
    "%I": r"(?P<hour>\d{1,2})",
    "%M": r"(?P<minutes>\d{2})",
    "%S": r"(?P<seconds>\d{2})",
    "%P": r"(?P<ampm>[AaPp].? ?[Mm].?)",
    "%p": r"(?P<ampm>[AaPp].? ?[Mm].?)",
    "%name": r"(?P<name>[^:]*)",
    "%chat_message": r"(?P<chat_message>.*)"
}
start = time.time()
pfilter = pfltr.PrivacyFilter()
pfilter.initialize_from_file()
print('\nInitialisation time PrivacyFilter : %4.0f msec' % ((time.time() - start) * 1000))

def generate_regexes(simplified_regexes):
    """
    Create the complete regular expression by substituting
    REGEX_CODES into SIMPLIFIED_REGEXES

    """
    final_regexes = []

    for simplified_regex in simplified_regexes:

        codes = re.findall(r"\%\w*", simplified_regex)
        for code in codes:
            try:
                simplified_regex = simplified_regex.replace(code, REGEX_CODES[code])
            except KeyError:
                logger.error(f"Could not find regular expression for: {code}")

        final_regexes.append(simplified_regex)

    return final_regexes


REGEXES =  generate_regexes(SIMPLIFIED_REGEXES)


def remove_unwanted_characters(s: str) -> str:
    """
    Cleans string from bytes using magic

    Keeps empjis intact
    """
    s = "".join(ch for ch in s if unicodedata.category(ch)[0]!="C")
    s = unicodedata.normalize("NFKD", s)
    return s



class Datapoint(TypedDict):
    date: str
    name: str
    chat_message: str


def create_data_point_from_chat(chat: str, regex) -> Datapoint:
    """
    Construct data point from chat messages
    """
    result = re.match(regex, chat)
    if result:
        result = result.groupdict()
    else:
        return Datapoint(date="", name="", chat_message="")

    # Construct data
    date = '-'.join([result.get("year", ""), result.get("month", ""), result.get("day", "")])
    name = result.get("name", "")
    message = pfilter.filter(result.get("chat_message", ""))
    chat_message = '['+date+']: ' + message

    return Datapoint(date=date, name=name, chat_message=chat_message)


def remove_empty_chats(df: pd.DataFrame) -> pd.DataFrame:
    """
    Removes all rows from the chat dataframe where no regex matched
    """
    df = df.drop(df[df.chat_message == ""].index)
    df = df.reset_index(drop=True)
    return df

def filter_username(df: pd.DataFrame, username: str) -> pd.DataFrame:
    """
    Extracts unique usersnames from chat dataframe
    """
    print('filter_username pre', df.to_string())
    df = df.drop(df[df.name != username].index)
    df = df.reset_index(drop=True)
    print('filter_username post', df.to_string())

    return df


def extract_users(df: pd.DataFrame) -> list[str]:
    """
    Extracts unique usersnames from chat dataframe
    """
    return list(set(df["name"]))


def remove_name_column(df: pd.DataFrame) -> pd.DataFrame:
    """
    Extracts unique usersnames from chat dataframe
    """
    df = df.drop(columns=["name"])
    return df


def remove_date_column(df: pd.DataFrame) -> pd.DataFrame:
    """
    Extracts unique usersnames from chat dataframe
    """
    df = df.drop(columns=["date"])
    return df


def determine_regex_from_chat(lines: list[str]) -> str:
    """
    Read lines of chat return the first regex that matches
    That regex is used to process the chatfile
    """

    length_lines = len(lines)
    for index, line in enumerate(lines):
        for regex in REGEXES:
            if re.match(regex, line):
                logger.debug(f"Matched regex: {regex}")
                return regex

        if index > length_lines:
            break

    logger.error(f"No matching regex found:")
    raise Exception(f"No matching regex found")


def construct_message(current_line: str, next_line: str, regex: str) -> Tuple[bool, str]:
    """
    Helper function: determines whether the next line in the chat matches the regex
    in case of no match it means that the line belongs to the message on the current line
    """

    match_next_line = re.match(regex, next_line)
    if match_next_line:
        return True, current_line
    else:
        current_line = current_line + " " + next_line
        current_line = current_line.replace("\n", " ")
        return False, current_line


def read_chat_file(path_to_chat_file: str) -> list[str]:
    try:
        if zipfile.is_zipfile(path_to_chat_file):

          with zipfile.ZipFile(path_to_chat_file) as z:
            file_list = z.namelist()
            print(f"{file_list}")
            with z.open(file_list[0]) as f:
                lines = f.readlines()
                lines = [line.decode("utf-8") for line in lines]

        else:
            with open(path_to_chat_file, encoding="utf-8") as f:
                lines = f.readlines()

        lines = [remove_unwanted_characters(line) for line in lines]
        return lines

    except Exception as e:
        raise e


def parse_chat(path_to_chat: str) -> pd.DataFrame:
    """
    Read chat from file, parse, return df

    In case of error returns empty df
    """
    out = []

    try:
        lines = read_chat_file(path_to_chat)
        regex = determine_regex_from_chat(lines)

        current_line = lines.pop(0)
        next_line = lines.pop(0)

        while True:
            try:
                match_next_line, chat = construct_message(current_line, next_line, regex)

                while not match_next_line:
                    next_line = lines.pop(0)
                    match_next_line, chat = construct_message(chat, next_line, regex)

                data_point = create_data_point_from_chat(chat, regex)
                out.append(data_point)

                current_line = next_line
                next_line = lines.pop(0)

            # IndexError occurs when pop fails
            # Meaning we processed all chat messages
            except IndexError:
                data_point = create_data_point_from_chat(current_line, regex)
                out.append(data_point)
                break
    except Exception as e:
        logger.error(e)

    finally:
        return pd.DataFrame(out)


#PATH_1 = "/home/turbo/ddp-inspector/example_ddps/whatsapp/whatsapp_bojan.zip"
#PATH_2 = "/home/turbo/ddp-inspector/example_ddps/whatsapp/whatsapp_bojan/_chat.txt"
#PATH_3 = "/home/turbo/ddp-inspector/example_ddps/whatsapp/WhatsApp-chat met Niek De Schipper.txt"
####
####parse_chat(PATH_1)
####parse_chat(PATH_2)
#df = parse_chat(PATH_3)
#df
#df = remove_empty_chats(df)
#df
#
