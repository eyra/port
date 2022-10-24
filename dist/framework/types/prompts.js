import { childOf, instanceOf } from '../helpers';
export function isPropsUIPrompt(arg) {
    return childOf(arg, 'PropsUIPrompt');
}
export function isPropsUIPromptConfirm(arg) {
    return instanceOf(arg, ['__type__', 'text', 'ok', 'cancel']) && arg.__type__ === 'PropsUIPromptConfirm';
}
export function isPropsUIPromptFileInput(arg) {
    return instanceOf(arg, ['__type__', 'title', 'description', 'extensions']) && arg.__type__ === 'PropsUIPromptFileInput';
}
export function isPropsUIPromptRadioInput(arg) {
    return instanceOf(arg, ['__type__', 'title', 'description', 'items']) && arg.__type__ === 'PropsUIPromptRadioInput';
}
export function isPropsUIPromptConsentForm(arg) {
    return instanceOf(arg, ['__type__', 'title', 'description', 'tables']) && arg.__type__ === 'PropsUIPromptConsentForm';
}
export function isPropsUIPromptConsentFormTable(arg) {
    return instanceOf(arg, ['__type__', 'id', 'title', 'description', 'data_frame']) && arg.__type__ === 'PropsUIPromptConsentFormTable';
}
