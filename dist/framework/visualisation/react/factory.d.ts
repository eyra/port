/// <reference types="react" />
export default class ReactFactory {
    mapping: {
        [name: string]: (props: any) => JSX.Element;
    };
    constructor();
    add(factory: (props: any) => JSX.Element, name: string): void;
    createComponent(data: any, locale: string, resolve: (value: any) => void): JSX.Element;
}
