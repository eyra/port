import { PropsUIPage } from './pages';
export declare type Script = string | File | URL;
export declare function isScript(arg: any): arg is Script;
export declare function isFile(arg: unknown): arg is File;
export declare function isURL(arg: any): arg is URL;
export interface Table {
    id: string;
    title: Text;
    data: any;
}
export declare function isTable(arg: any): arg is Table;
export interface Response {
    command: Command;
    payload: Payload;
}
export declare function isResponse(arg: any): arg is Response;
export declare type Payload = PayloadResolved | PayloadRejected;
export declare type PayloadRejected = PayloadFalse | PayloadError;
export interface PayloadFalse {
    __type__: 'PayloadFalse';
    value: false;
}
export interface PayloadError {
    __type__: 'PayloadError';
    value: string;
}
export declare type PayloadResolved = PayloadVoid | PayloadTrue | PayloadString | PayloadFile;
export interface PayloadVoid {
    __type__: 'PayloadVoid';
    value: undefined;
}
export interface PayloadTrue {
    __type__: 'PayloadTrue';
    value: true;
}
export interface PayloadString {
    __type__: 'PayloadString';
    value: string;
}
export interface PayloadFile {
    __type__: 'PayloadFile';
    value: File;
}
export declare type Command = CommandUI | CommandSystem;
export declare function isCommand(arg: any): arg is Command;
export declare type CommandSystem = CommandSystemDonate;
export declare function isCommandSystem(arg: any): arg is CommandSystem;
export declare type CommandUI = CommandUIRender;
export declare function isCommandUI(arg: any): arg is CommandUI;
export interface CommandSystemDonate {
    __type__: 'CommandSystemDonate';
    key: string;
    data: string;
}
export declare function isCommandSystemDonate(arg: any): arg is CommandSystemDonate;
export interface CommandUIRender {
    __type__: 'CommandUIRender';
    page: PropsUIPage;
}
export declare function isCommandUIRender(arg: any): arg is CommandUIRender;
