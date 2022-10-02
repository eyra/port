/// <reference types="react" />
export interface EndOfFlowProps {
    title: string;
    data: any[];
    locale: string;
    resolve: (value: any) => void;
}
export declare const EndOfFlowFactory: (props: EndOfFlowProps) => JSX.Element;
export declare const EndOfFlow: (props: EndOfFlowProps) => JSX.Element;
