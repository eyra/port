import { isInstanceOf, isLike } from '../helpers';
import { isPropsUIPage } from './pages';
import { isPropsUIPrompt } from './prompts';
// UI
export function isPropsUI(arg) {
    return isPropsUIText(arg) ||
        isPropsUIButton(arg) ||
        isPropsUISpinner(arg) ||
        isPropsUIProgress(arg) ||
        isPropsUIHeader(arg) ||
        isPropsUITable(arg) ||
        isPropsUIPage(arg) ||
        isPropsUIPrompt(arg);
}
// TEXTS
export function isPropsUIText(arg) {
    return isPropsUITextTitle0(arg) ||
        isPropsUITextTitle0(arg) ||
        isPropsUITextTitle1(arg) ||
        isPropsUITextTitle2(arg) ||
        isPropsUITextTitle3(arg) ||
        isPropsUITextTitle4(arg) ||
        isPropsUITextTitle6(arg) ||
        isPropsUITextBodyLarge(arg) ||
        isPropsUITextBodyMedium(arg) ||
        isPropsUITextLabel(arg) ||
        isPropsUITextCaption(arg);
}
export function isPropsUITextLabel(arg) {
    return isInstanceOf(arg, 'PropsUITextLabel', ['text', 'color', 'margin']);
}
export function isPropsUITextCaption(arg) {
    return isInstanceOf(arg, 'PropsUITextCaption', ['text', 'color', 'margin']);
}
export function isPropsUITextBodyLarge(arg) {
    return isInstanceOf(arg, 'PropsUITextBodyLarge', ['text', 'color', 'margin']);
}
export function isPropsUITextBodyMedium(arg) {
    return isInstanceOf(arg, 'PropsUITextBodyMedium', ['text', 'color', 'margin']);
}
export function isPropsUITextBodySmall(arg) {
    return isInstanceOf(arg, 'PropsUITextBodySmall', ['text', 'color', 'margin']);
}
export function isPropsUITextTitle0(arg) {
    return isInstanceOf(arg, 'PropsUITextTitle0', ['text', 'color', 'margin']);
}
export function isPropsUITextTitle1(arg) {
    return isInstanceOf(arg, 'PropsUITextTitle1', ['text', 'color', 'margin']);
}
export function isPropsUITextTitle2(arg) {
    return isInstanceOf(arg, 'PropsUITextTitle2', ['text', 'color', 'margin']);
}
export function isPropsUITextTitle3(arg) {
    return isInstanceOf(arg, 'PropsUITextTitle3', ['text', 'color', 'margin']);
}
export function isPropsUITextTitle4(arg) {
    return isInstanceOf(arg, 'PropsUITextTitle4', ['text', 'color', 'margin']);
}
export function isPropsUITextTitle6(arg) {
    return isInstanceOf(arg, 'PropsUITextTitle6', ['text', 'color', 'margin']);
}
// BUTTONS
export function isPropsUIButton(arg) {
    return isPropsUIButtonPrimary(arg) ||
        isPropsUIButtonSecundary(arg) ||
        isPropsUIButtonBack(arg) ||
        isPropsUIButtonForward(arg) ||
        isPropsUIButtonIconBack(arg) ||
        isPropsUIButtonIconForward(arg) ||
        isPropsUIButtonIcon(arg) ||
        isPropsUIButtonLabel(arg) ||
        isPropsUIButtonIconLabel(arg);
}
export function isPropsUIButtonPrimary(arg) {
    return isInstanceOf(arg, 'PropsUIButtonPrimary', ['label', 'color', 'onClick']);
}
export function isPropsUIButtonSecundary(arg) {
    return isInstanceOf(arg, 'PropsUIButtonSecundary', ['label', 'color', 'onClick']);
}
export function isPropsUIButtonBack(arg) {
    return isInstanceOf(arg, 'PropsUIButtonBack', ['label', 'onClick']);
}
export function isPropsUIButtonForward(arg) {
    return isInstanceOf(arg, 'PropsUIButtonForward', ['label', 'onClick']);
}
export function isPropsUIButtonIconBack(arg) {
    return isInstanceOf(arg, 'PropsUIButtonIconBack', ['onClick']);
}
export function isPropsUIButtonIconForward(arg) {
    return isInstanceOf(arg, 'PropsUIButtonIconForward', ['onClick']);
}
export function isPropsUIButtonIcon(arg) {
    return isInstanceOf(arg, 'PropsUIButtonIcon', ['icon', 'onClick']);
}
export function isPropsUIButtonIconLabel(arg) {
    return isInstanceOf(arg, 'PropsUIButtonIconLabel', ['icon', 'label', 'color', 'alignment', 'onClick']);
}
export function isPropsUIButtonLabel(arg) {
    return isInstanceOf(arg, 'PropsUIButtonLabel', ['label', 'onClick']);
}
export function isPropsUIRadioItem(arg) {
    return isInstanceOf(arg, 'PropsUIRadioItem', ['id', 'value', 'selected', 'onSelect']);
}
export function isPropsUICheckBox(arg) {
    return isInstanceOf(arg, 'PropsUICheckBox', ['id', 'selected', 'onSelect']);
}
export function isPropsUISpinner(arg) {
    return isInstanceOf(arg, 'PropsUISpinner', ['color', 'spinning']);
}
export function isPropsUIProgress(arg) {
    return isInstanceOf(arg, 'PropsUIProgress', ['percentage']);
}
export function isPropsUIHeader(arg) {
    return isInstanceOf(arg, 'PropsUIHeader', ['title']);
}
export function isPropsUIFooter(arg) {
    return isInstanceOf(arg, 'PropsUIFooter', ['progressPercentage']);
}
export function isPropsUITable(arg) {
    return isInstanceOf(arg, 'PropsUITable', ['readOnly', 'pageSize', 'id', 'head', 'body']);
}
export function isPropsUITableHead(arg) {
    return isInstanceOf(arg, 'PropsUITableHead', ['cells']);
}
export function isPropsUITableBody(arg) {
    return isInstanceOf(arg, 'PropsUITableBody', ['rows']);
}
export function isPropsUITableRow(arg) {
    return isInstanceOf(arg, 'PropsUITableRow', ['id', 'cells']);
}
export function isPropsUITableCell(arg) {
    return isInstanceOf(arg, 'PropsUITableCell', ['text']);
}
export function isPropsUISearchBar(arg) {
    return isInstanceOf(arg, 'PropsUISearchBar', ['placeholder']);
}
export function isText(arg) {
    return typeof arg === 'string' || isTranslatable(arg);
}
export function isTranslatable(arg) {
    return isLike(arg, ['translations']);
}
