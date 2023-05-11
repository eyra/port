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
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
import { isPropsUIPromptConfirm, isPropsUIPromptConsentForm, isPropsUIPromptFileInput, isPropsUIPromptRadioInput } from '../../../../types/prompts';
import { ForwardButton } from '../elements/button';
import { Title1 } from '../elements/text';
import { Confirm } from '../prompts/confirm';
import { ConsentForm } from '../prompts/consent_form';
import { FileInput } from '../prompts/file_input';
import { RadioInput } from '../prompts/radio_input';
import { Footer } from './templates/footer';
import { Sidebar } from './templates/sidebar';
import LogoSvg from '../../../../../assets/images/logo.svg';
import { Page } from './templates/page';
import { Progress } from '../elements/progress';
import { Instructions } from '../elements/instructions';
export var DonationPage = function (props) {
    var _a = prepareCopy(props), title = _a.title, forwardButton = _a.forwardButton;
    var platform = props.platform, locale = props.locale, resolve = props.resolve;
    function renderBody(props) {
        var context = { locale: locale, resolve: props.resolve };
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
        if (isPropsUIPromptRadioInput(body)) {
            return _jsx(RadioInput, __assign({}, body, context));
        }
        throw new TypeError('Unknown body type');
    }
    function handleSkip() {
        resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadFalse', value: false });
    }
    var footer = (_jsx(Footer, { middle: _jsx(Progress, { percentage: props.footer.progressPercentage }), right: _jsxs("div", __assign({ className: 'flex flex-row' }, { children: [_jsx("div", { className: 'flex-grow' }), _jsx(ForwardButton, { label: forwardButton, onClick: handleSkip })] })) }));
    var sidebar = (_jsx(Sidebar, { logo: LogoSvg, content: _jsx(Instructions, { platform: platform, locale: locale }) }));
    var body = (_jsxs(_Fragment, { children: [_jsx(Title1, { text: title }), renderBody(props)] }));
    return (_jsx(Page, { body: body, sidebar: sidebar, footer: footer }));
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
        .add('en', 'Skip')
        .add('nl', 'Overslaan');
};
