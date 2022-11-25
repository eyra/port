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
import { assert } from '../../../../helpers';
import { Table } from '../elements/table';
import { LabelButton, PrimaryButton } from '../elements/button';
import { BodyLarge, Title4 } from '../elements/text';
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
import React from 'react';
import _ from 'lodash';
export var ConsentForm = function (props) {
    var tablesIn = React.useRef(parseTables(props.tables));
    var metaTables = React.useRef(parseTables(props.metaTables));
    var tablesOut = React.useRef(tablesIn.current);
    var locale = props.locale, resolve = props.resolve;
    var _a = prepareCopy(props), description = _a.description, donateQuestion = _a.donateQuestion, donateButton = _a.donateButton, cancelButton = _a.cancelButton;
    function rowCell(dataFrame, column, row) {
        var text = String(dataFrame[column]["".concat(row)]);
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
            return Object.keys(firstColumn).length - 1;
        }
    }
    function rows(data) {
        var result = [];
        var _loop_1 = function (row) {
            var id = "".concat(row);
            var cells = columnNames(data).map(function (column) { return rowCell(data, column, row); });
            result.push({ __type__: 'PropsUITableRow', id: id, cells: cells });
        };
        for (var row = 0; row <= rowCount(data); row++) {
            _loop_1(row);
        }
        return result;
    }
    function parseTables(tablesData) {
        console.log('parseTables');
        return tablesData.map(function (table) { return parseTable(table); });
    }
    function parseTable(tableData) {
        var id = tableData.id;
        var title = Translator.translate(tableData.title, props.locale);
        var deletedRowCount = 0;
        var dataFrame = JSON.parse(tableData.data_frame);
        var headCells = columnNames(dataFrame).map(function (column) { return headCell(dataFrame, column); });
        var head = { __type__: 'PropsUITableHead', cells: headCells };
        var body = { __type__: 'PropsUITableBody', rows: rows(dataFrame) };
        return { __type__: 'PropsUITable', id: id, head: head, body: body, title: title, deletedRowCount: deletedRowCount };
    }
    function renderTable(table, readOnly) {
        if (readOnly === void 0) { readOnly = false; }
        return (_jsxs("div", __assign({ className: 'flex flex-col gap-4 mb-4' }, { children: [_jsx(Title4, { text: table.title, margin: '' }), _jsx(Table, __assign({}, table, { readOnly: readOnly, locale: locale, onChange: handleTableChange }))] }), table.id));
    }
    function handleTableChange(id, rows) {
        var tablesCopy = tablesOut.current.slice(0);
        var index = tablesCopy.findIndex(function (table) { return table.id === id; });
        if (index > -1) {
            var _a = tablesCopy[index], title = _a.title, head = _a.head, oldBody = _a.body, oldDeletedRowCount = _a.deletedRowCount;
            var body = { __type__: 'PropsUITableBody', rows: rows };
            var deletedRowCount = oldDeletedRowCount + (oldBody.rows.length - rows.length);
            tablesCopy[index] = { __type__: 'PropsUITable', id: id, head: head, body: body, title: title, deletedRowCount: deletedRowCount };
        }
        tablesOut.current = tablesCopy;
    }
    function handleDonate() {
        var value = serializeConsentData();
        resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadJSON', value: value });
    }
    function handleCancel() {
        resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadFalse', value: false });
    }
    function serializeConsentData() {
        var array = serializeTables().concat(serializeMetaData());
        return JSON.stringify(array);
    }
    function serializeMetaData() {
        return serializeMetaTables().concat(serializeDeletedMetaData());
    }
    function serializeTables() {
        return tablesOut.current.map(function (table) { return serializeTable(table); });
    }
    function serializeMetaTables() {
        return metaTables.current.map(function (table) { return serializeTable(table); });
    }
    function serializeDeletedMetaData() {
        var rawData = tablesOut.current
            .filter(function (_a) {
            var deletedRowCount = _a.deletedRowCount;
            return deletedRowCount > 0;
        })
            .map(function (_a) {
            var id = _a.id, deletedRowCount = _a.deletedRowCount;
            return "User deleted ".concat(deletedRowCount, " rows from table: ").concat(id);
        });
        var data = JSON.stringify(rawData);
        return { user_omissions: data };
    }
    function serializeTable(_a) {
        var _b;
        var id = _a.id, head = _a.head, rows = _a.body.rows;
        var data = rows.map(function (row) { return serializeRow(row, head); });
        return _b = {}, _b[id] = data, _b;
    }
    function serializeRow(row, head) {
        assert(row.cells.length === head.cells.length, "Number of cells in row (".concat(row.cells.length, ") should be equals to number of cells in head (").concat(head.cells.length, ")"));
        var keys = head.cells.map(function (cell) { return cell.text; });
        var values = row.cells.map(function (cell) { return cell.text; });
        return _.fromPairs(_.zip(keys, values));
    }
    return (_jsxs(_Fragment, { children: [_jsx(BodyLarge, { text: description }), _jsxs("div", __assign({ className: 'flex flex-col gap-8' }, { children: [tablesIn.current.map(function (table) { return renderTable(table); }), _jsxs("div", { children: [_jsx(BodyLarge, { margin: '', text: donateQuestion }), _jsxs("div", __assign({ className: 'flex flex-row gap-4 mt-4 mb-4' }, { children: [_jsx(PrimaryButton, { label: donateButton, onClick: handleDonate, color: 'bg-success text-white' }), _jsx(LabelButton, { label: cancelButton, onClick: handleCancel, color: 'text-grey1' })] }))] })] }))] }));
};
function prepareCopy(_a) {
    var locale = _a.locale;
    return {
        description: Translator.translate(description, locale),
        donateQuestion: Translator.translate(donateQuestionLabel, locale),
        donateButton: Translator.translate(donateButtonLabel, locale),
        cancelButton: Translator.translate(cancelButtonLabel, locale)
    };
}
var donateQuestionLabel = new TextBundle()
    .add('en', 'Do you want to donate the above data?')
    .add('nl', 'Wilt u de bovenstaande gegevens doneren?');
var donateButtonLabel = new TextBundle()
    .add('en', 'Yes, donate')
    .add('nl', 'Ja, doneer');
var cancelButtonLabel = new TextBundle()
    .add('en', 'No')
    .add('nl', 'Nee');
var description = new TextBundle()
    .add('en', 'Determine whether you would like to donate the data below. Carefully check the data and adjust when required. With your donation you contribute to the previously described research. Thank you in advance.')
    .add('nl', 'Bepaal of u de onderstaande gegevens wilt doneren. Bekijk de gegevens zorgvuldig en pas zo nodig aan. Met uw donatie draagt u bij aan het eerder beschreven onderzoek. Alvast hartelijk dank.');
