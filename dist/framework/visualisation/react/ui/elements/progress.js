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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export var Progress = function (_a) {
    var percentage = _a.percentage;
    return (_jsxs("div", __assign({ id: 'progress', className: 'relative w-full overflow-hidden rounded-full' }, { children: [_jsx("div", __assign({ className: 'flex flex-row items-center gap-4' }, { children: _jsx("div", { className: 'flex-grow h-4 bg-primarylight' }) })), _jsx("div", { className: 'absolute top-0 h-4 bg-primary', style: { width: "".concat(percentage, "%") } })] })));
};
