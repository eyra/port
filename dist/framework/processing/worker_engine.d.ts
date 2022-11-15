import { CommandHandler, ProcessingEngine } from '../types/modules';
import { Response, Script } from '../types/commands';
export default class WorkerProcessingEngine implements ProcessingEngine {
    worker: Worker;
    commandHandler: CommandHandler;
    script: Script;
    resolveInitialized: () => void;
    resolveContinue: () => void;
    constructor(worker: Worker, commandHandler: CommandHandler);
    handleEvent(event: any): void;
    start(script: Script): void;
    waitForInitialization(): Promise<void>;
    waitForSplashScreen(): Promise<void>;
    renderSplashScreen(): void;
    loadScript(script: any): void;
    firstRunCycle(): void;
    nextRunCycle(response: Response): void;
    terminate(): void;
    handleRunCycle(command: any): void;
}
