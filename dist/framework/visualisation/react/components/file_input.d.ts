/// <reference types="react" />
export interface FileInputProps {
    title: any;
    description: any;
    extensions: string;
    locale: string;
    resolve: (value: any) => void;
}
export declare const FileInputFactory: (props: FileInputProps) => JSX.Element;
