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
import Lottie from 'lottie-react';
import spinnerLight from '../../../../../assets/lottie/spinner-light.json';
import spinnerDark from '../../../../../assets/lottie/spinner-dark.json';
export var Spinner = function (_a) {
    var _b = _a.spinning, spinning = _b === void 0 ? true : _b, _c = _a.color, color = _c === void 0 ? 'light' : _c;
    function animationData() {
        if (color === 'dark') {
            return spinnerDark;
        }
        return spinnerLight;
    }
    return (_jsx("div", __assign({ id: 'spinner', className: 'flex flex-row items-center gap-4' }, { children: _jsx("div", __assign({ className: 'w-5 h-5' }, { children: _jsx(Lottie, { animationData: animationData(), loop: spinning }) })) })));
};
