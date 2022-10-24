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
import { Table } from '../elements/table';
import { PrimaryButton, SecondaryButton } from '../elements/button';
import { BodyLarge, Title1, Title2 } from '../elements/text';
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
export var ConsentForm = function (props) {
    var tables = props.tables, resolve = props.resolve;
    var _a = prepareCopy(props), title = _a.title, description = _a.description, donateButton = _a.donateButton, declineButton = _a.declineButton;
    function handleDonate() {
        resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadString', value: JSON.stringify(tables) });
    }
    function handleDecline() {
        resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadFalse', value: false });
    }
    function rowCell(dataFrame, column, row) {
        var text = dataFrame[column]["".concat(row)];
        return { __type__: 'PropsUITableCell', text: text };
    }
    function headCell(dataFrame, column) {
        return { __type__: 'PropsUITableCell', text: column };
    }
    function columnNames(dataFrame) {
        return Object.keys(dataFrame);
    }
    function columnCount(dataFrame) {
        return columnNames(dataFrame).length;
    }
    function rowCount(dataFrame) {
        if (columnCount(dataFrame) === 0) {
            return 0;
        }
        else {
            var firstColumn = dataFrame[columnNames(dataFrame)[0]];
            return Object.keys(firstColumn).length;
        }
    }
    function rows(data) {
        var result = [];
        var _loop_1 = function (row) {
            var cells = columnNames(data).map(function (column) { return rowCell(data, column, row); });
            result.push({ __type__: 'PropsUITableRow', cells: cells });
        };
        for (var row = 0; row <= rowCount(data); row++) {
            _loop_1(row);
        }
        return result;
    }
    function parse(tableData) {
        var id = tableData.id;
        var dataFrame = JSON.parse(tableData.data_frame);
        var head = { cells: columnNames(dataFrame).map(function (column) { return headCell(dataFrame, column); }) };
        var body = { rows: rows(dataFrame) };
        return { __type__: 'PropsUITable', id: id, head: head, body: body };
    }
    function renderTable(tableData) {
        var title = tableData.title;
        var tableProps = parse(tableData);
        return (_jsxs("div", __assign({ className: 'flex flex-col gap-2' }, { children: [_jsx(Title2, { text: title }), _jsx(Table, __assign({}, tableProps))] }), tableProps.id));
    }
    return (_jsxs(_Fragment, { children: [_jsx(Title1, { text: title }), _jsx(BodyLarge, { text: description }), _jsxs("div", __assign({ className: 'flex flex-col gap-8' }, { children: [tables.map(function (table) { return renderTable(table); }), _jsxs("div", __assign({ className: 'flex flex-row gap-4 mt-2' }, { children: [_jsx(PrimaryButton, { label: donateButton, onClick: handleDonate }), _jsx(SecondaryButton, { label: declineButton, onClick: handleDecline })] }))] }))] }));
};
function prepareCopy(_a) {
    var title = _a.title, description = _a.description, locale = _a.locale;
    return {
        title: Translator.translate(title, locale),
        description: Translator.translate(description, locale),
        donateButton: Translator.translate(donateButtonLabel(), locale),
        declineButton: Translator.translate(declineButtonLabel(), locale)
    };
}
var donateButtonLabel = function () {
    return new TextBundle()
        .add('en', 'Yes, donate')
        .add('nl', 'Ja, doneer');
};
var declineButtonLabel = function () {
    return new TextBundle()
        .add('en', 'No')
        .add('nl', 'Nee');
};
