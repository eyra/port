import { PropsUIFooter, PropsUIHeader } from './elements';
import { PropsUIPromptFileInput, PropsUIPromptConfirm, PropsUIPromptConsentForm, PropsUIPromptRadioInput } from './prompts';
export declare type PropsUIPage = PropsUIPageSplashScreen | PropsUIPageDonation | PropsUIPageEnd;
export declare function isPropsUIPage(arg: any): arg is PropsUIPage;
export interface PropsUIPageSplashScreen {
    __type__: 'PropsUIPageSplashScreen';
}
export declare function isPropsUIPageSplashScreen(arg: any): arg is PropsUIPageSplashScreen;
export interface PropsUIPageDonation {
    __type__: 'PropsUIPageDonation';
    platform: string;
    header: PropsUIHeader;
    body: PropsUIPromptFileInput | PropsUIPromptConfirm | PropsUIPromptConsentForm | PropsUIPromptRadioInput;
    footer: PropsUIFooter;
}
export declare function isPropsUIPageDonation(arg: any): arg is PropsUIPageDonation;
export interface PropsUIPageEnd {
    __type__: 'PropsUIPageEnd';
}
export declare function isPropsUIPageEnd(arg: any): arg is PropsUIPageEnd;
