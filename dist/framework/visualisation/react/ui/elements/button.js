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
import BackSvg from '../../../../../assets/images/back.svg';
import ForwardSvg from '../../../../../assets/images/forward.svg';
export var PrimaryButton = function (_a) {
    var label = _a.label, _b = _a.color, color = _b === void 0 ? 'bg-primary text-white' : _b, onClick = _a.onClick;
    return (_jsx("div", __assign({ className: "pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 cursor-pointer ".concat(color), onClick: onClick }, { children: _jsx("div", __assign({ id: 'confirm-button', className: 'flex-wrap' }, { children: label })) })));
};
export var SecondaryButton = function (_a) {
    var label = _a.label, _b = _a.color, color = _b === void 0 ? 'bg-delete text-delete' : _b, onClick = _a.onClick;
    return (_jsx("div", __assign({ className: "pt-13px pb-13px active:pt-14px active:pb-3 active:shadow-top2px border-2 font-button text-button rounded bg-opacity-0 pr-4 pl-4 cursor-pointer ".concat(color), onClick: onClick }, { children: _jsx("div", __assign({ className: 'flex-wrap' }, { children: label })) })));
};
export var BackButton = function (_a) {
    var label = _a.label, onClick = _a.onClick;
    return (_jsx("div", __assign({ className: 'pt-1 pb-1 active:pt-5px active:pb-3px rounded bg-opacity-0 focus:outline-none cursor-pointer ', onClick: onClick }, { children: _jsxs("div", __assign({ className: 'flex items-center' }, { children: [_jsx("div", { children: _jsx("img", { className: 'mr-2 -mt-2px', src: BackSvg, alt: label }) }), _jsx("div", __assign({ className: 'focus:outline-none' }, { children: _jsx("div", __assign({ className: 'flex flex-col justify-center h-full items-center' }, { children: _jsx("div", __assign({ className: 'flex-wrap text-button font-button text-grey1' }, { children: label })) })) }))] })) })));
};
export var ForwardButton = function (_a) {
    var label = _a.label, onClick = _a.onClick;
    return (_jsx("div", __assign({ className: 'pt-1 pb-1 active:pt-5px active:pb-3px rounded bg-opacity-0 focus:outline-none cursor-pointer ', onClick: onClick }, { children: _jsxs("div", __assign({ className: 'flex items-center' }, { children: [_jsx("div", __assign({ className: 'focus:outline-none' }, { children: _jsx("div", __assign({ className: 'flex flex-col justify-center h-full items-center' }, { children: _jsx("div", __assign({ className: 'flex-wrap text-button font-button text-grey1' }, { children: label })) })) })), _jsx("div", { children: _jsx("img", { className: 'ml-2 -mt-2px', src: ForwardSvg, alt: label }) })] })) })));
};
export var LabelButton = function (_a) {
    var label = _a.label, _b = _a.color, color = _b === void 0 ? 'text-grey1' : _b, onClick = _a.onClick;
    return (_jsx("div", __assign({ className: "pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 cursor-pointer bg-opacity-0 ".concat(color), onClick: onClick }, { children: _jsx("div", __assign({ id: 'confirm-button', className: 'flex-wrap' }, { children: label })) })));
};
