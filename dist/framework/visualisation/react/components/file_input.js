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
import Translatable from '../../../translatable';
function prepareCopy(_a) {
    var title = _a.title, description = _a.description, extensions = _a.extensions, locale = _a.locale;
    return {
        title: title.en,
        description: description.en,
        extensions: extensions,
        selectButton: selectButtonLabel().text(locale),
        continueButton: continueButtonLabel().text(locale),
        resetButton: resetButtonLabel().text(locale)
    };
}
export var FileInputFactory = function (props) { return _jsx(FileInput, __assign({}, props)); };
var FileInput = function (props) {
    var _a = React.useState(), selectedFile = _a[0], setSelectedFile = _a[1];
    var _b = React.useState(true), confirmHidden = _b[0], setConfirmHidden = _b[1];
    var input = React.useRef(null);
    var resolve = props.resolve;
    var _c = prepareCopy(props), title = _c.title, description = _c.description, extensions = _c.extensions, selectButton = _c.selectButton, continueButton = _c.continueButton, resetButton = _c.resetButton;
    function handleClick() {
        var _a;
        (_a = input.current) === null || _a === void 0 ? void 0 : _a.click();
    }
    function handleReset() {
        handleClick();
    }
    function handleSelect(event) {
        var files = event.target.files;
        if (files != null && files.length > 0) {
            setSelectedFile(files[0]);
            setConfirmHidden(false);
        }
    }
    function handleConfirm() {
        resolve(selectedFile);
    }
    return (_jsxs(_Fragment, { children: [_jsx("div", __assign({ className: 'text-title5 font-title5 sm:text-title4 sm:font-title4 lg:text-title3 lg:font-title3 text-grey1' }, { children: title })), _jsx("div", { className: 'mt-8' }), _jsxs("div", __assign({ id: 'select-panel' }, { children: [_jsx("div", __assign({ className: 'flex-wrap text-bodylarge font-body text-grey1 text-left' }, { children: description })), _jsx("div", { className: 'mt-8' }), _jsx("div", __assign({ className: 'flex flex-row' }, { children: _jsx("div", __assign({ className: 'flex-wrap cursor-pointer' }, { children: _jsx("div", __assign({ id: 'select-button', className: 'pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 bg-primary text-white', onClick: handleClick }, { children: selectButton })) })) })), _jsx("input", { ref: input, id: 'input', type: 'file', className: 'hidden', accept: extensions, onChange: handleSelect }), _jsx("div", { className: 'mt-8' })] })), _jsxs("div", __assign({ id: 'confirm-panel', className: confirmHidden ? 'hidden' : '' }, { children: [_jsx("div", __assign({ className: 'flex flex-row' }, { children: _jsx("div", __assign({ className: 'flex-wrap bg-grey5 rounded' }, { children: _jsx("div", __assign({ className: 'flex flex-row h-14 px-5 items-center' }, { children: _jsx("div", __assign({ id: 'selected-filename', className: 'flex-wrap text-subhead font-subhead text-grey1' }, { children: selectedFile === null || selectedFile === void 0 ? void 0 : selectedFile.name })) })) })) })), _jsx("div", { className: 'mt-8' }), _jsx("div", __assign({ className: 'text-bodylarge font-body text-grey1 text-left' }, { children: "Continue with the selected file, or select again?" })), _jsx("div", { className: 'mt-4' }), _jsxs("div", __assign({ className: 'flex flex-row gap-4' }, { children: [_jsx("div", __assign({ id: 'confirm-button', className: 'flex-wrap cursor-pointer' }, { children: _jsx("div", __assign({ className: 'pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 bg-primary text-white', onClick: handleConfirm }, { children: continueButton })) })), _jsx("div", __assign({ id: 'reset-button', className: 'flex-wrap cursor-pointer' }, { children: _jsx("div", __assign({ className: 'pt-13px pb-13px active:pt-14px active:pb-3 active:shadow-top2px border-2 font-button text-button rounded bg-opacity-0 pr-4 pl-4 bg-delete text-delete', onClick: handleReset }, { children: resetButton })) }))] }))] }))] }));
};
var continueButtonLabel = function () {
    return new Translatable()
        .add('en', 'Continue')
        .add('nl', 'Doorgaan');
};
var selectButtonLabel = function () {
    return new Translatable()
        .add('en', 'Select file')
        .add('nl', 'Selecteer bestand');
};
var resetButtonLabel = function () {
    return new Translatable()
        .add('en', 'Select again')
        .add('nl', 'Opnieuw');
};
