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
export var Sidebar = function (props) {
    return (_jsxs("div", __assign({ className: 'flex flex-col gap-10' }, { children: [_jsxs("div", __assign({ className: 'flex-wrap flex flex-row' }, { children: [_jsx("div", { className: 'flex-grow' }), _jsx("div", __assign({ className: 'h-logo' }, { children: _jsx("img", { src: props.logo }) })), _jsx("div", { className: 'flex-grow' })] })), _jsx("div", { children: props.content })] })));
};
