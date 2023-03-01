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
import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import _ from 'lodash';
export var SearchBar = function (_a) {
    var placeholder = _a.placeholder, _b = _a.debounce, debounce = _b === void 0 ? 1000 : _b, onSearch = _a.onSearch;
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }
    function handleChange(event) {
        var words = event.target.value.split(/\s+/);
        onSearch(words);
    }
    var handleChangeDebounced = useMemo(function () { return _.debounce(handleChange, 300); }, []);
    return (_jsx("form", { children: _jsx("div", __assign({ className: 'flex flex-row' }, { children: _jsx("input", { className: 'text-grey1 text-bodymedium font-body pl-3 pr-3 w-full border-2 border-solid border-grey3 focus:outline-none focus:border-primary rounded h-48px', placeholder: placeholder, name: 'query', type: 'search', onChange: handleChangeDebounced, onKeyPress: handleKeyPress }) })) }));
};
