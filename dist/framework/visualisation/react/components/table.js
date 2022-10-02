import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const TableFactory = (props) => _jsx(Table, { ...props });
export const Table = ({ id, header, body }) => {
    return (_jsxs("table", { className: 'text-grey1 table-auto', children: [_jsx(TableHead, { ...header }), _jsx(TableBody, { ...body })] }));
};
export const TableHead = ({ cells }) => {
    return (_jsx("thead", { children: _jsx("tr", { children: cells.map((cell, index) => _jsx(TableCell, { header: true, cell: cell }, `${index}`)) }) }));
};
export const TableBody = ({ rows }) => {
    return (_jsx("tbody", { children: rows.map((row, index) => { return (_jsx(TableRow, { ...row }, `${index}`)); }) }));
};
export const TableRow = ({ header = false, cells }) => {
    return (_jsx("tr", { children: cells.map((cell, index) => _jsx(TableCell, { header: header, cell: cell }, `${index}`)) }));
};
export const TableCell = ({ header = false, cell }) => {
    return (header
        ? _jsx("th", { className: 'px-2 pb-3 font-button text-button text-left', children: cell })
        : _jsx("td", { className: 'px-2 font-body text-body', children: cell }));
};
