import { isInstanceOf } from '../helpers';
export function isPropsUIPage(arg) {
    return (isPropsUIPageSplashScreen(arg) ||
        isPropsUIPageDonation(arg) ||
        isPropsUIPageEnd(arg));
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
