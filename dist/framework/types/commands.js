import { instanceOf, childOf } from '../helpers';
export function isScript(arg) {
    return typeof arg === 'string' || isFile(arg) || isURL(arg);
}
export function isFile(arg) {
    return instanceOf(arg, ['arrayBuffer', 'lastModified', 'name', 'size', 'slice', 'stream', 'text', 'type', 'webkitRelativePath']);
}
export function isURL(arg) {
    return instanceOf(arg, ['hash', 'host', 'hostname', 'href', 'origin', 'toString', 'password', 'pathname', 'port', 'protocol', 'search', 'searchParams', 'username', 'toJSON']);
}
export function isTable(arg) {
    return instanceOf(arg, ['id', 'title', 'data']);
}
export function isResponse(arg) {
    return instanceOf(arg, ['command', 'payload']);
}
export function isCommand(arg) {
    return childOf(arg, 'Command');
}
export function isCommandSystem(arg) {
    return childOf(arg, 'CommandSystem');
}
export function isCommandUI(arg) {
    return childOf(arg, 'CommandUI');
}
export function isCommandSystemDonate(arg) {
    return instanceOf(arg, ['__type__', 'key', 'data']) && arg.__type__ === 'CommandSystemDonate';
}
export function isCommandUIRender(arg) {
    return instanceOf(arg, ['__type__', 'page']) && arg.__type__ === 'CommandUIRender';
}
