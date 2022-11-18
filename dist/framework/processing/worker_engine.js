var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { isCommand } from '../types/commands';
var WorkerProcessingEngine = /** @class */ (function () {
    function WorkerProcessingEngine(sessionId, worker, commandHandler) {
        var _this = this;
        this.sessionId = sessionId;
        this.commandHandler = commandHandler;
        this.worker = worker;
        this.worker.onerror = console.log;
        this.worker.onmessage = function (event) {
            console.log('[WorkerProcessingEngine] Received event from worker: ', event.data.eventType);
            _this.handleEvent(event);
        };
        this.trackUserStart(sessionId);
    }
    WorkerProcessingEngine.prototype.trackUserStart = function (sessionId) {
        var key = "".concat(sessionId, "-tracking");
        var jsonString = JSON.stringify({ message: 'user started' });
        var command = { __type__: 'CommandSystemDonate', key: key, json_string: jsonString };
        this.commandHandler.onCommand(command).then(function () { }, function () { });
    };
    WorkerProcessingEngine.prototype.handleEvent = function (event) {
        var eventType = event.data.eventType;
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
    };
    WorkerProcessingEngine.prototype.start = function () {
        var _this = this;
        console.log('[WorkerProcessingEngine] started');
        var waitForInitialization = this.waitForInitialization();
        var waitForSplashScreen = this.waitForSplashScreen();
        Promise.all([waitForInitialization, waitForSplashScreen]).then(function () { _this.firstRunCycle(); }, function () { });
    };
    WorkerProcessingEngine.prototype.waitForInitialization = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            _this.resolveInitialized = resolve;
                            _this.worker.postMessage({ eventType: 'initialise' });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    WorkerProcessingEngine.prototype.waitForSplashScreen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            _this.resolveContinue = resolve;
                            _this.renderSplashScreen();
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    WorkerProcessingEngine.prototype.renderSplashScreen = function () {
        var _this = this;
        var command = { __type__: 'CommandUIRender', page: { __type__: 'PropsUIPageSplashScreen' } };
        if (isCommand(command)) {
            this.commandHandler.onCommand(command).then(function (_response) { return _this.resolveContinue(); }, function () { });
        }
    };
    WorkerProcessingEngine.prototype.firstRunCycle = function () {
        this.worker.postMessage({ eventType: 'firstRunCycle', sessionId: this.sessionId });
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
