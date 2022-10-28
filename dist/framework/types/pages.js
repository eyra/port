import { isInstanceOf } from '../helpers';
export function isPropsUIPage(arg) {
    return (isPropsUIPageSplashScreen(arg) ||
        isPropsUIPageDonation(arg) ||
        isPropsUIPageStart(arg) ||
        isPropsUIPageEnd(arg));
}
export function isPropsUIPageSplashScreen(arg) {
    return isInstanceOf(arg, 'PropsUIPageSplashScreen', []);
}
export function isPropsUIPageStart(arg) {
    return isInstanceOf(arg, 'PropsUIPageStart', []);
}
export function isPropsUIPageDonation(arg) {
    return isInstanceOf(arg, 'PropsUIPageDonation', ['header', 'body']);
}
export function isPropsUIPageEnd(arg) {
    return isInstanceOf(arg, 'PropsUIPageEnd', ['header']);
}
