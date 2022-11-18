class PropsUIHeader:
    __slots__ = "title"

    def __init__(self, title):
        self.title = title

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIHeader"
        dict["title"] = self.title.toDict()
        return dict


class PropsUIFooter:
    __slots__ = "progress_percentage"

    def __init__(self, progress_percentage):
        self.progress_percentage = progress_percentage

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIFooter"
        dict["progressPercentage"] = self.progress_percentage
        return dict


class PropsUIPromptConfirm:
    __slots__ = "text", "ok", "cancel"

    def __init__(self, text, ok, cancel):
        self.text = text
        self.ok = ok
        self.cancel = cancel

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIPromptConfirm"
        dict["text"] = self.text.toDict()
        dict["ok"] = self.ok.toDict()
        dict["cancel"] = self.cancel.toDict()
        return dict


class PropsUIPromptConsentForm:
    __slots__ = "tables", "meta_tables"

    def __init__(self, tables, meta_tables):
        self.tables = tables
        self.meta_tables = meta_tables

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


class PropsUIPromptConsentFormTable:
    __slots__ = "id", "title", "data_frame"

    def __init__(self, id, title, data_frame):
        self.id = id
        self.title = title
        self.data_frame = data_frame

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIPromptConsentFormTable"
        dict["id"] = self.id
        dict["title"] = self.title.toDict()
        dict["data_frame"] = self.data_frame.to_json()
        return dict


class PropsUIPromptFileInput:
    __slots__ = "description", "extensions"

    def __init__(self, description, extensions):
        self.description = description
        self.extensions = extensions

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIPromptFileInput"
        dict["description"] = self.description.toDict()
        dict["extensions"] = self.extensions
        return dict


class PropsUIPromptRadioInput:
    __slots__ = "title", "description", "items"

    def __init__(self, title, description, items):
        self.title = title
        self.description = description
        self.items = items

    def toDict(self):
        dict = {}
        dict["__type__"] = "PropsUIPromptRadioInput"
        dict["title"] = self.title.toDict()
        dict["description"] = self.description.toDict()
        dict["items"] = self.items
        return dict


class PropsUIPageDonation:
    __slots__ = "platform", "header", "body", "footer"

    def __init__(self, platform, header, body, footer):
        self.platform = platform
        self.header = header
        self.body = body
        self.footer = footer

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


class Translatable:
    __slots__ = "translations"

    def __init__(self, translations):
        self.translations = translations

    def toDict(self):
        dict = {}
        dict["translations"] = self.translations
        return dict
