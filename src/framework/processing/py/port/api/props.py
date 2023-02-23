from dataclasses import dataclass
from typing import TypedDict

import pandas as pd


class Translations(TypedDict):
    en: str
    nl: str


@dataclass
class Translatable:
    translations: Translations

    def toDict(self):
        return self.__dict__.copy()


@dataclass
class PropsUIHeader:
    title: Translatable

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIHeader"
        dict["title"] = self.title.toDict()
        return dict


@dataclass
class PropsUIFooter:
    progressPercentage: float

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIFooter"
        dict["progressPercentage"] = self.progressPercentage
        return dict


@dataclass
class PropsUIPromptConfirm:
    text: Translatable
    ok: Translatable
    cancel: Translatable

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIPromptConfirm"
        dict["text"] = self.text.toDict()
        dict["ok"] = self.ok.toDict()
        dict["cancel"] = self.cancel.toDict()
        return dict


@dataclass
class PropsUIPromptConsentFormTable:
    id: str
    title: Translatable
    data_frame: pd.DataFrame

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIPromptConsentFormTable"
        dict["id"] = self.id
        dict["title"] = self.title.toDict()
        dict["data_frame"] = self.data_frame.to_json()
        return dict

@dataclass
class PropsUIPromptConsentForm:
    tables: list[PropsUIPromptConsentFormTable]
    meta_tables: list[PropsUIPromptConsentFormTable]

    def translate_tables(self):
        output = []
        for table in self.tables:
            output.append(table.toDict())
        return output

    def translate_meta_tables(self):
        output = []
        for table in self.meta_tables:
            output.append(table.toDict())
        return output

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIPromptConsentForm"
        dict["tables"] = self.translate_tables()
        dict["metaTables"] = self.translate_meta_tables()
        return dict


@dataclass
class PropsUIPromptFileInput:
    description: Translatable
    extensions: str

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIPromptFileInput"
        dict["description"] = self.description.toDict()
        dict["extensions"] = self.extensions
        return dict


class RadioItem(TypedDict):
    id: int
    value: str


@dataclass
class PropsUIPromptRadioInput:
    title: Translatable
    description: Translatable
    items = list[RadioItem]

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIPromptRadioInput"
        dict["title"] = self.title.toDict()
        dict["description"] = self.description.toDict()
        dict["items"] = self.items
        return dict


@dataclass
class PropsUIPageDonation:
    platform: str
    header: PropsUIHeader
    body: PropsUIPromptRadioInput | PropsUIPromptConsentForm | PropsUIPromptFileInput | PropsUIPromptConfirm
    footer: PropsUIFooter

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIPageDonation"
        dict["platform"] = self.platform
        dict["header"] = self.header.toDict()
        dict["body"] = self.body.toDict()
        dict["footer"] = self.footer.toDict()
        return dict


class PropsUIPageEnd:
    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIPageEnd"
        return dict
