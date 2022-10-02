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
export var PrimaryButtonFactory = function (props) { return _jsx(PrimaryButton, __assign({}, props)); };
export var PrimaryButton = function (_a) {
    var label = _a.label, _b = _a.color, color = _b === void 0 ? 'bg-primary text-white' : _b, onClick = _a.onClick;
    return (_jsx("div", __assign({ className: "pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 cursor-pointer ".concat(color), onClick: onClick }, { children: _jsx("div", __assign({ id: 'confirm-button', className: 'flex-wrap' }, { children: label })) })));
};
export var SecondaryButtonFactory = function (props) { return _jsx(SecondaryButton, __assign({}, props)); };
export var SecondaryButton = function (_a) {
    var label = _a.label, _b = _a.color, color = _b === void 0 ? 'bg-delete text-delete' : _b, onClick = _a.onClick;
    return (_jsx("div", __assign({ className: "pt-13px pb-13px active:pt-14px active:pb-3 active:shadow-top2px border-2 font-button text-button rounded bg-opacity-0 pr-4 pl-4 ".concat(color), onClick: onClick }, { children: _jsx("div", __assign({ className: 'flex-wrap' }, { children: label })) })));
};
