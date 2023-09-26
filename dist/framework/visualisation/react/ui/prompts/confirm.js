import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Translator } from '../../../../translator';
import { BodyLarge } from '../elements/text';
import { PrimaryButton } from '../elements/button';
export const Confirm = (props) => {
    const { resolve } = props;
    const { text, ok, cancel } = prepareCopy(props);
    function handleOk() {
        resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadTrue', value: true });
    }
    function handleCancel() {
        resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadFalse', value: false });
    }
    return (_jsxs(_Fragment, { children: [_jsx(BodyLarge, { text: text, margin: 'mb-4' }), _jsxs("div", Object.assign({ className: 'flex flex-row gap-4' }, { children: [ok !== '' && _jsx(PrimaryButton, { label: ok, onClick: handleOk, color: 'text-grey1 bg-tertiary' }), cancel !== '' && _jsx(PrimaryButton, { label: cancel, onClick: handleCancel, color: 'text-white bg-primary' })] }))] }));
};
function prepareCopy({ text, ok, cancel, locale }) {
    return {
        text: Translator.translate(text, locale),
        ok: Translator.translate(ok, locale),
        cancel: Translator.translate(cancel, locale)
    };
}
