export var isInstanceOf = function (arg, type, properties) {
    return (arg === null || arg === void 0 ? void 0 : arg.__type__) === type && isLike(arg, properties);
};
export var isLike = function (arg, properties) {
    properties.forEach(function (property) { return assert(arg[property] !== undefined, "Property ".concat(String(property), " is required")); });
    return true;
};
export function assert(condition, msg) {
    if (condition === false)
        throw new Error(msg);
}
