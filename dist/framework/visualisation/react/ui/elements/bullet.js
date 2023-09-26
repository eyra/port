import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Bullet = ({ color = 'bg-primary', frameSize = 'w-7 h-9', children }) => {
    return (_jsxs("div", Object.assign({ className: 'flex flex-row' }, { children: [_jsx("div", Object.assign({ className: `flex flex-row items-center flex-shrink-0 ${frameSize}` }, { children: _jsx("div", { className: `w-10px h-10px rounded-full overflow-hidden ${color}` }) })), children] })));
};
