/// <reference types="react" />
import { PropsUIPage } from '../../types/pages';
import { Payload } from '../../types/commands';
export interface ReactFactoryContext {
    locale: string;
    resolve?: (payload: Payload) => void;
}
export default class ReactFactory {
    createPage(page: PropsUIPage, context: ReactFactoryContext): JSX.Element;
}
