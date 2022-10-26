export var isInstanceOf = function (arg, type, properties) {
    return (arg === null || arg === void 0 ? void 0 : arg.__type__) === type && isLike(arg, properties);
};
export var isLike = function (arg, properties) {
    return !properties.some(function (property) { return arg[property] === undefined; });
};
