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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CheckSvg from '../../../../../assets/images/check.svg';
import CheckActiveSvg from '../../../../../assets/images/check_active.svg';
export var CheckBox = function (_a) {
    var id = _a.id, selected = _a.selected, onSelect = _a.onSelect;
    return (_jsx("div", __assign({ id: id, className: 'radio-item flex flex-row gap-3 items-center cursor-pointer', onClick: onSelect }, { children: _jsxs("div", __assign({ className: 'flex-shrink-0' }, { children: [_jsx("img", { src: CheckSvg, id: "".concat(id, "-off"), className: selected ? 'hidden' : '' }), _jsx("img", { src: CheckActiveSvg, id: "".concat(id, "-on"), className: selected ? '' : 'hidden' })] })) })));
};
