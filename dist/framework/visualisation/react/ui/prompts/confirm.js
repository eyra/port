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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Translator } from '../../../../translator';
import { BodyLarge } from '../elements/text';
import { PrimaryButton } from '../elements/button';
export var Confirm = function (props) {
    var resolve = props.resolve;
    var _a = prepareCopy(props), text = _a.text, ok = _a.ok, cancel = _a.cancel;
    function handleOk() {
        resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadTrue', value: true });
    }
    function handleCancel() {
        resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadFalse', value: false });
    }
    return (_jsxs(_Fragment, { children: [_jsx(BodyLarge, { text: text, margin: 'mb-4' }), _jsxs("div", __assign({ className: 'flex flex-row gap-4' }, { children: [_jsx(PrimaryButton, { label: ok, onClick: handleOk, color: 'text-grey1 bg-tertiary' }), _jsx(PrimaryButton, { label: cancel, onClick: handleCancel, color: 'text-white bg-primary' })] }))] }));
};
function prepareCopy(_a) {
    var text = _a.text, ok = _a.ok, cancel = _a.cancel, locale = _a.locale;
    return {
        text: Translator.translate(text, locale),
        ok: Translator.translate(ok, locale),
        cancel: Translator.translate(cancel, locale)
    };
}
