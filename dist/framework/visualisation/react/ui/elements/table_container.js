import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { Figure } from '../elements/figure';
import { TableItems } from './table_items';
import { SearchBar } from './search_bar';
import { Title4 } from './text';
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
import { Table } from './table';
export const TableContainer = ({ id, table, updateTable, locale }) => {
    const tableVisualizations = table.visualizations != null ? table.visualizations : [];
    const [searchFilterIds, setSearchFilterIds] = useState();
    const [search, setSearch] = useState('');
    const lastSearch = useRef('');
    const text = useMemo(() => getTranslations(locale), [locale]);
    const [show, setShow] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            const ids = searchRows(table.originalBody.rows, search);
            setSearchFilterIds(ids);
            if (search !== '' && lastSearch.current === '')
                setTimeout(() => setShow(true), 10);
            lastSearch.current = search;
        }, 300);
        return () => clearTimeout(timer);
    }, [search, lastSearch]);
    const searchedTable = useMemo(() => {
        if (searchFilterIds === undefined)
            return table;
        const filteredRows = table.body.rows.filter((row) => searchFilterIds.has(row.id));
        return Object.assign(Object.assign({}, table), { body: Object.assign(Object.assign({}, table.body), { rows: filteredRows }) });
    }, [table, searchFilterIds]);
    const handleDelete = useCallback((rowIds) => {
        var _a, _b;
        if (rowIds == null) {
            if (searchedTable !== null) {
                // if no rowIds specified, delete all rows that meet search condition
                rowIds = searchedTable.body.rows.map((row) => row.id);
            }
            else {
                return;
            }
        }
        if (rowIds.length > 0) {
            if (rowIds.length === ((_b = (_a = searchedTable === null || searchedTable === void 0 ? void 0 : searchedTable.body) === null || _a === void 0 ? void 0 : _a.rows) === null || _b === void 0 ? void 0 : _b.length)) {
                setSearch('');
                setSearchFilterIds(undefined);
            }
            const deletedRows = [...table.deletedRows, rowIds];
            const newTable = deleteTableRows(table, deletedRows);
            updateTable(id, newTable);
        }
    }, [id, table, searchedTable]);
    const handleUndo = useCallback(() => {
        const deletedRows = table.deletedRows.slice(0, -1);
        const newTable = deleteTableRows(table, deletedRows);
        updateTable(id, newTable);
    }, [id, table]);
    return (_jsx("div", Object.assign({ className: 'p-4 flex flex-col gap-4 w-full overflow-hidden border border-[0.2rem] border-grey4 rounded-lg' }, { children: _jsxs("div", Object.assign({ className: 'flex flex-wrap ' }, { children: [_jsxs("div", Object.assign({ className: 'flex justify-between w-full ' }, { children: [_jsx(Title4, { text: table.title, margin: 'mb-2' }), _jsx(SearchBar, { placeholder: text.searchPlaceholder, search: search, onSearch: setSearch })] }), 'Title'), _jsxs("div", Object.assign({ className: 'flex items-center justify-between w-full my-1 py-1 rounded ' }, { children: [_jsx(TableItems, { table: table, searchedTable: searchedTable, locale: locale }), _jsxs("button", Object.assign({ className: ' flex end gap-3 animate-fadeIn', onClick: () => setShow(!show) }, { children: [_jsx("div", Object.assign({ className: 'text-primary' }, { children: show ? zoomOutIcon : zoomInIcon }), 'zoomout'), _jsx("div", Object.assign({ className: 'text-right' }, { children: show ? text.hideTable : text.showTable }), 'zoomin')] }), show ? 'animate' : '')] }), 'TableSummary'), _jsx("div", Object.assign({ className: 'w-full ' }, { children: _jsx("div", Object.assign({ className: '' }, { children: _jsx(Table, { show: show, table: searchedTable, search: search, handleDelete: handleDelete, handleUndo: handleUndo, locale: locale }) })) }), 'Table'), _jsx("div", Object.assign({ className: `pt-2 grid w-full gap-4 transition-all ${tableVisualizations.length > 0 ? '' : 'hidden'}` }, { children: tableVisualizations.map((vs, i) => {
                        return (_jsx("div", Object.assign({ className: 'p-3 bg-grey6 rounded-md border border-[0.2rem] border-grey4 w-full overflow-auto' }, { children: _jsx(Figure, { table: searchedTable, visualization: vs, locale: locale, handleDelete: handleDelete, handleUndo: handleUndo }) }), `${table.id}_${i}`));
                    }) }), 'Visualizations')] })) }), table.id));
};
function deleteTableRows(table, deletedRows) {
    const deleteIds = new Set();
    for (const deletedSet of deletedRows) {
        for (const id of deletedSet) {
            deleteIds.add(id);
        }
    }
    const rows = table.originalBody.rows.filter((row) => !deleteIds.has(row.id));
    const deletedRowCount = table.originalBody.rows.length - rows.length;
    return Object.assign(Object.assign({}, table), { body: Object.assign(Object.assign({}, table.body), { rows }), deletedRowCount, deletedRows });
}
function searchRows(rows, search) {
    if (search.trim() === '')
        return undefined;
    // Not sure whether it's better to look for one of the words or exact string.
    // Now going for exact string. Note that if you change this, you should also change
    // the highlighting behavior in table.tsx (<Highlighter searchWords.../>)
    // const query = search.trim().split(/\s+/)
    const query = [search.trim()];
    const regexes = [];
    for (const q of query)
        regexes.push(new RegExp(q.replace(/[-/\\^$*+?.()|[\]{}]/, '\\$&'), 'i'));
    const ids = new Set();
    for (const row of rows) {
        for (const regex of regexes) {
            let anyCellMatches = false;
            for (const cell of row.cells) {
                if (regex.test(cell.text)) {
                    anyCellMatches = true;
                    break;
                }
            }
            if (anyCellMatches)
                ids.add(row.id);
        }
    }
    return ids;
}
const zoomInIcon = (_jsx("svg", Object.assign({ className: 'h-6 w-6', fill: 'none', stroke: 'currentColor', strokeWidth: '2', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg', "aria-hidden": 'true' }, { children: _jsx("path", { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6' }) })));
const zoomOutIcon = (_jsx("svg", Object.assign({ className: 'h-6 w-6', fill: 'none', stroke: 'currentColor', strokeWidth: '2', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg', "aria-hidden": 'true' }, { children: _jsx("path", { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6' }) })));
function getTranslations(locale) {
    const translated = {};
    for (const [key, value] of Object.entries(translations)) {
        translated[key] = Translator.translate(value, locale);
    }
    return translated;
}
const translations = {
    searchPlaceholder: new TextBundle().add('en', 'Search').add('nl', 'Zoeken'),
    showTable: new TextBundle().add('en', 'Show table').add('nl', 'Tabel tonen'),
    hideTable: new TextBundle().add('en', 'Hide table').add('nl', 'Tabel verbergen')
};
