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
import SpinnerSvg from '../../../../../assets/images/spinner.svg';
import { Translator } from '../../../../translator';
function prepareCopy(_a) {
    var text = _a.text, locale = _a.locale;
    return {
        text: Translator.translate(text, locale)
    };
}
export var Spinner = function (props) {
    var text = prepareCopy(props).text;
    return (_jsxs("div", __assign({ id: 'spinner', className: 'flex flex-row items-center gap-4' }, { children: [_jsx("div", __assign({ className: 'font-body text-bodymedium text-grey1' }, { children: text })), _jsx("div", __assign({ className: 'w-10 h-10' }, { children: _jsx("img", { src: SpinnerSvg }) }))] })));
};
