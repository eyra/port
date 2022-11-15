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
import { PrimaryButton } from '../elements/button';
import { CheckBox } from '../elements/check_box';
import { BodyLarge, Label, Title1 } from '../elements/text';
import LogoSvg from '../../../../../assets/images/logo.svg';
import { Footer } from './templates/footer';
import { Page } from './templates/page';
import { Sidebar } from './templates/sidebar';
function prepareCopy(_a) {
    var locale = _a.locale;
    return {
        title: Translator.translate(title, locale),
        description: Translator.translate(description, locale),
        continueButton: Translator.translate(continueButton, locale),
        privacyLabel: Translator.translate(privacyLabel, locale)
    };
}
export var SplashScreen = function (props) {
    var _a = React.useState(false), checked = _a[0], setChecked = _a[1];
    var _b = React.useState(false), waiting = _b[0], setWaiting = _b[1];
    var _c = prepareCopy(props), title = _c.title, description = _c.description, continueButton = _c.continueButton, privacyLabel = _c.privacyLabel;
    var resolve = props.resolve;
    function handleContinue() {
        if (checked && !waiting) {
            setWaiting(true);
            resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadVoid', value: undefined });
        }
    }
    function handleCheck() {
        setChecked(true);
    }
    var footer = _jsx(Footer, {});
    var sidebar = _jsx(Sidebar, { logo: LogoSvg });
    var body = (_jsxs(_Fragment, { children: [_jsx(Title1, { text: title }), _jsx(BodyLarge, { text: description }), _jsxs("div", __assign({ className: 'flex flex-col gap-8' }, { children: [_jsxs("div", __assign({ className: 'flex flex-row gap-4 items-center' }, { children: [_jsx(CheckBox, { id: '0', selected: checked, onSelect: function () { return handleCheck(); } }), _jsx(Label, { text: privacyLabel })] })), _jsx("div", __assign({ className: "flex flex-row gap-4 ".concat(checked ? '' : 'opacity-30') }, { children: _jsx(PrimaryButton, { label: continueButton, onClick: handleContinue, enabled: checked, spinning: waiting }) }))] }))] }));
    return (_jsx(Page, { body: body, sidebar: sidebar, footer: footer }));
};
var title = new TextBundle()
    .add('en', 'Welcome')
    .add('nl', 'Welkom');
var description = new TextBundle()
    .add('en', 'This way you can donate your data to the University of Amsterdam. The data we ask you to donate can be used to research… . We explain step by step what is expected of you. No data is saved or sent during these steps. The data is only saved when you are asked whether you want to send the data. Thank you in advance.')
    .add('nl', 'U kunt zo uw gegevens gaan doneren aan de universiteit van Amsterdam. De gegevens die we u vragen te doneren kunnen worden gebruikt om te onderzoeken … . We leggen u stap voor stap uit wat er van u verwacht wordt. Tijdens deze stappen worden geen gegevens opgeslagen of verstuurd. Pas als u de vraag krijgt of u de gegevens wilt versturen, worden de gegevens opgeslagen. Alvast hartelijk dank.');
var continueButton = new TextBundle()
    .add('en', 'Continue')
    .add('nl', 'Ga verder');
var privacyLabel = new TextBundle()
    .add('en', 'I have read and agree to the privacy conditions.')
    .add('nl', 'Ik heb de privacy voorwaarden gelezen en ben hiermee akkoord.');
