var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isCommandSystem, isCommandUI } from './types/commands';
export default class CommandRouter {
    constructor(system, visualisationEngine) {
        this.system = system;
        this.visualisationEngine = visualisationEngine;
    }
    onCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                if (isCommandSystem(command)) {
                    this.onCommandSystem(command, resolve);
                }
                else if (isCommandUI(command)) {
                    this.onCommandUI(command, resolve);
                }
                else {
                    reject(new TypeError('Unknown command' + JSON.stringify(command)));
                }
            });
        });
    }
    onCommandSystem(command, resolve) {
        this.system.send(command);
        resolve({ __type__: 'Response', command, payload: { __type__: 'PayloadVoid', value: undefined } });
    }
    onCommandUI(command, reject) {
        this.visualisationEngine.render(command).then((response) => { reject(response); }, () => { });
    }
}
