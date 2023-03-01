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
import { Spinner } from './spinner';
function spinnerColor(buttonColor) {
    if (buttonColor.includes('bg-tertiary')) {
        return 'dark';
    }
    return 'light';
}
export var PrimaryButton = function (_a) {
    var label = _a.label, _b = _a.spinning, spinning = _b === void 0 ? false : _b, _c = _a.enabled, enabled = _c === void 0 ? true : _c, _d = _a.color, color = _d === void 0 ? 'bg-primary text-white' : _d, onClick = _a.onClick;
    return (_jsxs("div", __assign({ className: 'relative min-w-button' }, { children: [_jsx("div", __assign({ className: "flex flex-col items-center leading-none font-button text-button rounded ".concat(enabled ? 'cursor-pointer active:shadow-top4px' : '', " ").concat(color), onClick: onClick }, { children: _jsx("div", __assign({ id: 'confirm-button', className: "pt-15px pb-15px pr-4 pl-4 ".concat(enabled ? 'active:pt-4 active:pb-14px' : '', " ").concat(spinning ? 'opacity-0' : '') }, { children: label })) })), _jsx("div", __assign({ className: "absolute top-0 h-full w-full flex flex-col justify-center items-center ".concat(spinning ? '' : 'hidden') }, { children: _jsx("div", __assign({ className: 'w-5 h-5' }, { children: _jsx(Spinner, { color: spinnerColor(color), spinning: spinning }) })) }))] })));
};
export var SecondaryButton = function (_a) {
    var label = _a.label, _b = _a.color, color = _b === void 0 ? 'bg-delete text-delete' : _b, onClick = _a.onClick;
    return (_jsx("div", __assign({ className: 'relative min-w-button' }, { children: _jsx("div", __assign({ className: "flex flex-col items-center active:shadow-top2px border-2 font-button text-button rounded bg-opacity-0 cursor-pointer ".concat(color), onClick: onClick }, { children: _jsx("div", __assign({ className: 'pt-13px pb-13px pr-4 pl-4 active:pt-14px active:pb-3' }, { children: label })) })) })));
};
export var BackButton = function (_a) {
    var label = _a.label, onClick = _a.onClick;
    return _jsx(IconLabelButton, { icon: BackSvg, label: label, onClick: onClick });
};
export var ForwardButton = function (_a) {
    var label = _a.label, onClick = _a.onClick;
    return _jsx(IconLabelButton, { icon: ForwardSvg, label: label, onClick: onClick, alignment: 'right' });
};
export var BackIconButton = function (_a) {
    var onClick = _a.onClick;
    return _jsx(IconButton, { icon: BackSvg, onClick: onClick });
};
export var ForwardIconButton = function (_a) {
    var onClick = _a.onClick;
    return _jsx(IconButton, { icon: ForwardSvg, onClick: onClick });
};
export var IconButton = function (_a) {
    var icon = _a.icon, onClick = _a.onClick;
    return (_jsx("div", __assign({ className: 'active:pt-5px active:pb-3px focus:outline-none cursor-pointer w-6 h-6', onClick: onClick }, { children: _jsxs("div", __assign({ className: 'flex flex-col items-center h-full w-full' }, { children: [_jsx("div", { className: 'flex-grow' }), _jsx("div", { children: _jsx("img", { className: '-mt-2px', src: icon }) }), _jsx("div", { className: 'flex-grow' })] })) })));
};
export var IconLabelButton = function (_a) {
    var icon = _a.icon, label = _a.label, _b = _a.color, color = _b === void 0 ? 'text-grey1' : _b, _c = _a.alignment, alignment = _c === void 0 ? 'left' : _c, onClick = _a.onClick;
    return (_jsx("div", __assign({ className: 'pt-1 pb-1 active:pt-5px active:pb-3px rounded bg-opacity-0 focus:outline-none cursor-pointer ', onClick: onClick }, { children: _jsxs("div", __assign({ className: 'flex items-center' }, { children: [_jsx("div", __assign({ className: "".concat(alignment === 'left' ? '' : 'hidden') }, { children: _jsx("img", { className: 'mr-2 -mt-2px', src: icon, alt: label }) })), _jsx("div", __assign({ className: 'focus:outline-none' }, { children: _jsx("div", __assign({ className: 'flex flex-col justify-center h-full items-center' }, { children: _jsx("div", __assign({ className: "flex-wrap text-button font-button ".concat(color) }, { children: label })) })) })), _jsx("div", __assign({ className: "".concat(alignment !== 'left' ? '' : 'hidden') }, { children: _jsx("img", { className: 'ml-2 -mt-2px', src: icon, alt: label }) }))] })) })));
};
export var LabelButton = function (_a) {
    var label = _a.label, _b = _a.color, color = _b === void 0 ? 'text-grey1' : _b, onClick = _a.onClick;
    return (_jsx("div", __assign({ className: "pt-15px pb-15px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 cursor-pointer bg-opacity-0 ".concat(color), onClick: onClick }, { children: _jsx("div", __assign({ id: 'confirm-button', className: 'flex-wrap' }, { children: label })) })));
};
