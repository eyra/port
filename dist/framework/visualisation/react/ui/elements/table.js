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
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
import { BackIconButton, ForwardIconButton, IconLabelButton } from './button';
import { CheckBox } from './check_box';
import { SearchBar } from './search_bar';
import { Caption, Label, Title3 } from './text';
import UndoSvg from '../../../../../assets/images/undo.svg';
import DeleteSvg from '../../../../../assets/images/delete.svg';
import { PageIcon } from './page_icon';
export var Table = function (_a) {
    var id = _a.id, head = _a.head, body = _a.body, _b = _a.readOnly, readOnly = _b === void 0 ? false : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 7 : _c, locale = _a.locale, onChange = _a.onChange;
    var pageWindowLegSize = 3;
    var query = React.useRef([]);
    var alteredRows = React.useRef(body.rows);
    var filteredRows = React.useRef(alteredRows.current);
    var initialState = {
        edit: false,
        pageCount: getPageCount(),
        page: 0,
        pageWindow: updatePageWindow(0),
        rows: updateRows(0),
        selected: [],
        deletedCount: 0,
        visibility: {
            search: alteredRows.current.length > pageSize,
            delete: false,
            undo: false,
            table: filteredRows.current.length > 0,
            noData: filteredRows.current.length === 0,
            noDataLeft: false,
            noResults: false
        }
    };
    var _d = React.useState(initialState), state = _d[0], setState = _d[1];
    var copy = prepareCopy(locale);
    function display(element) {
        return visible(element) ? '' : 'hidden';
    }
    function visible(element) {
        if (typeof state.visibility[element] === 'boolean') {
            return state.visibility[element];
        }
        return false;
    }
    function updatePageWindow(currentPage) {
        var pageWindowSize = (pageWindowLegSize * 2) + 1;
        var pageCount = getPageCount();
        var range = [];
        if (pageWindowSize >= pageCount && pageCount > 0) {
            range = _.range(0, Math.min(pageCount, pageWindowSize));
        }
        else if (pageWindowSize < pageCount) {
            var maxIndex = pageCount - 1;
            var start = void 0;
            var end = void 0;
            if (currentPage < pageWindowLegSize) {
                // begin
                start = 0;
                end = Math.min(pageCount, pageWindowSize);
            }
            else if (maxIndex - currentPage <= pageWindowLegSize) {
                // end
                start = maxIndex - (pageWindowSize - 1);
                end = maxIndex + 1;
            }
            else {
                // middle
                start = currentPage - pageWindowLegSize;
                end = currentPage + pageWindowLegSize + 1;
            }
            range = _.range(start, end);
        }
        return range;
    }
    function getPageCount() {
        if (filteredRows.current.length === 0) {
            return 0;
        }
        return Math.ceil(filteredRows.current.length / pageSize);
    }
    function updateRows(currentPage) {
        var offset = currentPage * pageSize;
        return filteredRows.current.slice(offset, offset + pageSize);
    }
    function renderHeadRow(props) {
        return (_jsxs("tr", { children: [state.edit ? renderHeadCheck() : '', props.cells.map(function (cell, index) { return renderHeadCell(cell, index); })] }));
    }
    function renderHeadCheck() {
        var selected = state.selected.length > 0 && state.selected.length === state.rows.length;
        return (_jsx("td", __assign({ className: 'pl-4 w-10' }, { children: _jsx(CheckBox, { id: '-1', selected: selected, onSelect: function () { return handleSelectHead(); } }) }), 'check-head'));
    }
    function renderHeadCell(props, index) {
        return (_jsx("th", __assign({ className: 'h-12 px-4 text-left' }, { children: _jsx("div", __assign({ className: 'font-table-header text-table text-grey1' }, { children: props.text })) }), "".concat(index)));
    }
    function renderRows() {
        return state.rows.map(function (row, index) { return renderRow(row, index); });
    }
    function renderRow(row, rowIndex) {
        return (_jsxs("tr", __assign({ className: 'hover:bg-grey6' }, { children: [state.edit ? renderRowCheck(row.id) : '', row.cells.map(function (cell, cellIndex) { return renderRowCell(cell, cellIndex); })] }), "".concat(rowIndex)));
    }
    function renderRowCheck(rowId) {
        var selected = state.selected.includes(rowId);
        return (_jsx("td", __assign({ className: 'pl-4' }, { children: _jsx(CheckBox, { id: rowId, selected: selected, onSelect: function () { return handleSelectRow(rowId); } }) }), "check-".concat(rowId)));
    }
    function renderRowCell(_a, cellIndex) {
        var text = _a.text;
        var body = isValidHttpUrl(text) ? renderRowLink(text) : renderRowText(text);
        return (_jsx("td", __assign({ className: 'h-12 px-4' }, { children: body }), "".concat(cellIndex)));
    }
    function renderRowText(text) {
        return _jsx("div", __assign({ className: 'font-table-row text-table text-grey1' }, { children: text }));
    }
    function renderRowLink(href) {
        return (_jsx("div", __assign({ className: 'font-table-row text-table text-primary underline' }, { children: _jsx("a", __assign({ href: href, target: '_blank', rel: 'noreferrer', title: href }, { children: copy.link })) })));
    }
    function isValidHttpUrl(value) {
        var url;
        try {
            url = new URL(value);
        }
        catch (_) {
            return false;
        }
        return url.protocol === 'http:' || url.protocol === 'https:';
    }
    function renderPageIcons() {
        return (_jsx("div", __assign({ className: 'flex flex-row gap-2' }, { children: state.pageWindow.map(function (page) { return renderPageIcon(page); }) })));
    }
    function renderPageIcon(index) {
        return _jsx(PageIcon, { index: index + 1, selected: state.page === index, onClick: function () { return handleNewPage(index); } }, "page-".concat(index));
    }
    function filterRows() {
        if (query.current.length === 0) {
            return alteredRows.current;
        }
        return alteredRows.current.filter(function (row) { return matchRow(row, query.current); });
    }
    function matchRow(row, query) {
        var rowText = row.cells.map(function (cell) { return cell.text; }).join(' ');
        return query.find(function (word) { return !rowText.includes(word); }) === undefined;
    }
    function handleSelectHead() {
        var allRowsSelected = state.selected.length === state.rows.length;
        if (allRowsSelected) {
            setState(function (state) {
                return __assign(__assign({}, state), { selected: [] });
            });
        }
        else {
            handleSelectAll();
        }
    }
    function handleSelectRow(rowId) {
        setState(function (state) {
            var selected = state.selected.slice(0);
            var index = selected.indexOf(rowId);
            if (index === -1) {
                selected.push(rowId);
            }
            else {
                selected.splice(index, 1);
            }
            return __assign(__assign({}, state), { selected: selected });
        });
    }
    function handleSelectAll() {
        setState(function (state) {
            var selected = state.rows.map(function (row) { return row.id; });
            return __assign(__assign({}, state), { selected: selected });
        });
    }
    function handlePrevious() {
        setState(function (state) {
            var page = state.page === 0 ? state.pageCount - 1 : state.page - 1;
            var pageWindow = updatePageWindow(page);
            var rows = updateRows(page);
            return __assign(__assign({}, state), { page: page, pageWindow: pageWindow, rows: rows });
        });
    }
    function handleNext() {
        setState(function (state) {
            var page = state.page === state.pageCount - 1 ? 0 : state.page + 1;
            var pageWindow = updatePageWindow(page);
            var rows = updateRows(page);
            return __assign(__assign({}, state), { page: page, pageWindow: pageWindow, rows: rows });
        });
    }
    function handleDeleteSelected() {
        var currentSelectedRows = state.selected.slice(0);
        if (currentSelectedRows.length === 0)
            return;
        var newAlteredRows = alteredRows.current.slice(0);
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
        alteredRows.current = newAlteredRows;
        filteredRows.current = filterRows();
        setState(function (state) {
            var pageCount = getPageCount();
            var page = Math.max(0, Math.min(pageCount - 1, state.page));
            var pageWindow = updatePageWindow(page);
            var rows = updateRows(page);
            var deletedCount = body.rows.length - alteredRows.current.length;
            var visibility = __assign(__assign({}, state.visibility), { undo: deletedCount > 0, table: filteredRows.current.length > 0, noData: false, noDataLeft: alteredRows.current.length === 0, noResults: alteredRows.current.length > 0 && filteredRows.current.length === 0 });
            return __assign(__assign({}, state), { page: page, pageCount: pageCount, pageWindow: pageWindow, rows: rows, deletedCount: deletedCount, selected: [], visibility: visibility });
        });
        onChange(id, alteredRows.current);
    }
    function handleUndo() {
        alteredRows.current = body.rows;
        filteredRows.current = filterRows();
        setState(function (state) {
            var pageCount = getPageCount();
            var page = Math.min(pageCount, state.page);
            var pageWindow = updatePageWindow(page);
            var rows = updateRows(state.page);
            var visibility = __assign(__assign({}, state.visibility), { undo: false, table: filteredRows.current.length > 0, noData: false, noDataLeft: false, noResults: filteredRows.current.length === 0 });
            return __assign(__assign({}, state), { page: page, pageCount: pageCount, pageWindow: pageWindow, rows: rows, deletedCount: 0, selected: [], visibility: visibility });
        });
        onChange(id, body.rows);
    }
    function handleSearch(newQuery) {
        query.current = newQuery;
        filteredRows.current = filterRows();
        setState(function (state) {
            var pageCount = getPageCount();
            var page = Math.min(pageCount, state.page);
            var pageWindow = updatePageWindow(page);
            var rows = updateRows(state.page);
            var visibility = __assign(__assign({}, state.visibility), { table: filteredRows.current.length > 0, noData: body.rows.length === 0, noDataLeft: body.rows.length > 0 && alteredRows.current.length === 0, noResults: body.rows.length > 0 && alteredRows.current.length > 0 && filteredRows.current.length === 0 });
            return __assign(__assign({}, state), { page: page, pageCount: pageCount, pageWindow: pageWindow, rows: rows, visibility: visibility });
        });
    }
    function handleNewPage(page) {
        setState(function (state) {
            var rows = updateRows(page);
            return __assign(__assign({}, state), { page: page, rows: rows });
        });
    }
    function handleEditToggle() {
        setState(function (state) {
            var edit = !state.edit;
            var visibility = __assign(__assign({}, state.visibility), { delete: edit });
            return __assign(__assign({}, state), { edit: edit, visibility: visibility });
        });
    }
    return (_jsxs(_Fragment, { children: [_jsxs("div", __assign({ className: 'flex flex-row gap-4 items-center' }, { children: [_jsxs("div", __assign({ className: "flex flex-row items-center gap-2 mt-2 ".concat(body.rows.length <= pageSize ? 'hidden' : '', " ") }, { children: [_jsx(BackIconButton, { onClick: handlePrevious }), _jsx("div", { children: renderPageIcons() }), _jsx(ForwardIconButton, { onClick: handleNext })] })), _jsx("div", { className: 'flex-grow' }), _jsx(Caption, { text: copy.pages, color: 'text-grey2', margin: '' }), _jsx("div", __assign({ className: "".concat(display('search')) }, { children: _jsx(SearchBar, { placeholder: copy.searchPlaceholder, onSearch: function (query) { return handleSearch(query); } }) }))] })), _jsx("div", __assign({ className: "flex flex-col gap-4 justify-center h-full ".concat(display('table')) }, { children: _jsxs("table", __assign({ className: 'text-grey1 table-fixed divide-y divide-grey4' }, { children: [_jsx("thead", { children: renderHeadRow(head) }), _jsx("tbody", __assign({ className: 'divide-y divide-grey4' }, { children: renderRows() }))] })) })), _jsx("div", __assign({ className: "flex flex-col justify-center items-center w-full h-table bg-grey6 ".concat(display('noData')) }, { children: _jsx(Title3, { text: copy.noData, color: 'text-grey3', margin: '' }) })), _jsx("div", __assign({ className: "flex flex-col justify-center items-center w-full h-table bg-grey6 ".concat(display('noDataLeft')) }, { children: _jsx(Title3, { text: copy.noDataLeft, color: 'text-grey3', margin: '' }) })), _jsx("div", __assign({ className: "flex flex-col justify-center items-center w-full h-table bg-grey6 ".concat(display('noResults')) }, { children: _jsx(Title3, { text: copy.noResults, color: 'text-grey3', margin: '' }) })), _jsxs("div", __assign({ className: "flex flex-row items-center gap-6 mt-2 h-8 ".concat(body.rows.length === 0 ? 'hidden' : '', " ") }, { children: [_jsxs("div", __assign({ className: 'flex flex-row gap-4 items-center' }, { children: [_jsx(CheckBox, { id: 'edit', selected: state.edit, onSelect: handleEditToggle }), _jsx(Label, { text: copy.edit, margin: 'mt-1px' })] })), _jsx("div", __assign({ className: "".concat(display('delete'), " mt-1px") }, { children: _jsx(IconLabelButton, { label: copy.delete, color: 'text-delete', icon: DeleteSvg, onClick: handleDeleteSelected }) })), _jsx("div", { className: 'flex-grow' }), _jsx(Label, { text: copy.deleted }), _jsx("div", __assign({ className: "".concat(display('undo')) }, { children: _jsx(IconLabelButton, { label: copy.undo, color: 'text-primary', icon: UndoSvg, onClick: handleUndo }) }))] }))] }));
    function prepareCopy(locale) {
        return {
            edit: Translator.translate(editLabel, locale),
            undo: Translator.translate(undoLabel, locale),
            noData: Translator.translate(noDataLabel, locale),
            noDataLeft: Translator.translate(noDataLeftLabel, locale),
            noResults: Translator.translate(noResultsLabel, locale),
            pages: Translator.translate(pagesLabel(state.pageCount), locale),
            delete: Translator.translate(deleteLabel, locale),
            deleted: Translator.translate(deletedLabel(body.rows.length - alteredRows.current.length), locale),
            searchPlaceholder: Translator.translate(searchPlaceholder, locale),
            link: Translator.translate(link, locale)
        };
    }
};
var link = new TextBundle()
    .add('en', 'Check out')
    .add('nl', 'Bekijk');
var searchPlaceholder = new TextBundle()
    .add('en', 'Search')
    .add('nl', 'Zoeken');
var noDataLabel = new TextBundle()
    .add('en', 'No data found')
    .add('nl', 'Geen gegevens gevonden');
var noDataLeftLabel = new TextBundle()
    .add('en', 'All data removed')
    .add('nl', 'Alle gegevens verwijderd');
var noResultsLabel = new TextBundle()
    .add('en', 'No search results')
    .add('nl', 'Geen zoek resultaten');
var editLabel = new TextBundle()
    .add('en', 'Adjust')
    .add('nl', 'Aanpassen');
var undoLabel = new TextBundle()
    .add('en', 'Undo')
    .add('nl', 'Herstel');
var deleteLabel = new TextBundle()
    .add('en', 'Delete selected')
    .add('nl', 'Verwijder selectie');
function deletedNoneRowLabel() {
    return new TextBundle()
        .add('en', 'No adjustments')
        .add('nl', 'Geen aanpassingen');
}
function deletedRowLabel(amount) {
    return new TextBundle()
        .add('en', "".concat(amount, " row deleted"))
        .add('nl', "".concat(amount, " rij verwijderd"));
}
function deletedRowsLabel(amount) {
    return new TextBundle()
        .add('en', "".concat(amount, " rows deleted"))
        .add('nl', "".concat(amount, " rijen verwijderd"));
}
function deletedLabel(amount) {
    if (amount === 0)
        return deletedNoneRowLabel();
    if (amount === 1)
        return deletedRowLabel(amount);
    return deletedRowsLabel(amount);
}
function singlePageLabel() {
    return new TextBundle()
        .add('en', '1 page')
        .add('nl', '1 pagina');
}
function multiplePagesLabel(amount) {
    return new TextBundle()
        .add('en', "".concat(amount, " pages"))
        .add('nl', "".concat(amount, " pagina's"));
}
function pagesLabel(amount) {
    if (amount === 1)
        return singlePageLabel();
    return multiplePagesLabel(amount);
}
