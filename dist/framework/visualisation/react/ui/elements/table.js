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
import { SearchBar } from './search_bar';
import { BodyLarge, BodyMedium, Title6 } from './text';
export var Table = function (_a) {
    var id = _a.id, head = _a.head, body = _a.body, _b = _a.readOnly, readOnly = _b === void 0 ? false : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 7 : _c, onChange = _a.onChange;
    var _d = React.useState(false), editMode = _d[0], setEditMode = _d[1];
    var _e = React.useState([]), query = _e[0], setQuery = _e[1];
    var _f = React.useState(body.rows), alteredRows = _f[0], setAlteredRows = _f[1];
    var _g = React.useState(alteredRows), filteredRows = _g[0], setFilteredRows = _g[1];
    var _h = React.useState(createPages(filteredRows)), pages = _h[0], setPages = _h[1];
    var _j = React.useState(pages[0]), currentPage = _j[0], setCurrentPage = _j[1];
    var _k = React.useState([]), selectedRows = _k[0], setSelectedRows = _k[1];
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
        return (_jsx("td", { children: _jsx(CheckBox, { id: '-1', selected: selected, onSelect: function () { return handleSelectHead(); } }) }, 'check-head'));
    }
    function renderHeadCell(props, index) {
        return (_jsx("th", __assign({ className: 'px-2 pt-3 pb-13px text-left' }, { children: _jsx(Title6, { text: props.text, margin: '' }) }), "".concat(index)));
    }
    function renderRows(rows) {
        return rows.map(function (row, index) { return renderRow(row, index); });
    }
    function renderRow(row, rowIndex) {
        return (_jsxs("tr", __assign({ className: 'hover:bg-grey5' }, { children: [editMode ? renderRowCheck(row.id) : '', row.cells.map(function (cell, cellIndex) { return renderRowCell(cell, cellIndex); })] }), "".concat(rowIndex)));
    }
    function renderRowCheck(rowId) {
        var selected = selectedRows.includes(rowId);
        return (_jsx("td", __assign({ className: 'w-8 min-w-8' }, { children: _jsx(CheckBox, { id: rowId, selected: selected, onSelect: function () { return handleSelectRow(rowId); } }) }), "check-".concat(rowId)));
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
    function handleSelectRow(rowId) {
        var newSelected = selectedRows.slice(0);
        var index = selectedRows.indexOf(rowId);
        if (index === -1) {
            newSelected.push(rowId);
        }
        else {
            newSelected.splice(index, 1);
        }
        setSelectedRows(newSelected);
    }
    function handleSelectAll() {
        var allRowIds = currentPage.rows.map(function (row) { return row.id; });
        setSelectedRows(allRowIds);
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
        var currentSelectedRows = selectedRows.slice(0);
        var newAlteredRows = alteredRows.slice(0);
        var _loop_1 = function (rowId) {
            var index = newAlteredRows.findIndex(function (row) { return row.id === rowId; });
            if (index !== -1) {
                newAlteredRows.splice(index, 1);
            }
        };
        for (var _i = 0, currentSelectedRows_1 = currentSelectedRows; _i < currentSelectedRows_1.length; _i++) {
            var rowId = currentSelectedRows_1[_i];
            _loop_1(rowId);
        }
        updateAlteredRows(newAlteredRows, query);
    }
    function updateAlteredRows(alteredRows, query) {
        var filteredRows = filterRows(alteredRows, query);
        var newPages = createPages(filteredRows);
        var newCurrentPageIndex = Math.min(newPages.length, currentPage.index);
        var newCurrentPage = newPages[newCurrentPageIndex];
        setAlteredRows(alteredRows);
        setFilteredRows(filteredRows);
        setPages(newPages);
        setCurrentPage(newCurrentPage);
        setSelectedRows([]);
        onChange(id, alteredRows);
    }
    function filterRows(rows, query) {
        if (query.length === 0) {
            return rows;
        }
        return rows.filter(function (row) { return matchRow(row, query); });
    }
    function matchRow(row, query) {
        var rowText = row.cells.map(function (cell) { return cell.text; }).join(' ');
        return query.find(function (word) { return !rowText.includes(word); }) === undefined;
    }
    function handleUndo() {
        updateAlteredRows(body.rows, query);
    }
    function handleSearch(query) {
        setQuery(query);
        updateAlteredRows(alteredRows, query);
    }
    return (_jsxs(_Fragment, { children: [_jsxs("div", __assign({ className: 'flex flex-row gap-4' }, { children: [_jsx("div", __assign({ className: "".concat(!editMode && !readOnly ? '' : 'hidden') }, { children: _jsx(PrimaryButton, { label: 'Edit', onClick: function () { return setEditMode(true); }, color: 'bg-delete text-white' }) })), _jsx("div", __assign({ className: "".concat(editMode ? '' : 'hidden') }, { children: _jsx(PrimaryButton, { label: 'Select all', onClick: handleSelectAll }) })), _jsx("div", __assign({ className: "".concat(editMode ? '' : 'hidden') }, { children: _jsx(SecondaryButton, { label: 'Delete', onClick: handleDeleteSelected }) })), _jsx("div", __assign({ className: "".concat(editMode && body.rows.length > 0 ? '' : 'hidden') }, { children: _jsx(SecondaryButton, { label: 'Undo', onClick: handleUndo, color: 'text-grey1' }) })), _jsx("div", __assign({ className: "".concat(alteredRows.length > pageSize ? '' : 'hidden') }, { children: _jsx(SearchBar, { placeholder: 'Search', onSearch: handleSearch }) }))] })), _jsxs("div", __assign({ className: "".concat(filteredRows.length === 0 ? 'hidden' : '') }, { children: [_jsxs("table", __assign({ className: 'text-grey1 table-auto ' }, { children: [_jsx("thead", { children: renderHeadRow(head) }), _jsx("tbody", { children: renderRows(currentPage.rows) })] })), _jsxs("div", __assign({ className: "flex flex-row gap-4 mt-2 ".concat(filteredRows.length <= pageSize ? 'hidden' : '', " ") }, { children: [_jsx(BackButton, { label: 'Previous', onClick: handlePrevious }), _jsxs("div", { children: [currentPage.index + 1, " / ", pages.length] }), _jsx(ForwardButton, { label: 'Next', onClick: handleNext })] }))] })), _jsx("div", __assign({ className: "flex flex-col ".concat(alteredRows.length === 0 ? '' : 'hidden') }, { children: _jsx(BodyLarge, { text: 'Empty data set', margin: '' }) })), _jsx("div", __assign({ className: "flex flex-col ".concat(alteredRows.length > 0 && filteredRows.length === 0 ? '' : 'hidden') }, { children: _jsx(BodyLarge, { text: 'Nothing found', margin: '' }) }))] }));
};
