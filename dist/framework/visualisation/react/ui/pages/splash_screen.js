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
import { Bullet } from '../elements/bullet';
function prepareCopy(_a) {
    var locale = _a.locale;
    return {
        title: Translator.translate(title, locale),
        continueButton: Translator.translate(continueButton, locale),
        privacyLabel: Translator.translate(privacyLabel, locale)
    };
}
export var SplashScreen = function (props) {
    var _a = React.useState(false), checked = _a[0], setChecked = _a[1];
    var _b = React.useState(false), waiting = _b[0], setWaiting = _b[1];
    var _c = prepareCopy(props), title = _c.title, continueButton = _c.continueButton, privacyLabel = _c.privacyLabel;
    var locale = props.locale, resolve = props.resolve;
    function handleContinue() {
        if (checked && !waiting) {
            setWaiting(true);
            resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadVoid', value: undefined });
        }
    }
    function handleCheck() {
        setChecked(true);
    }
    function renderDescription() {
        if (locale === 'nl')
            return nlDescription;
        return enDescription;
    }
    var enDescription = (_jsxs(_Fragment, { children: [_jsx(BodyLarge, { margin: 'mb-6', text: 'You are about to start the process of donating your data to Amsterdam University. The data that we ask you to donate can be used to research which interests are stored by various social media platforms. We will walk you through this process step by step. By participating in this process:' }), _jsxs("div", __assign({ className: 'flex flex-col gap-3 mb-10' }, { children: [_jsx(Bullet, { children: _jsx(BodyLarge, { margin: '', text: 'I fully and voluntarily approve to donate the data that is presented on the screen for the research described above, after clicking donate.' }) }), _jsx(Bullet, { children: _jsx(BodyLarge, { margin: '', text: 'I understand that my anonymity is fully guaranteed.' }) }), _jsx(Bullet, { children: _jsx(BodyLarge, { margin: '', text: 'I understand that I have the right to withdraw my permission within 7 days.' }) })] }))] }));
    var nlDescription = (_jsxs(_Fragment, { children: [_jsx(BodyLarge, { margin: 'mb-6', text: 'U kunt zo uw gegevens gaan doneren aan de universiteit van Amsterdam. De gegevens die we u vragen te doneren kunnen worden gebruikt om te onderzoeken welke interesses opgeslagen worden door verschillende social media platformen. We leggen u stap voor stap uit wat er van u verwacht wordt. Bij het doorlopen van de data donatie stappen:' }), _jsxs("div", __assign({ className: 'flex flex-col gap-3 mb-10' }, { children: [_jsx(Bullet, { children: _jsx(BodyLarge, { margin: '', text: 'Geef ik volledig en vrijwillig toestemming om als ik op doneer klik, de data die op het scherm getoond wordt te doneren voor het hierboven beschreven onderzoek.' }) }), _jsx(Bullet, { children: _jsx(BodyLarge, { margin: '', text: 'Geef ik aan te weten dat mijn anonimiteit hierbij volledig gegarandeerd is.' }) }), _jsx(Bullet, { children: _jsx(BodyLarge, { margin: '', text: 'Geef ik aan te weten dat ik het recht heb om mijn toestemming binnen 7 dagen in te trekken.' }) })] }))] }));
    var footer = _jsx(Footer, {});
    var sidebar = _jsx(Sidebar, { logo: LogoSvg });
    var body = (_jsxs(_Fragment, { children: [_jsx(Title1, { text: title }), renderDescription(), _jsxs("div", __assign({ className: 'flex flex-col gap-8' }, { children: [_jsxs("div", __assign({ className: 'flex flex-row gap-4 items-center' }, { children: [_jsx(CheckBox, { id: '0', selected: checked, onSelect: function () { return handleCheck(); } }), _jsx(Label, { text: privacyLabel })] })), _jsx("div", __assign({ className: "flex flex-row gap-4 ".concat(checked ? '' : 'opacity-30') }, { children: _jsx(PrimaryButton, { label: continueButton, onClick: handleContinue, enabled: checked, spinning: waiting }) }))] }))] }));
    return (_jsx(Page, { body: body, sidebar: sidebar, footer: footer }));
};
var title = new TextBundle()
    .add('en', 'Welcome')
    .add('nl', 'Welkom');
var continueButton = new TextBundle()
    .add('en', 'Start')
    .add('nl', 'Start');
var privacyLabel = new TextBundle()
    .add('en', 'I have read and agree with the above text.')
    .add('nl', 'Ik heb de bovenstaande tekst gelezen en ben hiermee akkoord.');
