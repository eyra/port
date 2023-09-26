import { jsx as _jsx } from "react/jsx-runtime";
export const SearchBar = ({ search, onSearch, placeholder }) => {
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }
    return (_jsx("form", { children: _jsx("div", Object.assign({ className: 'flex flex-row ' }, { children: _jsx("input", { className: `text-grey1  font-body pl-3 pr-3 w-full border-2 border-solid border-grey3 
          focus:outline-none focus:border-primary rounded-lg h-44px`, placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : '', 
                // name="query"  // autcomplete popup is annoying
                type: 'search', value: search, onChange: (e) => onSearch(e.target.value), onKeyPress: handleKeyPress }) })) }));
};
