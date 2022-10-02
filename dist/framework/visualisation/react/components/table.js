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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export var TableFactory = function (props) { return _jsx(Table, __assign({}, props)); };
export var Table = function (_a) {
    var id = _a.id, header = _a.header, body = _a.body;
    return (_jsxs("table", __assign({ className: 'text-grey1 table-auto' }, { children: [_jsx(TableHead, __assign({}, header)), _jsx(TableBody, __assign({}, body))] })));
};
export var TableHead = function (_a) {
    var cells = _a.cells;
    return (_jsx("thead", { children: _jsx("tr", { children: cells.map(function (cell, index) { return _jsx(TableCell, { header: true, cell: cell }, "".concat(index)); }) }) }));
};
export var TableBody = function (_a) {
    var rows = _a.rows;
    return (_jsx("tbody", { children: rows.map(function (row, index) { return (_jsx(TableRow, __assign({}, row), "".concat(index))); }) }));
};
export var TableRow = function (_a) {
    var _b = _a.header, header = _b === void 0 ? false : _b, cells = _a.cells;
    return (_jsx("tr", { children: cells.map(function (cell, index) { return _jsx(TableCell, { header: header, cell: cell }, "".concat(index)); }) }));
};
export var TableCell = function (_a) {
    var _b = _a.header, header = _b === void 0 ? false : _b, cell = _a.cell;
    return (header
        ? _jsx("th", __assign({ className: 'px-2 pb-3 font-button text-button text-left' }, { children: cell }))
        : _jsx("td", __assign({ className: 'px-2 font-body text-body' }, { children: cell })));
};
