import { PropsUIRadioItem, Text } from './elements';
export declare type PropsUIPrompt = PropsUIPromptFileInput | PropsUIPromptRadioInput | PropsUIPromptConsentForm | PropsUIPromptConfirm;
export declare function isPropsUIPrompt(arg: any): arg is PropsUIPrompt;
export interface PropsUIPromptConfirm {
    __type__: 'PropsUIPromptConfirm';
    text: Text;
    ok: Text;
    cancel: Text;
}
export declare function isPropsUIPromptConfirm(arg: any): arg is PropsUIPromptConfirm;
export interface PropsUIPromptFileInput {
    __type__: 'PropsUIPromptFileInput';
    description: Text;
    extensions: string;
}
export declare function isPropsUIPromptFileInput(arg: any): arg is PropsUIPromptFileInput;
export interface PropsUIPromptRadioInput {
    __type__: 'PropsUIPromptRadioInput';
    title: Text;
    description: Text;
    items: PropsUIRadioItem[];
}
export declare function isPropsUIPromptRadioInput(arg: any): arg is PropsUIPromptRadioInput;
export interface PropsUIPromptConsentForm {
    __type__: 'PropsUIPromptConsentForm';
    tables: PropsUIPromptConsentFormTable[];
    metaTables: PropsUIPromptConsentFormTable[];
}
export declare function isPropsUIPromptConsentForm(arg: any): arg is PropsUIPromptConsentForm;
export interface PropsUIPromptConsentFormTable {
    __type__: 'PropsUIPromptConsentFormTable';
    id: string;
    title: Text;
    description: Text;
    data_frame: any;
}
export declare function isPropsUIPromptConsentFormTable(arg: any): arg is PropsUIPromptConsentFormTable;
