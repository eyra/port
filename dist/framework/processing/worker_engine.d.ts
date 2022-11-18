import { CommandHandler, ProcessingEngine } from '../types/modules';
import { Response } from '../types/commands';
export default class WorkerProcessingEngine implements ProcessingEngine {
    sessionId: String;
    worker: Worker;
    commandHandler: CommandHandler;
    resolveInitialized: () => void;
    resolveContinue: () => void;
    constructor(sessionId: string, worker: Worker, commandHandler: CommandHandler);
    trackUserStart(sessionId: string): void;
    handleEvent(event: any): void;
    start(): void;
    waitForInitialization(): Promise<void>;
    waitForSplashScreen(): Promise<void>;
    renderSplashScreen(): void;
    firstRunCycle(): void;
    nextRunCycle(response: Response): void;
    terminate(): void;
    handleRunCycle(command: any): void;
}
