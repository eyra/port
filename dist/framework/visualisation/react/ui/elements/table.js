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
import { BackButton, ForwardButton, PrimaryButton, SecondaryButton } from './button';
import { CheckBox } from './check_box';
import { BodyLarge, BodyMedium, Title6 } from './text';
export var Table = function (_a) {
    var id = _a.id, head = _a.head, body = _a.body, _b = _a.readOnly, readOnly = _b === void 0 ? false : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 7 : _c, onChange = _a.onChange;
    var _d = React.useState(false), editMode = _d[0], setEditMode = _d[1];
    var _e = React.useState(body.rows), rows = _e[0], setRows = _e[1];
    var _f = React.useState(createPages(rows)), pages = _f[0], setPages = _f[1];
    var _g = React.useState(pages[0]), currentPage = _g[0], setCurrentPage = _g[1];
    var _h = React.useState([]), selectedRows = _h[0], setSelectedRows = _h[1];
    function createPages(rows) {
        if (rows.length === 0) {
            return [{ index: 0, rows: rows }];
        }
        return _
            .range(0, Math.ceil(rows.length / pageSize))
            .map(function (index) { return { index: index, rows: createPage(index, rows) }; });
    }
    function createPage(page, rows) {
        var offset = page * pageSize;
        return rows.slice(offset, offset + pageSize);
    }
    function renderHeadRow(props) {
        return (_jsxs("tr", { children: [editMode ? renderHeadCheck() : '', props.cells.map(function (cell, index) { return renderHeadCell(cell, index); })] }));
    }
    function renderHeadCheck() {
        var selected = selectedRows.length > 0 && selectedRows.length === currentPage.rows.length;
        return (_jsx("td", { children: _jsx(CheckBox, { id: -1, selected: selected, onSelect: function () { return handleSelectHead(); } }) }, 'check-head'));
    }
    function renderHeadCell(props, index) {
        return (_jsx("th", __assign({ className: 'px-2 pt-3 pb-13px text-left' }, { children: _jsx(Title6, { text: props.text, margin: '' }) }), "".concat(index)));
    }
    function renderRows(rows) {
        return rows.map(function (row, index) { return renderRow(row, index); });
    }
    function renderRow(row, rowIndex) {
        return (_jsxs("tr", __assign({ className: 'hover:bg-grey5' }, { children: [editMode ? renderRowCheck(rowIndex) : '', row.cells.map(function (cell, cellIndex) { return renderRowCell(cell, cellIndex); })] }), "".concat(rowIndex)));
    }
    function renderRowCheck(rowIndex) {
        var selected = selectedRows.includes(rowIndex);
        return (_jsx("td", __assign({ className: 'w-8 min-w-8' }, { children: _jsx(CheckBox, { id: rowIndex, selected: selected, onSelect: function () { return handleSelectRow(rowIndex); } }) }), "check-".concat(rowIndex)));
    }
    function renderRowCell(props, cellIndex) {
        return (_jsx("td", __assign({ className: 'px-2 pt-3 pb-13px' }, { children: _jsx(BodyMedium, { text: props.text, margin: '' }) }), "".concat(cellIndex)));
    }
    function handleSelectHead() {
        var allRowsSelected = selectedRows.length === currentPage.rows.length;
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
        var range = _.range(0, currentPage.rows.length);
        setSelectedRows(range);
    }
    function handlePrevious() {
        var index = currentPage.index === 0 ? pages.length - 1 : currentPage.index - 1;
        setSelectedRows([]);
        setCurrentPage(pages[index]);
    }
    function handleNext() {
        var index = currentPage.index === pages.length - 1 ? 0 : currentPage.index + 1;
        setSelectedRows([]);
        setCurrentPage(pages[index]);
    }
    function handleDeleteSelected() {
        var currentSelectedRows = selectedRows.slice(0).sort(function (n1, n2) { return n2 - n1; });
        var newRows = rows.slice(0);
        var offset = currentPage.index * pageSize;
        for (var _i = 0, currentSelectedRows_1 = currentSelectedRows; _i < currentSelectedRows_1.length; _i++) {
            var rowIndex = currentSelectedRows_1[_i];
            var start = offset + rowIndex;
            newRows.splice(start, 1);
        }
        var newPages = createPages(newRows);
        var newCurrentPageIndex = Math.min(newPages.length - 1, currentPage.index);
        var newCurrentPage = newPages[newCurrentPageIndex];
        updateRows(newRows);
        setRows(newRows);
        setPages(newPages);
        setCurrentPage(newCurrentPage);
        setSelectedRows([]);
        onChange(id, newRows);
    }
    function updateRows(rows) {
        var newPages = createPages(rows);
        var newCurrentPageIndex = Math.min(newPages.length, currentPage.index);
        var newCurrentPage = newPages[newCurrentPageIndex];
        setRows(rows);
        setPages(newPages);
        setCurrentPage(newCurrentPage);
        setSelectedRows([]);
        onChange(id, rows);
    }
    function handleUndo() {
        updateRows(body.rows);
    }
    return (_jsxs(_Fragment, { children: [_jsxs("div", __assign({ className: "".concat(rows.length === 0 ? 'hidden' : '') }, { children: [_jsxs("div", __assign({ className: "".concat(readOnly ? 'hidden' : '') }, { children: [_jsx("div", __assign({ className: "flex flex-row gap-4 ".concat(!editMode ? '' : 'hidden') }, { children: _jsx(PrimaryButton, { label: 'Edit', onClick: function () { return setEditMode(true); }, color: 'bg-delete text-white' }) })), _jsxs("div", __assign({ className: "flex flex-row gap-4 ".concat(editMode ? '' : 'hidden') }, { children: [_jsx(PrimaryButton, { label: 'Select all', onClick: handleSelectAll }), _jsx(SecondaryButton, { label: 'Delete', onClick: handleDeleteSelected }), _jsx(SecondaryButton, { label: 'Undo', onClick: handleUndo, color: 'text-grey1' })] }))] })), _jsx("div", { className: 'mb-4' }), _jsxs("table", __assign({ className: 'text-grey1 table-auto ' }, { children: [_jsx("thead", { children: renderHeadRow(head) }), _jsx("tbody", { children: renderRows(currentPage.rows) })] })), _jsx("div", { className: 'mb-2' }), _jsxs("div", __assign({ className: "flex flex-row gap-4 ".concat(rows.length <= pageSize ? 'hidden' : '', " ") }, { children: [_jsx(BackButton, { label: 'Previous', onClick: handlePrevious }), _jsxs("div", { children: [currentPage.index + 1, " / ", pages.length] }), _jsx(ForwardButton, { label: 'Next', onClick: handleNext })] }))] })), _jsxs("div", __assign({ className: "flex flex-col gap-4 ".concat(rows.length === 0 ? '' : 'hidden') }, { children: [_jsx("div", __assign({ className: "flex flex-row gap-4 ".concat(body.rows.length > 0 ? '' : 'hidden') }, { children: _jsx(SecondaryButton, { label: 'Undo', onClick: handleUndo, color: 'text-grey1' }) })), _jsx(BodyLarge, { text: 'Table is empty' })] }))] }));
};
