import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
function footerLinks() {
    return (_jsxs("div", Object.assign({ className: 'flex flex-row gap-4 text-link font-link' }, { children: [_jsx("div", Object.assign({ className: ' text-primary underline' }, { children: _jsx("a", Object.assign({ href: 'https://eyra.co', target: '_blank', rel: 'noreferrer' }, { children: "Privacy" })) })), _jsx("div", { className: 'bg-grey3 w-1px' }), _jsx("div", Object.assign({ className: ' text-primary underline' }, { children: _jsx("a", Object.assign({ href: 'https://eyra.co', target: '_blank', rel: 'noreferrer' }, { children: "Support" })) }))] })));
}
export const Footer = ({ left = footerLinks(), middle, right }) => {
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: 'bg-grey4 h-px' }), _jsx("div", Object.assign({ className: 'h-full flex flex-col justify-center' }, { children: _jsxs("div", Object.assign({ className: 'flex flex-row gap-4 px-14' }, { children: [_jsx("div", Object.assign({ className: 'w-1/3' }, { children: left })), _jsx("div", Object.assign({ className: 'w-1/3' }, { children: middle })), _jsx("div", Object.assign({ className: 'w-1/3' }, { children: right }))] })) }))] }));
};
