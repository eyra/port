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
export var Bullet = function (_a) {
    var _b = _a.color, color = _b === void 0 ? 'bg-primary' : _b, _c = _a.frameSize, frameSize = _c === void 0 ? 'w-7 h-9' : _c, children = _a.children;
    return (_jsxs("div", __assign({ className: 'flex flex-row' }, { children: [_jsx("div", __assign({ className: "flex flex-row items-center flex-shrink-0 ".concat(frameSize) }, { children: _jsx("div", { className: "w-10px h-10px rounded-full overflow-hidden ".concat(color) }) })), children] })));
};
