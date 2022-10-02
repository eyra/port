var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { jsx as _jsx } from "react/jsx-runtime";
import * as ReactDOM from 'react-dom/client';
import { Main } from './main';
var ReactEngine = /** @class */ (function () {
    function ReactEngine(factory, processingEngine) {
        var _this = this;
        this.factory = factory;
        this.processingEngine = processingEngine;
        this.onEvent = function (event) {
            _this.handleEvent(event);
        };
    }
    ReactEngine.prototype.start = function (script, rootElement, locale) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('[ReactEngine] started');
                        this.script = script;
                        this.root = ReactDOM.createRoot(rootElement);
                        this.locale = locale;
                        this.showStartPage();
                        this.processingEngine.start();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                _this.finishFlow = resolve;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReactEngine.prototype.terminate = function () {
        this.processingEngine.terminate();
    };
    ReactEngine.prototype.renderPage = function (elements) {
        this.root.render(_jsx(Main, { elements: elements }));
    };
    ReactEngine.prototype.showSpinner = function () {
        var spinner = this.create('Spinner');
        this.renderPage([spinner]);
    };
    ReactEngine.prototype.showStartPage = function () {
        var welcome = this.create('Title0', { text: 'Welcome' });
        var spinner = this.create('Spinner');
        this.renderPage([welcome, spinner]);
    };
    ReactEngine.prototype.showFinalPage = function () {
        var thanks = this.create('Title0', { text: 'Thank you' });
        this.renderPage([thanks]);
    };
    ReactEngine.prototype.create = function (type, props) {
        if (props === void 0) { props = {}; }
        return this.factory.createComponent(__assign({ __type__: type }, props), this.locale, function () { });
    };
    ReactEngine.prototype.handleEvent = function (event) {
        var eventType = event.data.eventType;
        console.log('[ReactEngine] received eventType: ', eventType);
        switch (eventType) {
            case 'initialiseDone':
                console.log('[ReactEngine] received: initialiseDone');
                this.processingEngine.loadScript(this.script);
                break;
            case 'loadScriptDone':
                console.log('[ReactEngine] Received: loadScriptDone');
                this.processingEngine.firstRunCycle();
                break;
            case 'runCycleDone':
                console.log('[ReactEngine] received: event', event.data.scriptEvent);
                this.handleRunCycle(event.data.scriptEvent);
                break;
            default:
                console.log('[ReactEngine] received unsupported flow event: ', eventType);
        }
    };
    ReactEngine.prototype.handleRunCycle = function (scriptEvent) {
        var _this = this;
        var type = scriptEvent.__type__;
        if (type.startsWith('Event.EndOfFlow')) {
            this.renderComponent(scriptEvent).then(function (result) {
                var _a;
                _this.showFinalPage();
                (_a = _this.finishFlow) === null || _a === void 0 ? void 0 : _a.call(_this, result);
            }, null);
            return;
        }
        if (type.startsWith('Event.Command.Prompt')) {
            this.renderComponent(scriptEvent).then(function (userInput) {
                _this.showSpinner();
                _this.processingEngine.nextRunCycle({
                    prompt: scriptEvent,
                    userInput: userInput
                });
            }, null);
            return;
        }
        console.log('[ReactEngine] Received unsupported script event: ', type);
    };
    ReactEngine.prototype.renderComponent = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var locale;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        locale = this.locale;
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var component = _this.factory.createComponent(data, locale, resolve);
                                _this.renderPage([component]);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ReactEngine;
}());
export default ReactEngine;
