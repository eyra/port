import { jsx as _jsx } from "react/jsx-runtime";
export const Main = ({ elements }) => {
    elements = elements.map((element, index) => { return { ...element, key: `${index}` }; });
    return (_jsx("div", { className: 'flex w-full', children: _jsx("div", { className: 'flex-grow m-6 md:8 lg:m-14 max-w-sheet', children: _jsx("div", { className: 'w-full', children: elements }) }) }));
};
