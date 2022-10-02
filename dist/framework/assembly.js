import ReactEngine from './visualisation/react/engine';
import ReactFactory from './visualisation/react/factory';
import WorkerProcessingEngine from './processing/worker_engine';
export const Assembly = (worker) => {
    const processingEngine = new WorkerProcessingEngine(worker);
    const visualisationEngine = new ReactEngine(new ReactFactory(), processingEngine);
    processingEngine.eventListener = visualisationEngine.onEvent;
    return visualisationEngine;
};
