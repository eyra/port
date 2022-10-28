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
import RadioSvg from '../../../../../assets/images/radio.svg';
import RadioActiveSvg from '../../../../../assets/images/radio_active.svg';
export var RadioItem = function (_a) {
    var id = _a.id, value = _a.value, selected = _a.selected, onSelect = _a.onSelect;
    return (_jsxs("div", __assign({ id: "".concat(id), className: 'radio-item flex flex-row gap-3 items-center cursor-pointer', onClick: onSelect }, { children: [_jsxs("div", { children: [_jsx("img", { src: RadioSvg, id: "".concat(id, "-off"), className: selected ? 'hidden' : '' }), _jsx("img", { src: RadioActiveSvg, id: "".concat(id, "-on"), className: selected ? '' : 'hidden' })] }), _jsx("div", __assign({ className: 'text-grey1 text-label font-label select-none mt-1' }, { children: value }))] })));
};
