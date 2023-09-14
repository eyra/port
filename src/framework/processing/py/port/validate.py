"""
Contains classes to deal with input validation of DDPs
"""
from dataclasses import dataclass, field
from enum import Enum

import logging

logger = logging.getLogger(__name__)


class Language(Enum):
    """ Languages Enum """
    EN = 1
    NL = 2


class DDPFiletype(Enum):
    """ Filetype Enum """
    JSON = 1
    HTML = 2
    CSV = 3


@dataclass
class DDPCategory:
    """
    Characteristics that characterize a DDP
    """
    id: str
    ddp_filetype: DDPFiletype
    language: Language
    known_files: list[str]


@dataclass
class StatusCode:
    """
    Can be used to set a status
    """
    id: int
    description: str
    message: str


@dataclass
class ValidateInput:
    """
    Class containing the results of input validation
    """

    status_codes: list[StatusCode]
    ddp_categories: list[DDPCategory]
    status_code: StatusCode | None = None
    ddp_category: DDPCategory | None = None

    ddp_categories_lookup: dict[str, DDPCategory] = field(init=False)
    status_codes_lookup: dict[int, StatusCode] = field(init=False)

    def infer_ddp_category(self, file_list_input: list[str]) -> bool:
        """
        Compares a list of files to a list of known files.
        From that comparison infer the DDP Category
        Note: at least 5% percent of known files should match
        """
        prop_category = {}
        for identifier, category in self.ddp_categories_lookup.items():
            n_files_found = [
                1 if f in category.known_files else 0 for f in file_list_input
            ]
            prop_category[identifier] = sum(n_files_found) / len(category.known_files) * 100

        if max(prop_category.values()) >= 5:
            highest = max(prop_category, key=prop_category.get)  # type: ignore
            self.ddp_category = self.ddp_categories_lookup[highest]
            logger.info("Detected DDP category: %s", self.ddp_category.id)
            return True

        logger.info("Not a valid input; not enough files matched when performing input validation")
        return False

    def set_status_code(self, code: int) -> None:
        """
        Set the status code
        """
        self.status_code = self.status_codes_lookup.get(code, None)

    def __post_init__(self) -> None:
        for status_code, ddp_category in zip(self.status_codes, self.ddp_categories):
            assert isinstance(status_code, StatusCode), "Input is not of class StatusCode"
            assert isinstance(ddp_category, DDPCategory), "Input is not of class DDPCategory"

        self.ddp_categories_lookup = {
            category.id: category for category in self.ddp_categories
        }
        self.status_codes_lookup = {
            status_code.id: status_code for status_code in self.status_codes
        }
