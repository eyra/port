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
export var PageIcon = function (_a) {
    var index = _a.index, selected = _a.selected, onClick = _a.onClick;
    function width() {
        if (index > 999)
            return 'w-10';
        if (index > 99)
            return 'w-9';
        return 'w-8';
    }
    return (_jsx("div", __assign({ className: "rounded ".concat(width(), " h-8 cursor-pointer flex-shrink-0 overflow-hidden ").concat(selected ? 'bg-primary' : 'bg-grey5 '), onClick: onClick }, { children: _jsx("div", __assign({ className: 'flex flex-row items-center justify-center w-full h-full' }, { children: _jsx("div", __assign({ className: "text-label font-label ".concat(selected ? 'text-white' : 'text-grey2') }, { children: "".concat(index) })) })) })));
};
