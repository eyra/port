export const isInstanceOf = (arg, type, properties) => {
    return (arg === null || arg === void 0 ? void 0 : arg.__type__) === type && isLike(arg, properties);
};
export const isLike = (arg, properties) => {
    properties.forEach((property) => assert(arg[property] !== undefined, `Property ${String(property)} is required`));
    return true;
};
export function assert(condition, msg) {
    if (condition === false)
        throw new Error(msg);
}
