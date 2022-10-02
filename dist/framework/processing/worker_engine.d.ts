import ProcessingEngine from '../abstractions/processing_engine';
export default class WorkerProcessingEngine implements ProcessingEngine {
    eventListener: (event: any) => void;
    worker: Worker;
    constructor(worker: Worker);
    start(): void;
    loadScript(script: any): void;
    firstRunCycle(): void;
    nextRunCycle(response: any): void;
    terminate(): void;
}
