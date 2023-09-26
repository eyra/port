import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Sidebar = (props) => {
    return (_jsxs("div", Object.assign({ className: 'flex flex-col gap-10' }, { children: [_jsxs("div", Object.assign({ className: 'flex-wrap flex flex-row' }, { children: [_jsx("div", { className: 'flex-grow' }), _jsx("div", Object.assign({ className: 'h-logo' }, { children: _jsx("img", { src: props.logo }) })), _jsx("div", { className: 'flex-grow' })] })), _jsx("div", { children: props.content })] })));
};
