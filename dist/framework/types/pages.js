import { isInstanceOf } from '../helpers';
export function isPropsUIPage(arg) {
    return (isPropsUIPageSplashScreen(arg) ||
        isPropsUIPageDonation(arg) ||
        isPropsUIPageEnd(arg) ||
        isPropsUIPageError(arg));
}
export function isPropsUIPageSplashScreen(arg) {
    return isInstanceOf(arg, 'PropsUIPageSplashScreen', []);
}
export function isPropsUIPageDonation(arg) {
    return isInstanceOf(arg, 'PropsUIPageDonation', ['platform', 'header', 'body', 'footer']);
}
export function isPropsUIPageEnd(arg) {
    return isInstanceOf(arg, 'PropsUIPageEnd', []);
}
export function isPropsUIPageError(arg) {
    return isInstanceOf(arg, 'PropsUIPageError', ['stacktrace']);
}
