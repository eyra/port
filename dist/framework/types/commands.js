import { isInstanceOf } from '../helpers';
import { isPropsUIPage } from './pages';
export function isTable(arg) {
    return isInstanceOf(arg, 'Table', ['id', 'title', 'data']);
}
export function isResponse(arg) {
    return isInstanceOf(arg, 'Response', ['command', 'payload']) && isCommand(arg.command);
}
export function isPayloadJSON(arg) {
    return isInstanceOf(arg, 'PayloadJSON', ['value']);
}
export function isCommand(arg) {
    return isCommandUI(arg) || isCommandSystem(arg);
}
export function isCommandSystem(arg) {
    return isCommandSystemDonate(arg);
}
export function isCommandUI(arg) {
    return isCommandUIRender(arg);
}
export function isCommandSystemDonate(arg) {
    return isInstanceOf(arg, 'CommandSystemDonate', ['key', 'json_string']);
}
export function isCommandUIRender(arg) {
    return isInstanceOf(arg, 'CommandUIRender', ['page']) && isPropsUIPage(arg.page);
}
