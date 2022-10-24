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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
import { Spinner } from '../elements/spinner';
import { BodyLarge, Title0 } from '../elements/text';
function prepareCopy(_a) {
    var locale = _a.locale;
    return {
        title: Translator.translate(title, locale),
        description: Translator.translate(description, locale)
    };
}
export var SplashScreen = function (props) {
    var _a = prepareCopy(props), title = _a.title, description = _a.description;
    return (_jsxs(_Fragment, { children: [_jsx(Title0, { text: title }), _jsx(BodyLarge, { text: description }), _jsx(Spinner, __assign({ text: spinnerText }, props))] }));
};
var title = new TextBundle()
    .add('en', 'Welcome')
    .add('nl', 'Welkom');
var description = new TextBundle()
    .add('en', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    .add('nl', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
var spinnerText = new TextBundle()
    .add('en', 'One moment please..')
    .add('nl', 'Een moment geduld..');
