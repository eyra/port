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
export var Page = function (props) {
    return (_jsxs("div", __assign({ className: 'flex flex-col w-full h-full gap-4' }, { children: [_jsxs("div", __assign({ className: 'flex flex-row w-full gap-10 pt-20 pr-14' }, { children: [_jsx("div", __assign({ className: 'flex-1 pl-14' }, { children: props.body })), _jsx("div", __assign({ className: 'w-sidebar flex-shrink-0' }, { children: props.sidebar }))] })), _jsx("div", { className: 'flex-grow' }), _jsx("div", __assign({ className: 'h-footer flex-shrink-0' }, { children: props.footer }))] })));
};
