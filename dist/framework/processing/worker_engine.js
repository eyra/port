var WorkerProcessingEngine = /** @class */ (function () {
    function WorkerProcessingEngine(worker) {
        var _this = this;
        this.eventListener = function (event) {
            var eventString = JSON.stringify(event);
            console.log('[ProcessingEngine] No event listener registered for event: ', eventString);
        };
        this.worker = worker;
        this.worker.onerror = console.log;
        this.worker.onmessage = function (event) {
            console.log('[ProcessingEngine] Received event from worker: ', event.data.eventType);
            _this.eventListener(event);
        };
    }
    WorkerProcessingEngine.prototype.start = function () {
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
    return WorkerProcessingEngine;
}());
export default WorkerProcessingEngine;
