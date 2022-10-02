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
import Translatable from '../../../translatable';
import { Table } from './table';
import { PrimaryButton, SecondaryButton } from './button';
import { Title2 } from './text';
function prepareCopy(_a) {
    var locale = _a.locale;
    return {
        donateButton: donateButtonLabel().text(locale),
        declineButton: declineButtonLabel().text(locale)
    };
}
var donateButtonLabel = function () {
    return new Translatable()
        .add('en', 'Yes, donate')
        .add('nl', 'Ja, doneer');
};
var declineButtonLabel = function () {
    return new Translatable()
        .add('en', 'No')
        .add('nl', 'Nee');
};
export var EndOfFlowFactory = function (props) { return _jsx(EndOfFlow, __assign({}, props)); };
export var EndOfFlow = function (props) {
    var title = props.title, data = props.data, resolve = props.resolve;
    var _a = prepareCopy(props), donateButton = _a.donateButton, declineButton = _a.declineButton;
    function handleDonate() {
        resolve(JSON.stringify(data));
    }
    function handleDecline() {
        resolve(false);
    }
    function renderTable(table) {
        var id = table.id;
        var dataFrame = JSON.parse(table.data_frame);
        var rowCount = Object.keys(dataFrame).length;
        var header = { cells: Object.keys(dataFrame) };
        var rows = [];
        var _loop_1 = function (i) {
            var cells = Object.keys(dataFrame).map(function (column) { return dataFrame[column]["".concat(i)]; });
            rows.push({ cells: cells });
        };
        for (var i = 0; i <= rowCount; i++) {
            _loop_1(i);
        }
        var body = { rows: rows };
        return (_jsx(Table, { id: id, header: header, body: body }, id));
    }
    var tables = data.map(function (table) { return renderTable(table); });
    return (_jsxs(_Fragment, { children: [_jsx(Title2, { text: title }), _jsxs("div", __assign({ className: 'flex flex-col gap-4' }, { children: [_jsx("div", __assign({ className: 'mb-4' }, { children: tables })), _jsxs("div", __assign({ className: 'flex flex-row gap-4' }, { children: [_jsx(PrimaryButton, { label: donateButton, onClick: handleDonate }), _jsx(SecondaryButton, { label: declineButton, onClick: handleDecline })] }))] }))] }));
};
