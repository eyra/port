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
export var Table = function (_a) {
    var id = _a.id, head = _a.head, body = _a.body;
    function renderHead(props) {
        return _jsx("tr", { children: props.cells.map(function (cell, index) { return renderHeadCell(cell, index); }) });
    }
    function renderHeadCell(props, index) {
        return _jsx("th", __assign({ className: 'px-2 pb-3 font-button text-button text-left' }, { children: props.text }), "".concat(index));
    }
    function renderRows(props) {
        return props.rows.map(function (row, index) { return renderRow(row, index); });
    }
    function renderRow(row, rowIndex) {
        return _jsx("tr", { children: row.cells.map(function (cell, cellIndex) { return renderRowCell(cell, cellIndex); }) }, "".concat(rowIndex));
    }
    function renderRowCell(props, cellIndex) {
        return _jsx("td", __assign({ className: 'px-2 font-body text-body' }, { children: props.text }), "".concat(cellIndex));
    }
    return (_jsxs("table", __assign({ className: 'text-grey1 table-auto' }, { children: [_jsx("thead", { children: renderHead(head) }), _jsx("tbody", { children: renderRows(body) })] })));
};
