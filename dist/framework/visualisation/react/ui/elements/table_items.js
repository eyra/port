import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
export const TableItems = ({ table, searchedTable, locale }) => {
    const text = useMemo(() => getTranslations(locale), [locale]);
    const deleted = table.deletedRowCount;
    const n = table.body.rows.length;
    const searched = searchedTable.body.rows.length;
    const total = table.originalBody.rows.length - table.deletedRowCount;
    const nLabel = n.toLocaleString(locale, { useGrouping: true });
    const totalLabel = total.toLocaleString(locale, { useGrouping: true });
    const searchLabel = searched.toLocaleString(locale, { useGrouping: true });
    const deletedLabel = deleted.toLocaleString('en', { useGrouping: true }) + ' ' + text.deleted;
    return (_jsxs("div", Object.assign({ className: 'flex  min-w-[200px] gap-1' }, { children: [_jsx("div", Object.assign({ className: 'flex items-center  ' }, { children: tableIcon })), _jsxs("div", Object.assign({ className: 'flex flex-wrap items-center pl-2  gap-x-2 animate-fadeIn text-lg text-title6 font-label ' }, { children: [_jsxs("div", { children: [table.head.cells.length, " ", text.columns, ","] }), _jsxs("div", Object.assign({ className: 'animate-fadeIn' }, { children: [searched < n ? searchLabel + ' / ' + nLabel : nLabel, " ", text.rows] }), totalLabel), _jsxs("div", Object.assign({ className: `flex text-grey2 ${deleted > 0 ? '' : 'hidden'}` }, { children: ["(", deletedLabel, ")"] }))] }), `${totalLabel}_${deleted}`)] })));
};
const tableIcon = (_jsxs("svg", Object.assign({ className: 'h-9', viewBox: '4 4 18 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: [_jsx("rect", { x: '9', y: '9', width: '4', height: '2', fill: '#4272EF' }), _jsx("rect", { x: '9', y: '13', width: '4', height: '2', fill: '#4272EF' }), _jsx("rect", { x: '9', y: '17', width: '4', height: '2', fill: '#4272EF' }), _jsx("rect", { x: '15', y: '9', width: '4', height: '2', fill: '#4272EF' }), _jsx("rect", { x: '15', y: '13', width: '4', height: '2', fill: '#4272EF' }), _jsx("rect", { x: '15', y: '17', width: '4', height: '2', fill: '#4272EF' }), _jsx("rect", { x: '4', y: '4', width: '15', height: '3', fill: '#4272EF' }), _jsx("rect", { x: '4', y: '9', width: '3', height: '10', fill: '#4272EF' })] })));
function getTranslations(locale) {
    const translated = {};
    for (const [key, value] of Object.entries(translations)) {
        translated[key] = Translator.translate(value, locale);
    }
    return translated;
}
const translations = {
    columns: new TextBundle().add('en', 'columns').add('nl', 'kolommen'),
    rows: new TextBundle().add('en', 'rows').add('nl', 'rijen'),
    deleted: new TextBundle().add('en', 'deleted').add('nl', 'verwijderd')
};
