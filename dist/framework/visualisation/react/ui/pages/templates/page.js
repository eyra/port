import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Page = (props) => {
    return (_jsxs("div", Object.assign({ className: 'flex flex-col w-full h-full gap-4' }, { children: [_jsxs("div", Object.assign({ className: 'flex flex-row flex-wrap-reverse w-full pt-20 px-8 md:px-14 gap-8 max-w-7xl mx-auto' }, { children: [_jsx("div", Object.assign({ className: 'flex-1 min-w-[min(100%,400px)] ' }, { children: props.body })), props.sidebar != null && (_jsx("div", Object.assign({ className: 'mx-auto basis[w-sidebar] flex-shrink-0' }, { children: props.sidebar })))] })), _jsx("div", { className: 'flex-grow' }), _jsx("div", Object.assign({ className: 'h-footer flex-shrink-0' }, { children: props.footer }))] })));
};
