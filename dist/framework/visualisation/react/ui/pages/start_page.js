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
import { PrimaryButton } from '../elements/button';
import { BodyLarge, Title0 } from '../elements/text';
export var StartPage = function (props) {
    var resolve = props.resolve;
    var _a = prepareCopy(props), title = _a.title, description = _a.description, startButton = _a.startButton;
    function handleStart() {
        resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadVoid', value: undefined });
    }
    return (_jsxs(_Fragment, { children: [_jsx(Title0, { text: title }), _jsx(BodyLarge, { text: description }), _jsx("div", __assign({ className: 'flex flex-row gap-4' }, { children: _jsx(PrimaryButton, { label: startButton, onClick: handleStart }) }))] }));
};
function prepareCopy(_a) {
    var locale = _a.locale;
    return {
        title: Translator.translate(title, locale),
        description: Translator.translate(description, locale),
        startButton: Translator.translate(startButtonLabel, locale)
    };
}
var title = new TextBundle()
    .add('en', 'Instructions')
    .add('nl', 'Instructies');
var startButtonLabel = new TextBundle()
    .add('en', 'Start')
    .add('nl', 'Start');
var description = new TextBundle()
    .add('en', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    .add('nl', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
