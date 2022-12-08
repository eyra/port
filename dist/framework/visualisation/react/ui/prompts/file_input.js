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
import * as React from 'react';
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
import { PrimaryButton } from '../elements/button';
import { BodyLarge, BodySmall } from '../elements/text';
export var FileInput = function (props) {
    var _a;
    var _b = React.useState(false), waiting = _b[0], setWaiting = _b[1];
    var _c = React.useState(), selectedFile = _c[0], setSelectedFile = _c[1];
    var input = React.useRef(null);
    var resolve = props.resolve;
    var _d = prepareCopy(props), description = _d.description, note = _d.note, placeholder = _d.placeholder, extensions = _d.extensions, selectButton = _d.selectButton, continueButton = _d.continueButton;
    function handleClick() {
        var _a;
        (_a = input.current) === null || _a === void 0 ? void 0 : _a.click();
    }
    function handleSelect(event) {
        var files = event.target.files;
        if (files != null && files.length > 0) {
            setSelectedFile(files[0]);
        }
        else {
            console.log('[FileInput] Error selecting file: ' + JSON.stringify(files));
        }
    }
    function handleConfirm() {
        if (selectedFile !== undefined && !waiting) {
            setWaiting(true);
            resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadFile', value: selectedFile });
        }
    }
    return (_jsx(_Fragment, { children: _jsxs("div", __assign({ id: 'select-panel' }, { children: [_jsx("div", __assign({ className: 'flex-wrap text-bodylarge font-body text-grey1 text-left' }, { children: description })), _jsx("div", { className: 'mt-8' }), _jsxs("div", __assign({ className: 'p-6 border-grey4 border-2 rounded' }, { children: [_jsx("input", { ref: input, id: 'input', type: 'file', className: 'hidden', accept: extensions, onChange: handleSelect }), _jsxs("div", __assign({ className: 'flex flex-row gap-4 items-center' }, { children: [_jsx(BodyLarge, { text: (_a = selectedFile === null || selectedFile === void 0 ? void 0 : selectedFile.name) !== null && _a !== void 0 ? _a : placeholder, margin: '', color: selectedFile === undefined ? 'text-grey2' : 'textgrey1' }), _jsx("div", { className: 'flex-grow' }), _jsx(PrimaryButton, { onClick: handleClick, label: selectButton, color: 'bg-tertiary text-grey1' })] }))] })), _jsx("div", { className: 'mt-4' }), _jsxs("div", __assign({ className: "".concat(selectedFile === undefined ? 'opacity-30' : 'opacity-100') }, { children: [_jsx(BodySmall, { text: note, margin: '' }), _jsx("div", { className: 'mt-8' }), _jsx("div", __assign({ className: 'flex flex-row gap-4' }, { children: _jsx(PrimaryButton, { label: continueButton, onClick: handleConfirm, enabled: selectedFile !== undefined, spinning: waiting }) }))] }))] })) }));
};
function prepareCopy(_a) {
    var description = _a.description, extensions = _a.extensions, locale = _a.locale;
    return {
        description: Translator.translate(description, locale),
        note: Translator.translate(note(), locale),
        placeholder: Translator.translate(placeholder(), locale),
        extensions: extensions,
        selectButton: Translator.translate(selectButtonLabel(), locale),
        continueButton: Translator.translate(continueButtonLabel(), locale)
    };
}
var continueButtonLabel = function () {
    return new TextBundle()
        .add('en', 'Continue')
        .add('nl', 'Verder');
};
var selectButtonLabel = function () {
    return new TextBundle()
        .add('en', 'Choose file')
        .add('nl', 'Kies bestand');
};
var note = function () {
    return new TextBundle()
        .add('en', 'Note: The process to extract the correct data from the file is done on your own computer. No data is stored or sent yet.')
        .add('nl', 'NB: Het proces om de juiste gegevens uit het bestand te halen gebeurt op uw eigen computer. Er worden nog geen gegevens opgeslagen of verstuurd.');
};
var placeholder = function () {
    return new TextBundle()
        .add('en', 'Choose a file')
        .add('nl', 'Kies een bestand');
};
