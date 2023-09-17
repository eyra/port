var pyScript;
onmessage = function (event) {
    var eventType = event.data.eventType;
    switch (eventType) {
        case 'initialise':
            initialise().then(function () {
                self.postMessage({ eventType: 'initialiseDone' });
            });
            break;
        case 'firstRunCycle':
            pyScript = self.pyodide.runPython("port.start(".concat(event.data.sessionId, ")"));
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
    return startPyodide().then(function (pyodide) {
        self.pyodide = pyodide;
        return loadPackages();
    })
        .then(function () {
        return installPortPackage();
    });
}
function startPyodide() {
    importScripts('https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js');
    console.log('[ProcessingWorker] loading Pyodide');
    return loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.21.2/full/'
    });
}
function loadPackages() {
    console.log('[ProcessingWorker] loading packages');
    return self.pyodide.loadPackage(['micropip', 'numpy', 'pandas']);
}
function installPortPackage() {
    console.log('[ProcessingWorker] load port package');
    return self.pyodide.runPythonAsync("\n    import micropip\n    await micropip.install(\"../../port-0.0.0-py3-none-any.whl\", deps=False)\n    import port\n  ");
}
