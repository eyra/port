import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { CheckBox } from './check_box';
import UndoSvg from '../../../../../assets/images/undo.svg';
import DeleteSvg from '../../../../../assets/images/delete.svg';
import { Pagination } from './pagination';
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
export const Table = ({ table, show, locale, search, handleDelete, handleUndo, pageSize = 7 }) => {
    const [page, setPage] = useState(0);
    const columnNames = useMemo(() => table.head.cells.map((cell) => cell.text), [table]);
    const [selected, setSelected] = useState(new Set());
    const ref = useRef(null);
    const nPages = Math.ceil(table.body.rows.length / pageSize);
    const selectedLabel = selected.size.toLocaleString(locale, { useGrouping: true });
    const text = useMemo(() => getTranslations(locale), [locale]);
    const [tooltip, setTooltip] = useState({
        show: false,
        content: null,
        x: 0,
        y: 0
    });
    const cellClass = ' h-[3rem] px-3 flex items-center font-table-row';
    useEffect(() => {
        setSelected(new Set());
        setPage((page) => Math.max(0, Math.min(page, nPages - 1)));
    }, [table, nPages]);
    useEffect(() => {
        // rm tooltip on scroll
        function rmTooltip() {
            setTooltip((tooltip) => (tooltip.show ? Object.assign(Object.assign({}, tooltip), { show: false }) : tooltip));
        }
        window.addEventListener('scroll', rmTooltip);
        return () => window.removeEventListener('scroll', rmTooltip);
    });
    useLayoutEffect(() => {
        // set exact height of grid row for height transition
        if (ref.current == null)
            return;
        if (!show) {
            ref.current.style.gridTemplateRows = '0rem';
            return;
        }
        function responsiveHeight() {
            if (ref.current == null)
                return;
            ref.current.style.gridTemplateRows = `${ref.current.scrollHeight}px`;
        }
        responsiveHeight();
        // just as a precaution, update height every second in case it changes
        const interval = setInterval(responsiveHeight, 1000);
        return () => clearInterval(interval);
    }, [ref, show, nPages]);
    const items = useMemo(() => {
        const items = new Array(pageSize).fill(null);
        for (let i = 0; i < pageSize; i++) {
            const index = page * pageSize + i;
            if (table.body.rows[index] !== undefined)
                items[i] = table.body.rows[index];
        }
        return items;
    }, [table, page, pageSize]);
    function renderHeaderCell(value, i) {
        return (_jsx("th", { children: _jsx("div", Object.assign({ className: `text-left ${cellClass}` }, { children: _jsx("div", { children: value }) })) }, `header ${i}`));
    }
    function renderRow(item, i) {
        if (item == null) {
            return (_jsx("tr", Object.assign({ className: 'border-b-2 border-grey4 ' }, { children: _jsx("td", { children: _jsx("div", { className: cellClass }) }) }), `{empty ${i}`));
        }
        return (_jsxs("tr", Object.assign({ className: 'border-b-2 border-grey4 border-solid' }, { children: [_jsx("td", { children: _jsx(CheckBox, { id: item.id, size: 'w-7 h-7', selected: selected.has(item.id), onSelect: () => toggleSelected(item.id) }) }, 'select'), item.cells.map((cell, j) => (_jsx("td", { children: _jsx(Cell, { cell: cell, search: search, cellClass: cellClass, setTooltip: setTooltip }) }, j)))] }), item.id));
    }
    function toggleSelected(id) {
        if (selected.has(id)) {
            selected.delete(id);
        }
        else {
            selected.add(id);
        }
        setSelected(new Set(selected));
    }
    function toggleSelectAll() {
        if (selected.size === table.body.rows.length) {
            setSelected(new Set());
        }
        else {
            setSelected(new Set(table.body.rows.map((row) => row.id)));
        }
    }
    return (_jsxs("div", Object.assign({ ref: ref, className: 'grid grid-cols-1 transition-[grid,color] duration-500 relative overflow-hidden ' }, { children: [_jsxs("div", Object.assign({ className: 'my-2 bg-grey6 rounded-md border-grey4 border-[0.2rem]' }, { children: [_jsx("div", Object.assign({ className: 'p-3 pt-1 pb-2 max-w-full overflow-x-scroll' }, { children: _jsxs("table", Object.assign({ className: 'table-fixed min-w-full' }, { children: [_jsx("thead", Object.assign({ className: '' }, { children: _jsxs("tr", Object.assign({ className: 'border-b-2 border-grey4 border-solid' }, { children: [_jsx("td", Object.assign({ className: 'w-8' }, { children: _jsx(CheckBox, { id: 'selectAll', size: 'w-7 h-7', selected: table.body.rows.length > 0 && selected.size === table.body.rows.length, onSelect: toggleSelectAll }) })), columnNames.map(renderHeaderCell)] })) })), _jsx("tbody", { children: items.map(renderRow) })] })) })), _jsxs("div", Object.assign({ className: 'px-3 pb-2 flex justify-between min-h-[3.5rem]' }, { children: [_jsx("div", Object.assign({ className: `pt-2 pb-4 ${selected.size > 0 || table.deletedRowCount > 0 ? '' : 'invisible'}` }, { children: selected.size > 0
                                    ? (_jsx(IconButton, { icon: DeleteSvg, label: `${text.delete} ${selectedLabel}`, color: 'text-delete', onClick: () => handleDelete === null || handleDelete === void 0 ? void 0 : handleDelete([...selected]) }))
                                    : (_jsx(IconButton, { icon: UndoSvg, label: text.undo, color: 'text-primary', onClick: () => handleUndo === null || handleUndo === void 0 ? void 0 : handleUndo() })) })), _jsx(Pagination, { page: page, setPage: setPage, nPages: nPages })] }))] })), _jsx("div", Object.assign({ className: `${tooltip.show ? '' : 'invisible'} fixed bg-[#222a] -translate-x-2 -translate-y-2 p-2  rounded text-white backdrop-blur-[2px] z-20 max-w-[20rem] pointer-events-none overflow-auto font-table-row`, style: { left: tooltip.x, top: tooltip.y } }, { children: tooltip.content }))] })));
};
function Cell({ cell, search, cellClass, setTooltip }) {
    const textRef = useRef(null);
    const [overflows, setOverflows] = useState(false);
    const searchWords = useMemo(() => {
        return [search];
        // return search.split(' ') // alternative: highlight individual words
    }, [search]);
    useEffect(() => {
        if (textRef.current == null)
            return;
        setOverflows(textRef.current.scrollWidth > textRef.current.clientWidth);
    }, [textRef]);
    function onSetTooltip() {
        if (textRef.current == null)
            return;
        if (!overflows)
            return;
        const rect = textRef.current.getBoundingClientRect();
        const content = (_jsx(Highlighter, { searchWords: searchWords, autoEscape: true, textToHighlight: cell.text, highlightClassName: 'bg-tertiary rounded-sm' }));
        setTooltip({
            show: true,
            content,
            x: rect.x,
            y: rect.y
        });
    }
    function onRmTooltip() {
        setTooltip((tooltip) => (tooltip.show ? Object.assign(Object.assign({}, tooltip), { show: false }) : tooltip));
    }
    return (_jsxs("div", Object.assign({ className: `relative ${cellClass}`, onMouseEnter: onSetTooltip, onMouseLeave: onRmTooltip, onClick: onSetTooltip }, { children: [_jsx("div", Object.assign({ ref: textRef, className: 'whitespace-nowrap max-w-[15rem] overflow-hidden overflow-ellipsis z-10' }, { children: _jsx(Highlighter, { searchWords: searchWords, autoEscape: true, textToHighlight: cell.text, highlightClassName: 'bg-tertiary rounded-sm' }) })), overflows && _jsx(TooltipIcon, {})] })));
}
function TooltipIcon() {
    return (_jsx("svg", Object.assign({ className: 'w-3 h-3 mb-1 text-gray-800 dark:text-white', "aria-hidden": 'true', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 10 16' }, { children: _jsx("path", { stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'm2.707 14.293 5.586-5.586a1 1 0 0 0 0-1.414L2.707 1.707A1 1 0 0 0 1 2.414v11.172a1 1 0 0 0 1.707.707Z' }) })));
}
function IconButton(props) {
    var _a;
    if ((_a = props.hidden) !== null && _a !== void 0 ? _a : false)
        return null;
    return (_jsxs("div", Object.assign({ className: `flex items-center gap-2 cursor-pointer ${props.color} animate-fadeIn text-button `, onClick: props.onClick }, { children: [_jsx("img", { src: props.icon, className: 'w-9 h-9 -translate-x-[3px]' }), props.label] })));
}
function getTranslations(locale) {
    const translated = {};
    for (const [key, value] of Object.entries(translations)) {
        translated[key] = Translator.translate(value, locale);
    }
    return translated;
}
const translations = {
    delete: new TextBundle().add('en', 'Delete').add('nl', 'Verwijder'),
    undo: new TextBundle().add('en', 'Undo').add('nl', 'Herstel')
};
