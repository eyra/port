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
function runCycle(userInput) {
    scriptEvent = pyScript.send(userInput);
    self.postMessage({
        eventType: 'runCycleDone',
        scriptEvent: scriptEvent.toJs({
            create_proxies: false,
            dict_converter: Object.fromEntries
        })
    });
}
function unwrap(response) {
    return new Promise(function (resolve) {
        switch (response.prompt.__type__) {
            case 'Event.Command.Prompt.FileInput':
                copyFileToPyFS(response.userInput, resolve);
                break;
            default:
                resolve(response.userInput);
        }
    });
}
function copyFileToPyFS(file, resolve) {
    var reader = file.stream().getReader();
    var pyFile = self.pyodide.FS.open(file.name, 'w');
    var writeToPyFS = function (_a) {
        var done = _a.done, value = _a.value;
        if (done) {
            resolve(file.name);
        }
        else {
            self.pyodide.FS.write(pyFile, value, 0, value.length);
            reader.read().then(writeToPyFS);
        }
    };
    reader.read().then(writeToPyFS);
}
function initialise() {
    importScripts('https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js');
    return loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.21.2/full/'
    }).then(function (pyodide) {
        self.pyodide = pyodide;
        return self.pyodide.loadPackage(['micropip', 'numpy', 'pandas']);
    });
}
function loadScript(script) {
    console.log('[ProcessingWorker] loadScript');
    self.pyodide.runPython(pyPortApi);
    self.pyodide.runPython(script);
}
var pyPortApi = "\nclass Event:\n  def toDict(self):\n    return setType({}, \"Event\")\n\n\nclass EndOfFlow(Event):\n  __slots__ = \"result\"\n  def __init__(self, result):\n    self.result = result\n  def translate_result(self):\n    print(\"translate\")\n    data_output = []\n    for data in self.result:\n      df = data[\"data_frame\"]\n      data_output.append({\"id\": data[\"id\"], \"data_frame\": df.to_json()})\n    return {\n      \"title\": data[\"title\"],\n      \"data\": data_output,\n    }\n  def toDict(self):\n    print(\"toDict2\")\n    dict = toDict(super(), \"EndOfFlow\") \n    dict = dict | self.translate_result()\n    return dict\n  \n\nclass Command(Event):\n  def toDict(self):\n    return toDict(super(), \"Command\")\n\n\nclass Prompt(Command):\n  __slots__ = \"title\", \"description\"\n  def __init__(self, title, description):\n    self.title = title\n    self.description = description\n  def toDict(self):\n    dict = toDict(super(), \"Prompt\")\n    dict[\"title\"] = self.title.toDict()\n    dict[\"description\"] = self.description.toDict()\n    return dict\n\n\nclass FileInput(Prompt):\n  __slots__ = \"extensions\"\n  def __init__(self, title, description, extensions):\n    super().__init__(title, description)\n    self.extensions = extensions\n  def toDict(self):\n    dict = toDict(super(), \"FileInput\")\n    dict[\"extensions\"] = self.extensions\n    return dict\n\n\nclass RadioInput(Prompt):\n  def __init__(self, title, description, items):\n    super().__init__(title, description)\n    self.items = items\n  def toDict(self):\n    dict = toDict(super(), \"RadioInput\")\n    dict[\"items\"] = self.items\n    return dict\n\n\nclass Translatable:\n  __slots__ = \"translations\"\n  def __init__(self):\n    self.translations = {}\n  def add(self, locale, text):\n    self.translations[locale] = text\n    return self\n  def toDict(self):\n    return setType(self.translations, \"Translatable\")\n\n\ndef toDict(zuper, type):\n  return setType(zuper.toDict(), type)\n\n\ndef setType(dict, type):\n  key = \"__type__\"\n  seperator = \".\"\n\n  path = [type]\n  if key in dict:\n    path.insert(0, dict[key])\n  dict[key] = seperator.join(path)\n  return dict\n";
function pyWorker() {
    return "\n  from collections.abc import Generator\n  import json\n  import html\n  import pandas as pd\n\n  class ScriptWrapper(Generator):\n    def __init__(self, script):\n        self.script = script\n    def send(self, data):\n        print(\"toDict\")\n        event = self.script.send(data)\n        return event.toDict()\n    def throw(self, type=None, value=None, traceback=None):\n        raise StopIteration\n  script = process()\n  ScriptWrapper(script)\n  ";
}
