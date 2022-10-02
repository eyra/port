import { jsx as _jsx } from "react/jsx-runtime";
import * as ReactDOM from 'react-dom/client';
import { Main } from './main';
export default class ReactEngine {
    factory;
    processingEngine;
    onEvent;
    locale;
    script;
    root;
    finishFlow;
    constructor(factory, processingEngine) {
        this.factory = factory;
        this.processingEngine = processingEngine;
        this.onEvent = (event) => {
            this.handleEvent(event);
        };
    }
    async start(script, rootElement, locale) {
        console.log('[VisualisationEngine] started');
        this.script = script;
        this.root = ReactDOM.createRoot(rootElement);
        this.locale = locale;
        this.showStartPage();
        this.processingEngine.start();
        return await new Promise((resolve) => {
            this.finishFlow = resolve;
        });
    }
    terminate() {
        this.processingEngine.terminate();
    }
    renderPage(elements) {
        this.root.render(_jsx(Main, { elements: elements }));
    }
    showSpinner() {
        const spinner = this.create('Spinner');
        this.renderPage([spinner]);
    }
    showStartPage() {
        const welcome = this.create('Title0', { text: 'Welcome' });
        const spinner = this.create('Spinner');
        this.renderPage([welcome, spinner]);
    }
    showFinalPage() {
        const thanks = this.create('Title0', { text: 'Thank you' });
        this.renderPage([thanks]);
    }
    create(type, props = {}) {
        return this.factory.createComponent({ __type__: type, ...props }, this.locale, () => { });
    }
    handleEvent(event) {
        const { eventType } = event.data;
        console.log('[VisualisationEngine] received eventType: ', eventType);
        switch (eventType) {
            case 'initialiseDone':
                console.log('[VisualisationEngine] received: initialiseDone');
                this.processingEngine.loadScript(this.script);
                break;
            case 'loadScriptDone':
                console.log('[VisualisationEngine] Received: loadScriptDone');
                this.processingEngine.firstRunCycle();
                break;
            case 'runCycleDone':
                console.log('[VisualisationEngine] received: event', event.data.scriptEvent);
                this.handleRunCycle(event.data.scriptEvent);
                break;
            default:
                console.log('[VisualisationEngine] received unsupported flow event: ', eventType);
        }
    }
    handleRunCycle(scriptEvent) {
        console.log('scriptEvent', scriptEvent);
        const type = scriptEvent.__type__;
        if (type.startsWith('Event.EndOfFlow')) {
            this.renderComponent(scriptEvent).then((result) => {
                this.showFinalPage();
                this.finishFlow?.(result);
            }, null);
            return;
        }
        if (type.startsWith('Event.Command.Prompt')) {
            this.renderComponent(scriptEvent).then((userInput) => {
                this.showSpinner();
                this.processingEngine.nextRunCycle({
                    prompt: scriptEvent,
                    userInput: userInput
                });
            }, null);
            return;
        }
        console.log('[VisualisationEngine] Received unsupported script event: ', type);
    }
    async renderComponent(data) {
        const locale = this.locale;
        return await new Promise((resolve) => {
            const component = this.factory.createComponent(data, locale, resolve);
            this.renderPage([component]);
        });
    }
}
