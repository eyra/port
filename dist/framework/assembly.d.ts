import { VisualisationEngine, ProcessingEngine, System } from './types/modules';
import CommandRouter from './command_router';
export default class Assembly {
    visualisationEngine: VisualisationEngine;
    processingEngine: ProcessingEngine;
    router: CommandRouter;
    constructor(worker: Worker, system: System);
}
