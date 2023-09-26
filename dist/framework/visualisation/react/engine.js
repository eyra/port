var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import * as ReactDOM from 'react-dom/client';
import { Main } from './main';
export default class ReactEngine {
    constructor(factory) {
        this.factory = factory;
    }
    start(rootElement, locale) {
        console.log('[ReactEngine] started');
        this.root = ReactDOM.createRoot(rootElement);
        this.locale = locale;
    }
    render(command) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve) => {
                this.renderPage(command.page).then((payload) => {
                    resolve({ __type__: 'Response', command, payload });
                }, () => { });
            });
        });
    }
    renderPage(props) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve) => {
                const context = { locale: this.locale, resolve };
                const page = this.factory.createPage(props, context);
                this.renderElements([page]);
            });
        });
    }
    terminate() {
        console.log('[ReactEngine] stopped');
        this.root.unmount();
    }
    renderElements(elements) {
        this.root.render(_jsx(Main, { elements: elements }));
    }
}
