import ReactEngine from './visualisation/react/engine';
import ReactFactory from './visualisation/react/factory';
import WorkerProcessingEngine from './processing/worker_engine';
export var Assembly = function (worker) {
    var processingEngine = new WorkerProcessingEngine(worker);
    var visualisationEngine = new ReactEngine(new ReactFactory(), processingEngine);
    processingEngine.eventListener = visualisationEngine.onEvent;
    return visualisationEngine;
};
