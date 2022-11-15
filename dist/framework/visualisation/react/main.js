var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
export var Main = function (_a) {
    var elements = _a.elements;
    elements = elements.map(function (element, index) { return __assign(__assign({}, element), { key: "".concat(index) }); });
    return (_jsx("div", __assign({ className: 'w-full h-full' }, { children: elements })));
};
