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
import React from 'react';
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
import { isPropsUIPromptConfirm, isPropsUIPromptConsentForm, isPropsUIPromptFileInput } from '../../../../types/prompts';
import { ForwardButton } from '../elements/button';
import { Spinner } from '../elements/spinner';
import { Title0 } from '../elements/text';
import { Confirm } from '../prompts/confirm';
import { ConsentForm } from '../prompts/consent_form';
import { FileInput } from '../prompts/file_input';
export var DonationPage = function (props) {
    var spinnerHidden = React.useState(true)[0];
    var _a = prepareCopy(props), title = _a.title, forwardButton = _a.forwardButton;
    var resolve = props.resolve;
    function renderBody(props) {
        var context = { locale: props.locale, resolve: props.resolve };
        var body = props.body;
        if (isPropsUIPromptFileInput(body)) {
            return _jsx(FileInput, __assign({}, body, context));
        }
        if (isPropsUIPromptConfirm(body)) {
            return _jsx(Confirm, __assign({}, body, context));
        }
        if (isPropsUIPromptConsentForm(body)) {
            return _jsx(ConsentForm, __assign({}, body, context));
        }
        throw new TypeError('Unknown body type');
    }
    function handleSkip() {
        resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadFalse', value: false });
    }
    return (_jsxs(_Fragment, { children: [_jsx(Title0, { text: title }), renderBody(props), _jsx("div", __assign({ className: spinnerHidden ? 'hidden' : '' }, { children: _jsx(Spinner, __assign({}, props.spinner, { locale: props.locale })) })), _jsx("div", { className: 'mb-10' }), _jsxs("div", __assign({ className: 'flex flex-row gap-4 items-center w-full' }, { children: [_jsx("div", { className: 'flex-grow' }), _jsx(ForwardButton, { label: forwardButton, onClick: handleSkip })] }))] }));
};
function prepareCopy(_a) {
    var title = _a.header.title, locale = _a.locale;
    return {
        title: Translator.translate(title, locale),
        forwardButton: Translator.translate(forwardButtonLabel(), locale)
    };
}
var forwardButtonLabel = function () {
    return new TextBundle()
        .add('en', 'Skip this step')
        .add('nl', 'Sla deze stap over');
};
