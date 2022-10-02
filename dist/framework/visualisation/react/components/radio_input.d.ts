/// <reference types="react" />
export interface RadioInputProps {
    title: any;
    description: any;
    items: string[];
    locale: string;
    resolve: (value: any) => void;
}
export declare const RadioInputFactory: (props: RadioInputProps) => JSX.Element;
export declare const RadioInput: (props: RadioInputProps) => JSX.Element;
export interface RadioItemProps {
    id: number;
    value: string;
    selected: boolean;
    onSelect: (id: number) => void;
}
export declare const RadioItem: ({ id, value, selected, onSelect }: RadioItemProps) => JSX.Element;
