from dataclasses import dataclass
from typing import TypedDict, Optional, Literal

import pandas as pd


class Translations(TypedDict):
    """Typed dict containing text that is  display in a speficic language

    Attributes:
        en: English string to display
        nl: Dutch string to display
    """
    en: str
    nl: str

@dataclass
class Translatable:
    """Wrapper class for Translations""" 
    translations: Translations

    def toDict(self):
        return self.__dict__.copy()


@dataclass
class PropsUIHeader:
    """Page header

    Attributes:
        title: title of the page
    """
    title: Translatable

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIHeader"
        dict["title"] = self.title.toDict()
        return dict


@dataclass
class PropsUIFooter:
    """Page footer

    Attributes:
        progressPercentage: float indicating the progress in the flow
    """
    progressPercentage: float

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIFooter"
        dict["progressPercentage"] = self.progressPercentage
        return dict


@dataclass
class PropsUIPromptConfirm:
    """Retry submitting a file page

    Prompt the user if they want to submit a new file. 
    This can be used in case a file could not be processed. 

    Attributes:
        text: message to display
        ok: message to display if the user wants to try again
        cancel: message to display if the user wants to continue regardless
    """
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
class PropsUIChartGroup:
    """Grouping variable for aggregating the data

    Attributes:
        column: name of the column to aggregate
        label: Optionally, a label to display in the visualization (default is the column name)
        dateFormat: if given, transforms a data column to the specified date format for aggregation
    """
    column: str
    label: Optional[str] = None
    dateFormat: Optional[str] = None
    tokenize: Optional[bool] = False

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIChartGroup"
        dict["column"] = self.column
        dict["label"] = self.label
        dict["dateFormat"] = self.dateFormat
        return dict

@dataclass
class PropsUIChartValue:
    """Value to aggregate

    Attributes:
        column: name of the column to aggregate
        label: Optionally, a label to display in the visualization (default is the column name)
        aggregate: function for aggregating the values
        addZeroes: if true, add zeroes for missing values
    """
    column: str
    label: Optional[str] = None
    aggregate: Optional[str] = "count"
    addZeroes: Optional[bool] = False

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIChartValue"
        dict["column"] = self.column
        dict["label"] = self.label
        dict["aggregate"] = self.aggregate
        dict["addZeroes"] = self.addZeroes
        return dict

@dataclass
class PropsUIChartVisualization:
    """Data visualization

    Attributes:
        title: title of the visualization
        type: type of visualization
        group: grouping variable for aggregating the data
        values: list of values to aggregate
    """
    title: Translatable
    type: Literal["bar", "line", "area"]
    group: PropsUIChartGroup
    values: list[PropsUIChartValue]
        
    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIChartVisualization"
        dict["title"] = self.title.toDict()
        dict["type"] = self.type
        dict["group"] = self.group.toDict()
        dict["values"] = [value.toDict() for value in self.values]
        return dict
    
@dataclass
class PropsUITextVisualization:
    """Word cloud visualization

    """
    title: Translatable
    type: Literal["wordcloud"]
    text_column: str
    value_column: Optional[str] = None
    tokenize: Optional[bool] = False
        
    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUITextVisualization"
        dict["title"] = self.title.toDict()
        dict["type"] = self.type
        dict["textColumn"] = self.text_column
        dict["valueColumn"] = self.value_column
        dict["tokenize"] = self.tokenize
        return dict


@dataclass
class PropsUIPromptConsentFormTable:
    """Table to be shown to the participant prior to donation 

    Attributes:
        id: a unique string to itentify the table after donation
        title: title of the table
        data_frame: table to be shown
        editable: determines whether the table has an editable mode that can be toggled with a button
        visualizations: optional list of visualizations to be shown
    """
    id: str
    title: Translatable
    data_frame: pd.DataFrame
    #editable: bool = True
    visualizations: Optional[list[PropsUIChartVisualization | PropsUITextVisualization]] = None

    def translate_visualizations(self):
        if self.visualizations is None:
            return None
        return [vis.toDict() for vis in self.visualizations]

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIPromptConsentFormTable"
        dict["id"] = self.id
        dict["title"] = self.title.toDict()
        dict["data_frame"] = self.data_frame.to_json()
        #dict["editable"] = self.editable
        dict["visualizations"] = self.translate_visualizations()
        return dict
    



@dataclass
class PropsUIPromptConsentForm:
    """Tables and Visualization to be shown to the participant prior to donation 

    Attributes:
        tables: a list of tables
        meta_tables: a list of optional tables, for example for logging data
    """
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
    """Prompt the user to submit a file

    Attributes:
        description: text with an explanation
        extensions: accepted mime types, example: "application/zip, text/plain"
    """
    description: Translatable
    extensions: str

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIPromptFileInput"
        dict["description"] = self.description.toDict()
        dict["extensions"] = self.extensions
        return dict


class RadioItem(TypedDict):
    """Radio button

    Attributes:
        id: id of radio button
        value: text to be displayed
    """
    id: int
    value: str


@dataclass
class PropsUIPromptRadioInput:
    """Radio group

    This radio group can be used get a mutiple choice answer from a user

    Attributes:
        title: title of the radio group
        description: short description of the radio group
        items: a list of radio buttons
    """
    title: Translatable
    description: Translatable
    items: list[RadioItem]

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIPromptRadioInput"
        dict["title"] = self.title.toDict()
        dict["description"] = self.description.toDict()
        dict["items"] = self.items
        return dict


@dataclass
class PropsUIQuestionOpen:
    """Question: Open Question

    This class can be used to ask an open question to a user. 
    The user can type the answer in the a text field

    Attributes:
        id: Should be a unique ID to identify the question, example: "1"
        question: The question that will be asked
    """
    id: int
    question: Translatable

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIQuestionOpen"
        dict["id"] = self.id
        dict["question"] = self.question.toDict()
        return dict


@dataclass
class PropsUIQuestionMultipleChoiceCheckbox:
    """Question: Multiple choice checkbox

    This class can be used to ask an multiple choice question to a user. 
    Multiple answers can be given

    Attributes:
        id: Should be a unique ID to identify the question, example: "1"
        question: The question that will be asked
    """
    id: int
    question: Translatable
    choices: list[Translatable]

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIQuestionMultipleChoiceCheckbox"
        dict["id"] = self.id
        dict["question"] = self.question.toDict()
        dict["choices"] = [c.toDict() for c in self.choices]
        return dict


@dataclass
class PropsUIQuestionMultipleChoice:
    """Question: Multiple choice

    This class can be used to ask an multiple choice question to a user. 
    Only one answer can be given

    Attributes:
        id: Should be a unique ID to identify the question, example: "1"
        question: The question that will be asked
    """
    id: int
    question: Translatable
    choices: list[Translatable]

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIQuestionMultipleChoice"
        dict["id"] = self.id
        dict["question"] = self.question.toDict()
        dict["choices"] = [c.toDict() for c in self.choices]
        return dict


@dataclass
class PropsUIPromptQuestionnaire:
    """A class to collection questions

    This class can be used to assemble question in a questionnaire.
    This class can be used as a body in PropsUIPageDonation

    * All questions are optional 
    * Results are returned to the script after the user clicks the continue button
        The results will be in your_results.value, example: 
        {"1": "answer 1", "2": ["answer 1", "answer 2"], "3": "open answer"}

    Attributes:
        description: Short descrition
        questions: List of questions that need to be asked
    """
    description: Translatable
    questions: list[PropsUIQuestionMultipleChoice | PropsUIQuestionMultipleChoiceCheckbox | PropsUIQuestionOpen]

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIPromptQuestionnaire"
        dict["description"] = self.description.toDict()
        dict["questions"] = [q.toDict() for q in self.questions]
        return dict


@dataclass
class PropsUIPageDonation:
    """A multi-purpose page that gets shown to the user

    Attributes:
        platform: the platform name the user is curently in the process of donating data from
        header: page header
        body: main body of the page, see the individual classes for an explanation
        footer: page footer
    """
    platform: str
    header: PropsUIHeader
    body: PropsUIPromptRadioInput | PropsUIPromptConsentForm | PropsUIPromptFileInput | PropsUIPromptConfirm | PropsUIPromptQuestionnaire
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
    """An ending page to show the user they are done"""
    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIPageEnd"
        return dict
