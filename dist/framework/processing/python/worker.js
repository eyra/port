var pyScript;
onmessage = function (event) {
    var eventType = event.data.eventType;
    switch (eventType) {
        case 'initialise':
            initialise().then(function () {
                self.postMessage({ eventType: 'initialiseDone' });
            });
            break;
        case 'loadScript':
            loadScript(event.data.script);
            self.postMessage({ eventType: 'loadScriptDone' });
            break;
        case 'firstRunCycle':
            pyScript = self.pyodide.runPython(pyWorker());
            runCycle(null);
            break;
        case 'nextRunCycle':
            var response = event.data.response;
            unwrap(response).then(function (userInput) {
                runCycle(userInput);
            });
            break;
        default:
            console.log('[ProcessingWorker] Received unsupported event: ', eventType);
    }
};
function runCycle(payload) {
    console.log('[ProcessingWorker] runCycle ' + JSON.stringify(payload));
    scriptEvent = pyScript.send(payload);
    self.postMessage({
        eventType: 'runCycleDone',
        scriptEvent: scriptEvent.toJs({
            create_proxies: false,
            dict_converter: Object.fromEntries
        })
    });
}
function unwrap(response) {
    console.log('[ProcessingWorker] unwrap response: ' + JSON.stringify(response.payload));
    return new Promise(function (resolve) {
        switch (response.payload.__type__) {
            case 'PayloadFile':
                copyFileToPyFS(response.payload.value, resolve);
                break;
            default:
                resolve(response.payload);
        }
    });
}
function copyFileToPyFS(file, resolve) {
    var reader = file.stream().getReader();
    var pyFile = self.pyodide.FS.open(file.name, 'w');
    var writeToPyFS = function (_a) {
        var done = _a.done, value = _a.value;
        if (done) {
            resolve({ __type__: 'PayloadString', value: file.name });
        }
        else {
            self.pyodide.FS.write(pyFile, value, 0, value.length);
            reader.read().then(writeToPyFS);
        }
    };
    reader.read().then(writeToPyFS);
}
function initialise() {
    console.log('[ProcessingWorker] initialise');
    importScripts('https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js');
    console.log('[ProcessingWorker] loading Pyodide');
    return loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.21.2/full/'
    }).then(function (pyodide) {
        console.log('[ProcessingWorker] loading packages');
        self.pyodide = pyodide;
        return self.pyodide.loadPackage(['micropip', 'numpy', 'pandas']);
    });
}
function loadScript(script) {
    console.log('[ProcessingWorker] loadScript');
    self.pyodide.runPython(pyPortApi);
    self.pyodide.runPython(script);
}
var pyPortApi = "\nclass CommandUIRender:\n  __slots__ = \"page\"\n  def __init__(self, page):\n    self.page = page\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"CommandUIRender\"\n    dict[\"page\"] = self.page.toDict()\n    return dict\n\nclass CommandSystemDonate:\n  __slots__ = \"key\", \"json_string\"\n  def __init__(self, key, json_string):\n    self.key = key\n    self.json_string = json_string\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"CommandSystemDonate\"\n    dict[\"key\"] = self.key\n    dict[\"json_string\"] = self.json_string\n    return dict\n\n      \nclass PropsUIHeader:\n  __slots__ = \"title\"\n  def __init__(self, title):\n    self.title = title\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIHeader\"\n    dict[\"title\"] = self.title.toDict()\n    return dict\n\n\nclass PropsUIFooter:\n  __slots__ = \"progress_percentage\"\n  def __init__(self, progress_percentage):\n    self.progress_percentage = progress_percentage\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIFooter\"\n    dict[\"progressPercentage\"] = self.progress_percentage\n    return dict\n\n\nclass PropsUIPromptConfirm:\n  __slots__ = \"text\", \"ok\", \"cancel\"\n  def __init__(self, text, ok, cancel):\n    self.text = text\n    self.ok = ok\n    self.cancel = cancel\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPromptConfirm\"\n    dict[\"text\"] = self.text.toDict()\n    dict[\"ok\"] = self.ok.toDict()\n    dict[\"cancel\"] = self.cancel.toDict()\n    return dict\n\n\nclass PropsUIPromptConsentForm:\n  __slots__ = \"tables\", \"meta_tables\"\n  def __init__(self, tables, meta_tables):\n    self.tables = tables\n    self.meta_tables = meta_tables\n  def translate_tables(self):\n    output = []\n    for table in self.tables:\n      output.append(table.toDict())\n    return output\n  def translate_meta_tables(self):\n    output = []\n    for table in self.meta_tables:\n      output.append(table.toDict())\n    return output\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPromptConsentForm\"\n    dict[\"tables\"] = self.translate_tables()\n    dict[\"metaTables\"] = self.translate_meta_tables()\n    return dict\n\n\nclass PropsUIPromptConsentFormTable:\n  __slots__ = \"id\", \"title\", \"data_frame\"\n  def __init__(self, id, title, data_frame):\n    self.id = id\n    self.title = title\n    self.data_frame = data_frame\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPromptConsentFormTable\"\n    dict[\"id\"] = self.id\n    dict[\"title\"] = self.title\n    dict[\"data_frame\"] = self.data_frame.to_json()\n    return dict\n\n\nclass PropsUIPromptFileInput:\n  __slots__ = \"description\", \"extensions\"\n  def __init__(self, description, extensions):\n    self.description = description\n    self.extensions = extensions\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPromptFileInput\"\n    dict[\"description\"] = self.description.toDict()\n    dict[\"extensions\"] = self.extensions\n    return dict\n\n\nclass PropsUIPromptRadioInput:\n  __slots__ = \"title\", \"description\", \"items\"\n  def __init__(self, title, description, items):\n    self.title = title\n    self.description = description\n    self.items = items\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPromptRadioInput\"\n    dict[\"title\"] = self.title.toDict()\n    dict[\"description\"] = self.description.toDict()\n    dict[\"items\"] = self.items\n    return dict\n\n\nclass PropsUIPageDonation:\n  __slots__ = \"platform\", \"header\", \"body\", \"footer\"\n  def __init__(self, platform, header, body, footer):\n    self.platform = platform\n    self.header = header\n    self.body = body\n    self.footer = footer\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPageDonation\"\n    dict[\"platform\"] = self.platform\n    dict[\"header\"] = self.header.toDict()\n    dict[\"body\"] = self.body.toDict()\n    dict[\"footer\"] = self.footer.toDict()\n    return dict\n\n\nclass PropsUIPageEnd:\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPageEnd\"\n    return dict\n\n\nclass Translatable:\n  __slots__ = \"translations\"\n  def __init__(self, translations):\n    self.translations = translations\n  def toDict(self):\n    dict = {}\n    dict[\"translations\"] = self.translations\n    return dict  \n";
function pyWorker() {
    return "\n  from collections.abc import Generator\n  import json\n  import html\n  import pandas as pd\n\n\n  class ScriptWrapper(Generator):\n    def __init__(self, script):\n        self.script = script\n    def send(self, data):\n        command = self.script.send(data)\n        return command.toDict()\n    def throw(self, type=None, value=None, traceback=None):\n        raise StopIteration\n  script = process()\n  ScriptWrapper(script)\n  ";
}
