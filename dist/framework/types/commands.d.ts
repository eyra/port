import { PropsUIPage } from './pages';
export interface Table {
    __type__: 'Table';
    id: string;
    title: Text;
    data: any;
}
export declare function isTable(arg: any): arg is Table;
export interface Response {
    __type__: 'Response';
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
export declare type PayloadResolved = PayloadVoid | PayloadTrue | PayloadString | PayloadFile | PayloadJSON;
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
export interface PayloadJSON {
    __type__: 'PayloadJSON';
    value: string;
}
export declare function isPayloadJSON(arg: any): arg is PayloadJSON;
export declare type Command = CommandUI | CommandSystem;
export declare function isCommand(arg: any): arg is Command;
export declare type CommandSystem = CommandSystemDonate;
export declare function isCommandSystem(arg: any): arg is CommandSystem;
export declare type CommandUI = CommandUIRender;
export declare function isCommandUI(arg: any): arg is CommandUI;
export interface CommandSystemDonate {
    __type__: 'CommandSystemDonate';
    key: string;
    json_string: string;
}
export declare function isCommandSystemDonate(arg: any): arg is CommandSystemDonate;
export interface CommandUIRender {
    __type__: 'CommandUIRender';
    page: PropsUIPage;
}
export declare function isCommandUIRender(arg: any): arg is CommandUIRender;
