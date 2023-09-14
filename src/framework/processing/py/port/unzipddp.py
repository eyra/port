"""
Contains functions to deal with zipfiles
"""

from pathlib import Path
from typing import Any, Callable
import logging
import zipfile
import json
import csv
import io

import pandas as pd

from port.my_exceptions import FileNotFoundInZipError

logger = logging.getLogger(__name__)

def extract_file_from_zip(zfile: str, file_to_extract: str) -> io.BytesIO:
    """
    Extracts a specific file from a zipfile buffer
    Function always returns a buffer
    """
    file_to_extract_bytes = io.BytesIO()

    try:
        with zipfile.ZipFile(zfile, "r") as zf:
            file_found = False

            for f in zf.namelist():
                logger.debug("Contained in zip: %s", f)
                if Path(f).name == file_to_extract:
                    #print('extract_file_from_zip found a message json', f)

                    file_to_extract_bytes = io.BytesIO(zf.read(f))
                    file_found = True
                    break

        if not file_found:
            raise FileNotFoundInZipError("File not found in zip")

    except zipfile.BadZipFile as e:
        logger.error("BadZipFile:  %s", e)
    except FileNotFoundInZipError as e:
        logger.error("File not found:  %s: %s", file_to_extract, e)
    except Exception as e:
        logger.error("Exception was caught:  %s", e)

    finally:
        return file_to_extract_bytes


def _json_reader_bytes(json_bytes: bytes, encoding: str) -> Any:
    json_bytes_stream = io.BytesIO(json_bytes)
    stream = io.TextIOWrapper(json_bytes_stream, encoding=encoding)
    result = json.load(stream)
    return result


def _json_reader_file(json_file: str, encoding: str) -> Any:
    with open(json_file, 'r', encoding=encoding) as f:
        result = json.load(f)
    return result


def _read_json(json_input: Any, json_reader: Callable[[Any, str], Any]) -> dict[Any, Any] | list[Any]:
    """
    Dunder function that read json_input and applies json_reader
    Performs several checks (see code) and tries different encodings
    """

    out: dict[Any, Any] | list[Any] = {}

    encodings = ["utf8", "utf-8-sig"]
    for encoding in encodings:
        try:
            result = json_reader(json_input, encoding)

            if not isinstance(result, (dict, list)):
                raise TypeError("Did not convert bytes to a list or dict, but to another type instead")

            out = result
            logger.debug("Succesfully converted json bytes with encoding: %s", encoding)
            break

        except json.JSONDecodeError:
            logger.error("Cannot decode json with encoding: %s", encoding)
        except TypeError as e:
            logger.error("%s, could not convert json bytes", e)
            break
        except Exception as e:
            logger.error("%s, could not convert json bytes", e)
            break

    return out


def read_json_from_bytes(json_bytes: io.BytesIO) -> dict[Any, Any] | list[Any]:
    """
    Reads json from io.BytesIO buffer
    this function is a wrapper around _read_json

    Function returns {} in case of failure
    """

    out: dict[Any, Any] | list[Any] = {}
    try:
        b = json_bytes.read()
        out = _read_json(b, _json_reader_bytes)
    except Exception as e:
        logger.error("%s, could not convert json bytes", e)

    return out


def read_json_from_file(json_file: str) -> dict[Any, Any] | list[Any]:
    """
    Reads json from file
    this function is a wrapper around _read_json

    Function returns {} in case of failure
    """
    out = _read_json(json_file, _json_reader_file)
    return out


def read_csv_from_bytes(json_bytes: io.BytesIO) -> list[dict[Any, Any]]:
    """
    Reads csv from io.Bytes()
    Expects input from extract_file_from_zip
    """
    out: list[dict[Any, Any]] = []

    b = json_bytes.read()

    try:
        stream = io.TextIOWrapper(io.BytesIO(b), encoding="utf8")
        reader = csv.DictReader(stream)
        for row in reader:
            out.append(row)
        logger.debug("succesfully converted csv bytes with encoding utf8")

    except Exception as e:
        logger.error("%s, could not convert csv bytes", e)

    finally:
        return out


def read_csv_from_bytes_to_df(json_bytes: io.BytesIO) -> pd.DataFrame:
    """
    csv to pd.DataFrame
    expects io.BytesIO as input (from extract_file_from_zip)
    """
    return pd.DataFrame(read_csv_from_bytes(json_bytes))


