import { isInstanceOf } from '../helpers';
export function isPropsUIPrompt(arg) {
    return isPropsUIPromptFileInput(arg) ||
        isPropsUIPromptRadioInput(arg) ||
        isPropsUIPromptConsentForm(arg);
}
export function isPropsUIPromptConfirm(arg) {
    return isInstanceOf(arg, 'PropsUIPromptConfirm', ['text', 'ok', 'cancel']);
}
export function isPropsUIPromptFileInput(arg) {
    return isInstanceOf(arg, 'PropsUIPromptFileInput', ['description', 'extensions']);
}
export function isPropsUIPromptRadioInput(arg) {
    return isInstanceOf(arg, 'PropsUIPromptRadioInput', ['title', 'description', 'items']);
}
export function isPropsUIPromptConsentForm(arg) {
    return isInstanceOf(arg, 'PropsUIPromptConsentForm', ['tables', 'metaTables']);
}
export function isPropsUIPromptConsentFormTable(arg) {
    return isInstanceOf(arg, 'PropsUIPromptConsentFormTable', ['id', 'title', 'description', 'data_frame']);
}
