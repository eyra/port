import { jsx as _jsx } from "react/jsx-runtime";
export const PageIcon = ({ index, selected, onClick }) => {
    function width() {
        if (index > 999)
            return 'w-10';
        if (index > 99)
            return 'w-9';
        return 'w-8';
    }
    return (_jsx("div", Object.assign({ className: `rounded ${width()} h-8 cursor-pointer flex-shrink-0 overflow-hidden ${selected ? 'bg-primary' : 'bg-grey5 '}`, onClick: onClick }, { children: _jsx("div", Object.assign({ className: 'flex flex-row items-center justify-center w-full h-full' }, { children: _jsx("div", Object.assign({ className: `text-label font-label ${selected ? 'text-white' : 'text-grey2'}` }, { children: `${index}` })) })) })));
};
