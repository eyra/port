import { isCommand } from '../types/commands';
var WorkerProcessingEngine = /** @class */ (function () {
    function WorkerProcessingEngine(worker, commandHandler) {
        var _this = this;
        this.commandHandler = commandHandler;
        this.worker = worker;
        this.worker.onerror = console.log;
        this.worker.onmessage = function (event) {
            console.log('[WorkerProcessingEngine] Received event from worker: ', event.data.eventType);
            _this.handleEvent(event);
        };
    }
    WorkerProcessingEngine.prototype.handleEvent = function (event) {
        var eventType = event.data.eventType;
        console.log('[ReactEngine] received eventType: ', eventType);
        switch (eventType) {
            case 'initialiseDone':
                console.log('[ReactEngine] received: initialiseDone');
                this.loadScript(this.script);
                break;
            case 'loadScriptDone':
                console.log('[ReactEngine] Received: loadScriptDone');
                this.firstRunCycle();
                break;
            case 'runCycleDone':
                console.log('[ReactEngine] received: event', event.data.scriptEvent);
                this.handleRunCycle(event.data.scriptEvent);
                break;
            default:
                console.log('[ReactEngine] received unsupported flow event: ', eventType);
        }
    };
    WorkerProcessingEngine.prototype.start = function (script) {
        console.log('[WorkerProcessingEngine] started');
        this.script = script;
        this.worker.postMessage({ eventType: 'initialise' });
    };
    WorkerProcessingEngine.prototype.loadScript = function (script) {
        this.worker.postMessage({ eventType: 'loadScript', script: script });
    };
    WorkerProcessingEngine.prototype.firstRunCycle = function () {
        this.worker.postMessage({ eventType: 'firstRunCycle' });
    };
    WorkerProcessingEngine.prototype.nextRunCycle = function (response) {
        this.worker.postMessage({ eventType: 'nextRunCycle', response: response });
    };
    WorkerProcessingEngine.prototype.terminate = function () {
        this.worker.terminate();
    };
    WorkerProcessingEngine.prototype.handleRunCycle = function (command) {
        var _this = this;
        if (isCommand(command)) {
            this.commandHandler.onCommand(command).then(function (response) { return _this.nextRunCycle(response); }, function () { });
        }
    };
    return WorkerProcessingEngine;
}());
export default WorkerProcessingEngine;
