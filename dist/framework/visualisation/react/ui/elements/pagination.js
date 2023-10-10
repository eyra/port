import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Pagination = ({ page, setPage, nPages }) => {
    function activeButton(active) {
        if (active)
            return 'text-primary';
        return 'text-grey3 hover:cursor-default';
    }
    return (_jsxs("div", Object.assign({ className: `flex items-center gap-1 lg:gap-3 p-3 ${nPages <= 1 ? 'invisible' : ''}` }, { children: [_jsx("button", Object.assign({ className: activeButton(page > 0), onClick: () => setPage(Math.max(page - 10, 0)) }, { children: doubleBackward })), _jsx("button", Object.assign({ className: activeButton(page > 0), onClick: () => setPage(Math.max(page - 1, 0)) }, { children: backward })), _jsx("div", Object.assign({ className: 'text-center min-w-[2rem] font-title6 text-title6 h-5' }, { children: page + 1 })), _jsx("button", Object.assign({ className: activeButton(page < nPages - 1), onClick: () => setPage(Math.min(page + 1, nPages - 1)) }, { children: forward })), _jsx("button", Object.assign({ className: activeButton(page < nPages - 1), onClick: () => setPage(Math.min(page + 10, nPages - 1)) }, { children: doubleForward }))] })));
};
const backward = (_jsx("svg", Object.assign({ className: ' h-4', "aria-hidden": 'true', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 6 10' }, { children: _jsx("path", { stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M5 1 1 5l4 4' }) })));
const doubleBackward = (_jsx("svg", Object.assign({ className: 'h-4', "aria-hidden": 'true', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 12 10' }, { children: _jsx("path", { stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M5 1 1 5l4 4m6-8L7 5l4 4' }) })));
const forward = (_jsx("svg", Object.assign({ className: 'h-4 ', "aria-hidden": 'true', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 6 10' }, { children: _jsx("path", { stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'm1 9 4-4-4-4' }) })));
const doubleForward = (_jsx("svg", Object.assign({ className: 'h-4 ', "aria-hidden": 'true', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 12 10' }, { children: _jsx("path", { stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'm7 9 4-4-4-4M1 9l4-4-4-4' }) })));
