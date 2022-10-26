import { isInstanceOf, isLike } from '../helpers';
import { isPropsUIPage } from './pages';
export function isScript(arg) {
    return typeof arg === 'string' || isFile(arg) || isURL(arg);
}
export function isFile(arg) {
    return isLike(arg, ['arrayBuffer', 'lastModified', 'name', 'size', 'slice', 'stream', 'text', 'type', 'webkitRelativePath']);
}
export function isURL(arg) {
    return isLike(arg, ['hash', 'host', 'hostname', 'href', 'origin', 'toString', 'password', 'pathname', 'port', 'protocol', 'search', 'searchParams', 'username', 'toJSON']);
}
export function isTable(arg) {
    return isInstanceOf(arg, 'Table', ['id', 'title', 'data']);
}
export function isResponse(arg) {
    return isInstanceOf(arg, 'Response', ['command', 'payload']) &&
        isCommand(arg.command);
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
    return isInstanceOf(arg, 'CommandSystemDonate', ['key', 'data']);
}
export function isCommandUIRender(arg) {
    return isInstanceOf(arg, 'CommandUIRender', ['page']) && isPropsUIPage(arg.page);
}
