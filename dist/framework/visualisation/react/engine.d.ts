/// <reference types="react" />
import * as ReactDOM from 'react-dom/client';
import { VisualisationEngine } from '../../types/modules';
import { Response, CommandUIRender } from '../../types/commands';
import { PropsUIPage } from '../../types/pages';
import VisualisationFactory from './factory';
export default class ReactEngine implements VisualisationEngine {
    factory: VisualisationFactory;
    locale: string;
    root: ReactDOM.Root;
    constructor(factory: VisualisationFactory);
    start(rootElement: HTMLElement, locale: string): void;
    render(command: CommandUIRender): Promise<Response>;
    renderPage(props: PropsUIPage): Promise<any>;
    terminate(): void;
    renderElements(elements: JSX.Element[]): void;
}
