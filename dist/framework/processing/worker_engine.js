var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isCommand } from '../types/commands';
export default class WorkerProcessingEngine {
    constructor(sessionId, worker, commandHandler) {
        this.sessionId = sessionId;
        this.commandHandler = commandHandler;
        this.worker = worker;
        this.worker.onerror = console.log;
        this.worker.onmessage = (event) => {
            console.log('[WorkerProcessingEngine] Received event from worker: ', event.data.eventType);
            this.handleEvent(event);
        };
        this.trackUserStart(sessionId);
    }
    trackUserStart(sessionId) {
        const key = `${sessionId}-tracking`;
        const jsonString = JSON.stringify({ message: 'user started' });
        const command = { __type__: 'CommandSystemDonate', key, json_string: jsonString };
        this.commandHandler.onCommand(command).then(() => { }, () => { });
    }
    handleEvent(event) {
        const { eventType } = event.data;
        console.log('[ReactEngine] received eventType: ', eventType);
        switch (eventType) {
            case 'initialiseDone':
                console.log('[ReactEngine] received: initialiseDone');
                this.resolveInitialized();
                break;
            case 'runCycleDone':
                console.log('[ReactEngine] received: event', event.data.scriptEvent);
                this.handleRunCycle(event.data.scriptEvent);
                break;
            default:
                console.log('[ReactEngine] received unsupported flow event: ', eventType);
        }
    }
    start() {
        console.log('[WorkerProcessingEngine] started');
        const waitForInitialization = this.waitForInitialization();
        const waitForSplashScreen = this.waitForSplashScreen();
        Promise.all([waitForInitialization, waitForSplashScreen]).then(() => { this.firstRunCycle(); }, () => { });
    }
    waitForInitialization() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve) => {
                this.resolveInitialized = resolve;
                this.worker.postMessage({ eventType: 'initialise' });
            });
        });
    }
    waitForSplashScreen() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve) => {
                this.resolveContinue = resolve;
                this.renderSplashScreen();
            });
        });
    }
    renderSplashScreen() {
        const command = { __type__: 'CommandUIRender', page: { __type__: 'PropsUIPageSplashScreen' } };
        if (isCommand(command)) {
            this.commandHandler.onCommand(command).then((_response) => this.resolveContinue(), () => { });
        }
    }
    firstRunCycle() {
        this.worker.postMessage({ eventType: 'firstRunCycle', sessionId: this.sessionId });
    }
    nextRunCycle(response) {
        this.worker.postMessage({ eventType: 'nextRunCycle', response });
    }
    terminate() {
        this.worker.terminate();
    }
    handleRunCycle(command) {
        if (isCommand(command)) {
            this.commandHandler.onCommand(command).then((response) => this.nextRunCycle(response), () => { });
        }
    }
}
