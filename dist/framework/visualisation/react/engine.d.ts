/// <reference types="react" />
import * as ReactDOM from 'react-dom/client';
import VisualisationEngine from '../../abstractions/visualisation_engine';
import ProcessingEngine from '../../abstractions/processing_engine';
import VisualisationFactory from './factory';
export default class ReactEngine implements VisualisationEngine {
    factory: VisualisationFactory;
    processingEngine: ProcessingEngine;
    onEvent: (event: any) => void;
    locale: string;
    script: string;
    root: ReactDOM.Root;
    finishFlow: (value: unknown) => void;
    constructor(factory: VisualisationFactory, processingEngine: ProcessingEngine);
    start(script: string, rootElement: HTMLElement, locale: string): Promise<any>;
    terminate(): void;
    renderPage(elements: JSX.Element[]): void;
    showSpinner(): void;
    showStartPage(): void;
    showFinalPage(): void;
    create(type: string, props?: any): JSX.Element;
    handleEvent(event: any): void;
    handleRunCycle(scriptEvent: any): void;
    renderComponent(data: any): Promise<any>;
}
