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
import { Label, Title1 } from '../elements/text';
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
    var enDescription = (_jsx(_Fragment, { children: _jsxs("div", __assign({ className: 'text-bodylarge font-body text-grey1' }, { children: [_jsx("div", __assign({ className: 'mb-4 text-bodylarge font-body text-grey1' }, { children: "You are about to start the process of donating your data to research institute ASCoR at Amsterdam University. The data that we ask you to donate will be used for academic research to gain insight into how social media platforms work." })), _jsx("div", __assign({ className: 'mb-4 text-bodylarge font-body text-grey1' }, { children: "We will walk you through this process step by step. During this process no data is stored or sent to ASCoR. You can delete rows from the data before donating. Data will only be donated and stored when you click the button \u201CYes, donate\u201D on the page that shows your data." })), _jsxs("div", __assign({ className: 'mb-6 text-bodylarge font-body text-grey1' }, { children: ["By clicking the button \u201C", _jsx("span", __assign({ className: 'font-bodybold' }, { children: "Yes, donate" })), "\u201D:"] })), _jsxs("div", __assign({ className: 'flex flex-col gap-3 mb-6' }, { children: [_jsx(Bullet, { children: _jsx("div", { children: "you fully and voluntarily agree to donate your data for this research." }) }), _jsx(Bullet, { children: _jsx("div", { children: "you are aware that when your data is used for academic publications, or made publicly available in some other form, this will be anonymous." }) }), _jsx(Bullet, { children: _jsx("div", { children: "you are aware that you have the right to withdraw your permission within 7 days by contacting Panel Inzicht." }) })] })), _jsx("div", __assign({ className: 'mb-10' }, { children: "This website keeps track of your activity - for example on which pages of this website you click - as part of this research. More information can be found on our privacy page." }))] })) }));
    var nlDescription = (_jsx(_Fragment, { children: _jsxs("div", __assign({ className: 'text-bodylarge font-body text-grey1' }, { children: [_jsx("div", __assign({ className: 'mb-4' }, { children: "U kunt zo uw gegevens gaan doneren voor een onderzoek van onderzoeksinstituut ASCoR aan de Universiteit van Amsterdam. De gegevens die we u vragen te doneren worden gebruikt voor wetenschappelijke onderzoek om inzicht te krijgen in de werkwijze van sociale media." })), _jsx("div", __assign({ className: 'mb-4' }, { children: "We leggen u stap voor stap wat er van u verwacht wordt. Tijdens deze stappen worden geen gegevens opgeslagen of naar ASCoR verstuurd. U kunt zelf rijen uit uw data verwijderen die u niet wilt doneren. Pas als u de vraag krijgt of u de gegevens wilt doneren en u op de knop \u201CJa, doneer\u201D klikt, worden de gegevens gedoneerd en opgeslagen." })), _jsxs("div", __assign({ className: 'mb-4' }, { children: ["Door op de knop \u201C", _jsx("span", __assign({ className: 'font-bodybold' }, { children: "Ja, doneer" })), "\u201D te klikken:"] })), _jsxs("div", __assign({ className: 'flex flex-col gap-3 mb-6' }, { children: [_jsx(Bullet, { children: _jsx("div", { children: "Geeft u volledig en vrijwillig toestemming om uw data te doneren voor dit onderzoek.'" }) }), _jsx(Bullet, { children: _jsx("div", { children: "Geeft u aan te weten dat als uw gegevens worden gebruikt in wetenschappelijke publicaties, of deze op een andere manier openbaar worden gemaakt, dit dan anoniem gebeurt." }) }), _jsx(Bullet, { children: _jsx("div", { children: "Geeft u aan te weten dat u het recht hebt om uw toestemming binnen 7 dagen in te trekken door contact met Panel Inzicht op te nemen." }) })] })), _jsx("div", __assign({ className: 'mb-10' }, { children: "Deze website houdt ook uw activiteiten bij \u2013 bijvoorbeeld op welke pagina\u2019s van deze website u klikt \u2013 als deel van dit onderzoek. U kunt meer informatie op onze privacy pagina vinden." }))] })) }));
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
    .add('en', 'I have read and agree with the above terms.')
    .add('nl', 'Ik heb deze voorwaarden gelezen en ben hiermee akkoord.');
