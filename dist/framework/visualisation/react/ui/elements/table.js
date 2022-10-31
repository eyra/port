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
import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import _ from 'lodash';
import React from 'react';
import { PrimaryButton, SecondaryButton } from './button';
import { CheckBox } from './check_box';
import { BodyMedium, Title6 } from './text';
export var Table = function (_a) {
    var _b = _a.readOnly, readOnly = _b === void 0 ? false : _b, id = _a.id, head = _a.head, body = _a.body, onChange = _a.onChange;
    var _c = React.useState([]), selectedRows = _c[0], setSelectedRows = _c[1];
    function renderHeadRow(props) {
        return (_jsxs("tr", { children: [readOnly ? '' : renderHeadCheck(), props.cells.map(function (cell, index) { return renderHeadCell(cell, index); })] }));
    }
    function renderHeadCheck() {
        var selected = selectedRows.length > 0 && selectedRows.length === body.rows.length;
        return (_jsx("td", { children: _jsx(CheckBox, { id: -1, selected: selected, onSelect: function () { return handleSelectHead(); } }) }, 'check-head'));
    }
    function renderHeadCell(props, index) {
        return (_jsx("th", __assign({ className: 'px-2 pt-3 pb-13px text-left' }, { children: _jsx(Title6, { text: props.text, margin: '' }) }), "".concat(index)));
    }
    function renderRows(rows) {
        return rows.map(function (row, index) { return renderRow(row, index); });
    }
    function renderRow(row, rowIndex) {
        return (_jsxs("tr", __assign({ className: 'hover:bg-grey5' }, { children: [readOnly ? '' : renderRowCheck(rowIndex), row.cells.map(function (cell, cellIndex) { return renderRowCell(cell, cellIndex); })] }), "".concat(rowIndex)));
    }
    function renderRowCheck(rowIndex) {
        var selected = selectedRows.includes(rowIndex);
        return (_jsx("td", __assign({ className: 'w-8 min-w-8' }, { children: _jsx(CheckBox, { id: rowIndex, selected: selected, onSelect: function () { return handleSelectRow(rowIndex); } }) }), "check-".concat(rowIndex)));
    }
    function renderRowCell(props, cellIndex) {
        return (_jsx("td", __assign({ className: 'px-2 pt-3 pb-13px' }, { children: _jsx(BodyMedium, { text: props.text, margin: '' }) }), "".concat(cellIndex)));
    }
    function handleSelectHead() {
        var allRowsSelected = selectedRows.length === body.rows.length;
        if (allRowsSelected) {
            setSelectedRows([]);
        }
        else {
            handleSelectAll();
        }
    }
    function handleSelectRow(row) {
        var newSelected = selectedRows.slice(0);
        var index = selectedRows.indexOf(row);
        if (index === -1) {
            newSelected.push(row);
        }
        else {
            newSelected.splice(index, 1);
        }
        setSelectedRows(newSelected);
    }
    function handleSelectAll() {
        var range = _.range(0, body.rows.length);
        setSelectedRows(range);
    }
    function handleDeleteSelected() {
        var currentSelectedRows = selectedRows.slice(0);
        currentSelectedRows.sort(function (n1, n2) { return n2 - n1; });
        var newRows = body.rows.slice(0);
        for (var _i = 0, currentSelectedRows_1 = currentSelectedRows; _i < currentSelectedRows_1.length; _i++) {
            var rowIndex = currentSelectedRows_1[_i];
            newRows.splice(rowIndex, 1);
        }
        setSelectedRows([]);
        onChange({
            __type__: 'PropsUITable',
            id: id,
            head: head,
            body: {
                __type__: 'PropsUITableBody',
                rows: newRows
            }
        });
    }
    return (_jsxs(_Fragment, { children: [_jsxs("div", __assign({ className: "flex flex-row gap-4 ".concat(readOnly ? 'hidden' : 'block') }, { children: [_jsx(PrimaryButton, { label: 'Select all', onClick: handleSelectAll }), _jsx(SecondaryButton, { label: 'Delete selected', onClick: handleDeleteSelected })] })), _jsxs("table", __assign({ className: 'text-grey1 table-auto border-collapse overflow-hidden' }, { children: [_jsx("thead", { children: renderHeadRow(head) }), _jsx("tbody", { children: renderRows(body.rows) })] }))] }));
};
