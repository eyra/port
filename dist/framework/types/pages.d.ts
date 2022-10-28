import { PropsUIHeader, PropsUISpinner } from './elements';
import { PropsUIPromptFileInput, PropsUIPromptConfirm, PropsUIPromptConsentForm } from './prompts';
export declare type PropsUIPage = PropsUIPageSplashScreen | PropsUIPageDonation | PropsUIPageStart | PropsUIPageEnd;
export declare function isPropsUIPage(arg: any): arg is PropsUIPage;
export interface PropsUIPageSplashScreen {
    __type__: 'PropsUIPageSplashScreen';
}
export declare function isPropsUIPageSplashScreen(arg: any): arg is PropsUIPageSplashScreen;
export interface PropsUIPageStart {
    __type__: 'PropsUIPageStart';
}
export declare function isPropsUIPageStart(arg: any): arg is PropsUIPageStart;
export interface PropsUIPageDonation {
    __type__: 'PropsUIPageDonation';
    header: PropsUIHeader;
    body: PropsUIPromptFileInput | PropsUIPromptConfirm | PropsUIPromptConsentForm;
    spinner: PropsUISpinner;
}
export declare function isPropsUIPageDonation(arg: any): arg is PropsUIPageDonation;
export interface PropsUIPageEnd {
    __type__: 'PropsUIPageEnd';
    header: PropsUIHeader;
}
export declare function isPropsUIPageEnd(arg: any): arg is PropsUIPageEnd;
