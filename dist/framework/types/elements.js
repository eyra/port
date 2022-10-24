import { instanceOf, childOf } from '../helpers';
// UI
export function isPropsUI(arg) {
    return childOf(arg, 'PropsUI');
}
// TEXTS
export function isPropsUIText(arg) {
    return childOf(arg, 'PropsUIText');
}
export function isPropsUITextBody(arg) {
    return instanceOf(arg, ['__type__', 'text', 'color', 'margin']) && arg.__type__ === 'PropsUITextBody';
}
export function isPropsUITextTitle0(arg) {
    return instanceOf(arg, ['__type__', 'text', 'color', 'margin']) && arg.__type__ === 'PropsUITextTitle0';
}
export function isPropsUITextTitle1(arg) {
    return instanceOf(arg, ['__type__', 'text', 'color', 'margin']) && arg.__type__ === 'PropsUITextTitle1';
}
export function isPropsUITextTitle2(arg) {
    return instanceOf(arg, ['__type__', 'text', 'color', 'margin']) && arg.__type__ === 'PropsUITextTitle2';
}
// BUTTONS
export function isPropsUIButton(arg) {
    return childOf(arg, 'PropsUIButton');
}
export function isPropsUIButtonPrimary(arg) {
    return instanceOf(arg, ['__type__', 'label', 'color', 'onClick']) && arg.__type__ === 'PropsUIButtonPrimary';
}
export function isPropsUIButtonSecundary(arg) {
    return instanceOf(arg, ['__type__', 'label', 'color', 'onClick']) && arg.__type__ === 'PropsUIButtonSecundary';
}
export function isPropsUIButtonForward(arg) {
    return instanceOf(arg, ['__type__', 'label', 'onClick']) && arg.__type__ === 'PropsUIButtonForward';
}
export function isPropsUIButtonLabel(arg) {
    return instanceOf(arg, ['__type__', 'label', 'onClick']) && arg.__type__ === 'PropsUIButtonLabel';
}
export function isPropsUISpinner(arg) {
    return instanceOf(arg, ['__type__', 'text']) && arg.__type__ === 'PropsUISpinner';
}
export function isPropsUIHeader(arg) {
    return instanceOf(arg, ['__type__', 'title']) && arg.__type__ === 'PropsUIHeader';
}
export function isPropsUITable(arg) {
    return instanceOf(arg, ['__type__', 'id', 'head', 'body']) && arg.__type__ === 'PropsUITable';
}
export function isPropsUITableHeader(arg) {
    return instanceOf(arg, ['__type__', 'cells']) && arg.__type__ === 'PropsUITableHead';
}
export function isPropsUITableBody(arg) {
    return instanceOf(arg, ['__type__', 'rows']) && arg.__type__ === 'PropsUITableBody';
}
export function isPropsUITableRow(arg) {
    return instanceOf(arg, ['__type__', 'cells']) && arg.__type__ === 'PropsUITableRow';
}
export function isPropsUITableCell(arg) {
    return instanceOf(arg, ['__type__', 'text']) && arg.__type__ === 'PropsUITableCell';
}
export function isText(arg) {
    return typeof arg === 'string' || isTranslatable(arg);
}
export function isTranslatable(arg) {
    return instanceOf(arg, ['translations']);
}
