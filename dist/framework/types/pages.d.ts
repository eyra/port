import { PropsUIFooter, PropsUIHeader } from './elements';
import { PropsUIPromptFileInput, PropsUIPromptConfirm, PropsUIPromptConsentForm, PropsUIPromptRadioInput, PropsUIPromptQuestionnaire } from './prompts';
export type PropsUIPage = PropsUIPageSplashScreen | PropsUIPageDonation | PropsUIPageEnd | PropsUIPageError;
export declare function isPropsUIPage(arg: any): arg is PropsUIPage;
export interface PropsUIPageSplashScreen {
    __type__: 'PropsUIPageSplashScreen';
}
export declare function isPropsUIPageSplashScreen(arg: any): arg is PropsUIPageSplashScreen;
export interface PropsUIPageDonation {
    __type__: 'PropsUIPageDonation';
    platform: string;
    header: PropsUIHeader;
    body: PropsUIPromptFileInput | PropsUIPromptConfirm | PropsUIPromptConsentForm | PropsUIPromptRadioInput | PropsUIPromptQuestionnaire;
    footer: PropsUIFooter;
}
export declare function isPropsUIPageDonation(arg: any): arg is PropsUIPageDonation;
export interface PropsUIPageEnd {
    __type__: 'PropsUIPageEnd';
}
export declare function isPropsUIPageEnd(arg: any): arg is PropsUIPageEnd;
export interface PropsUIPageError {
    __type__: 'PropsUIPageError';
    stacktrace: string;
}
export declare function isPropsUIPageError(arg: any): arg is PropsUIPageError;
