export var childOf = function (arg, superType) {
    var _a;
    return (_a = arg === null || arg === void 0 ? void 0 : arg.__type__) === null || _a === void 0 ? void 0 : _a.startsWith(superType);
};
export var instanceOf = function (arg, properties) {
    return !properties.some(function (property) { return arg[property] === undefined; });
};
