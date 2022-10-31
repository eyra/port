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
import { RadioItem } from '../elements/radio_item';
function prepareCopy(_a) {
    var title = _a.title, description = _a.description, locale = _a.locale;
    return {
        title: Translator.translate(title, locale),
        description: Translator.translate(description, locale),
        continueButton: Translator.translate(continueButtonLabel(), locale)
    };
}
export var RadioInput = function (props) {
    var _a = React.useState(-1), selectedId = _a[0], setSelectedId = _a[1];
    var _b = React.useState(true), confirmHidden = _b[0], setConfirmHidden = _b[1];
    var items = props.items, resolve = props.resolve;
    var _c = prepareCopy(props), title = _c.title, description = _c.description, continueButton = _c.continueButton;
    function handleSelect(id) {
        setSelectedId(id);
        setConfirmHidden(false);
    }
    function handleConfirm() {
        var item = items.at(selectedId);
        if (item !== undefined) {
            resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadString', value: item.value });
        }
    }
    function renderItems(items) {
        return items.map(function (item, index) { return _jsx(RadioItem, { onSelect: function () { return handleSelect(index); }, id: index, value: item.value, selected: selectedId === index }, index); });
    }
    return (_jsxs(_Fragment, { children: [_jsx("div", __assign({ className: 'text-title5 font-title5 sm:text-title4 sm:font-title4 lg:text-title3 lg:font-title3 text-grey1' }, { children: title })), _jsx("div", { className: 'mt-8' }), _jsxs("div", __assign({ id: 'select-panel' }, { children: [_jsx("div", __assign({ className: 'flex-wrap text-bodylarge font-body text-grey1 text-left' }, { children: description })), _jsx("div", { className: 'mt-4' }), _jsx("div", { children: _jsx("div", __assign({ id: 'radio-group', className: 'flex flex-col gap-3' }, { children: renderItems(items) })) })] })), _jsx("div", { className: 'mt-8' }), _jsx("div", __assign({ className: "flex flex-row ".concat(confirmHidden ? 'hidden' : '') }, { children: _jsx("div", __assign({ className: 'pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 bg-primary text-white cursor-pointer', onClick: handleConfirm }, { children: _jsx("div", __assign({ id: 'confirm-button', className: 'flex-wrap' }, { children: continueButton })) })) }))] }));
};
var continueButtonLabel = function () {
    return new TextBundle()
        .add('en', 'Continue')
        .add('nl', 'Doorgaan');
};
