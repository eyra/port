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
export var BodyLarge = function (_a) {
    var text = _a.text, _b = _a.color, color = _b === void 0 ? 'text-grey1' : _b, _c = _a.margin, margin = _c === void 0 ? 'mb-6 md:mb-8 lg:mb-10' : _c;
    return (_jsx("div", __assign({ className: "text-bodylarge font-body ".concat(color, " ").concat(margin) }, { children: text })));
};
export var BodyMedium = function (_a) {
    var text = _a.text, _b = _a.color, color = _b === void 0 ? 'text-grey1' : _b, _c = _a.margin, margin = _c === void 0 ? 'mb-6 md:mb-8 lg:mb-10' : _c;
    return (_jsx("div", __assign({ className: "text-bodymedium font-body ".concat(color, " ").concat(margin) }, { children: text })));
};
export var BodySmall = function (_a) {
    var text = _a.text, _b = _a.color, color = _b === void 0 ? 'text-grey1' : _b, _c = _a.margin, margin = _c === void 0 ? '' : _c;
    return (_jsx("div", __assign({ className: "text-bodysmall font-body ".concat(color, " ").concat(margin) }, { children: text })));
};
export var Title0 = function (_a) {
    var text = _a.text, _b = _a.color, color = _b === void 0 ? 'text-grey1' : _b, _c = _a.margin, margin = _c === void 0 ? 'mb-6 md:mb-8 lg:mb-10' : _c;
    return (_jsx("div", __assign({ className: "text-title4 font-title4 sm:text-title2 sm:font-title2 lg:text-title0 lg:font-title0 ".concat(color, " ").concat(margin) }, { children: text })));
};
export var Title1 = function (_a) {
    var text = _a.text, _b = _a.color, color = _b === void 0 ? 'text-grey1' : _b, _c = _a.margin, margin = _c === void 0 ? 'mb-6 md:mb-8' : _c;
    return (_jsx("div", __assign({ className: "text-title3 font-title3 sm:text-title2 lg:text-title1 lg:font-title1 ".concat(color, " ").concat(margin) }, { children: text })));
};
export var Title2 = function (_a) {
    var text = _a.text, _b = _a.color, color = _b === void 0 ? 'text-grey1' : _b, _c = _a.margin, margin = _c === void 0 ? 'mb-6 md:mb-8 lg:mb-10' : _c;
    return (_jsx("div", __assign({ className: "text-title4 font-title4 sm:text-title3 sm:font-title3 lg:text-title2 lg:font-title2 ".concat(color, " ").concat(margin) }, { children: text })));
};
export var Title3 = function (_a) {
    var text = _a.text, _b = _a.color, color = _b === void 0 ? 'text-grey1' : _b, _c = _a.margin, margin = _c === void 0 ? 'mb-3 md:mb-5 lg:mb-6' : _c;
    return (_jsx("div", __assign({ className: "text-title5 font-title5 sm:text-title4 sm:font-title4 lg:text-title3 lg:font-title3 ".concat(color, " ").concat(margin) }, { children: text })));
};
export var Title4 = function (_a) {
    var text = _a.text, _b = _a.color, color = _b === void 0 ? 'text-grey1' : _b, _c = _a.margin, margin = _c === void 0 ? 'mb-3 md:mb-5 lg:mb-6' : _c;
    return (_jsx("div", __assign({ className: "text-title6 font-title6 sm:text-title5 sm:font-title5 lg:text-title4 lg:font-title4 ".concat(color, " ").concat(margin) }, { children: text })));
};
export var Title6 = function (_a) {
    var text = _a.text, _b = _a.color, color = _b === void 0 ? 'text-grey1' : _b, _c = _a.margin, margin = _c === void 0 ? 'mb-2' : _c;
    return (_jsx("div", __assign({ className: "text-title6 font-title6 ".concat(margin, " ").concat(color) }, { children: text })));
};
export var Label = function (_a) {
    var text = _a.text, _b = _a.color, color = _b === void 0 ? 'text-grey1' : _b, _c = _a.margin, margin = _c === void 0 ? '' : _c;
    return (_jsx("div", __assign({ className: "text-label font-label ".concat(color, " ").concat(margin) }, { children: text })));
};
export var Caption = function (_a) {
    var text = _a.text, _b = _a.color, color = _b === void 0 ? 'text-grey1' : _b, _c = _a.margin, margin = _c === void 0 ? '' : _c;
    return (_jsx("div", __assign({ className: "text-caption font-caption ".concat(color, " ").concat(margin) }, { children: text })));
};
