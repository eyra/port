let pyScript

onmessage = (event) => {
  const { eventType } = event.data
  switch (eventType) {
    case 'initialise':
      initialise().then(() => {
        self.postMessage({ eventType: 'initialiseDone' })
      })
      break

    case 'loadScript':
      loadScript(event.data.script)
      self.postMessage({ eventType: 'loadScriptDone' })
      break

    case 'firstRunCycle':
      pyScript = self.pyodide.runPython(pyWorker())
      runCycle(null)
      break

    case 'nextRunCycle':
      const { response } = event.data
      unwrap(response).then((userInput) => {
        runCycle(userInput)
      })
      break

    default:
      console.log('[ProcessingWorker] Received unsupported event: ', eventType)
  }
}

function runCycle (userInput) {
  scriptEvent = pyScript.send(userInput)
  self.postMessage({
    eventType: 'runCycleDone',
    scriptEvent: scriptEvent.toJs({
      create_proxies: false,
      dict_converter: Object.fromEntries
    })
  })
}

function unwrap (response) {
  return new Promise((resolve) => {
    switch (response.prompt.__type__) {
      case 'Event.Command.Prompt.FileInput':
        copyFileToPyFS(response.userInput, resolve)
        break

      default:
        resolve(response.userInput)
    }
  })
}

function copyFileToPyFS (file, resolve) {
  const reader = file.stream().getReader()
  const pyFile = self.pyodide.FS.open(file.name, 'w')

  const writeToPyFS = ({ done, value }) => {
    if (done) {
      resolve(file.name)
    } else {
      self.pyodide.FS.write(pyFile, value, 0, value.length)
      reader.read().then(writeToPyFS)
    }
  }
  reader.read().then(writeToPyFS)
}

function initialise () {
  importScripts('https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js')

  return loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.21.2/full/'
  }).then((pyodide) => {
    self.pyodide = pyodide
    return self.pyodide.loadPackage(['micropip', 'numpy', 'pandas'])
  }).then((pyodide) => {
    return self.pyodide.runPythonAsync(`
        import micropip
        await micropip.install("/ddpinspect-0.0.0-py3-none-any.whl", deps=False)
    `);
  })
}

function loadScript (script) {
  console.log('[ProcessingWorker] loadScript')
  self.pyodide.runPython(pyPortApi)
  self.pyodide.runPython(script)
}

const pyPortApi = `
class Event:
  def toDict(self):
    return setType({}, "Event")


class EndOfFlow(Event):
  __slots__ = "result"
  def __init__(self, result):
    self.result = result
  def translate_result(self):
    print("translate")
    data_output = []
    for data in self.result:
      df = data["data_frame"]
      data_output.append({"id": data["id"], "data_frame": df.to_json()})
    return {
      "title": data["title"],
      "data": data_output,
    }
  def toDict(self):
    print("toDict2")
    dict = toDict(super(), "EndOfFlow") 
    dict = dict | self.translate_result()
    return dict
  
class NextFlow(EndOfFlow):
  def toDict(self):
    print("toDict2")
    dict = toDict(super(), "NextFlow") 
    dict = dict | self.translate_result()
    return dict

class Command(Event):
  def toDict(self):
    return toDict(super(), "Command")


class Prompt(Command):
  __slots__ = "title", "description"
  def __init__(self, title, description):
    self.title = title
    self.description = description
  def toDict(self):
    dict = toDict(super(), "Prompt")
    dict["title"] = self.title.toDict()
    dict["description"] = self.description.toDict()
    return dict


class FileInput(Prompt):
  __slots__ = "extensions"
  def __init__(self, title, description, extensions):
    super().__init__(title, description)
    self.extensions = extensions
  def toDict(self):
    dict = toDict(super(), "FileInput")
    dict["extensions"] = self.extensions
    return dict


class RadioInput(Prompt):
  def __init__(self, title, description, items):
    super().__init__(title, description)
    self.items = items
  def toDict(self):
    dict = toDict(super(), "RadioInput")
    dict["items"] = self.items
    return dict


class Translatable:
  __slots__ = "translations"
  def __init__(self):
    self.translations = {}
  def add(self, locale, text):
    self.translations[locale] = text
    return self
  def toDict(self):
    return setType(self.translations, "Translatable")


def toDict(zuper, type):
  return setType(zuper.toDict(), type)


def setType(dict, type):
  key = "__type__"
  seperator = "."

  path = [type]
  if key in dict:
    path.insert(0, dict[key])
  dict[key] = seperator.join(path)
  return dict
`

function pyWorker () {
  return `
  from collections.abc import Generator
  import json
  import html
  import pandas as pd

  class ScriptWrapper(Generator):
    def __init__(self, script):
        self.script = script
    def send(self, data):
        print("toDict")
        event = self.script.send(data)
        return event.toDict()
    def throw(self, type=None, value=None, traceback=None):
        raise StopIteration
  script = process()
  ScriptWrapper(script)
  `
}
