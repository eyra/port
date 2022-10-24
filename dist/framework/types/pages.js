import { childOf, instanceOf } from '../helpers';
export function isPropsUIPage(arg) {
    return childOf(arg, 'PropsUIPage');
}
export function isPropsUIPageSplashScreen(arg) {
    return instanceOf(arg, ['__type__']) && arg.__type__ === 'PropsUIPageSplashScreen';
}
export function isPropsUIPageStart(arg) {
    return instanceOf(arg, ['__type__']) && arg.__type__ === 'PropsUIPageStart';
}
export function isPropsUIPageDonation(arg) {
    return instanceOf(arg, ['__type__', 'header', 'body']) && arg.__type__ === 'PropsUIPageDonation';
}
export function isPropsUIPageEnd(arg) {
    return instanceOf(arg, ['__type__', 'header']) && arg.__type__ === 'PropsUIPageEnd';
}
