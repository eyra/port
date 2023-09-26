import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Progress = ({ percentage }) => {
    return (_jsxs("div", Object.assign({ id: 'progress', className: 'relative w-full overflow-hidden rounded-full' }, { children: [_jsx("div", Object.assign({ className: 'flex flex-row items-center gap-4' }, { children: _jsx("div", { className: 'flex-grow h-4 bg-primarylight' }) })), _jsx("div", { className: 'absolute top-0 h-4 bg-primary', style: { width: `${percentage}%` } })] })));
};
