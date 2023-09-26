import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import RadioSvg from '../../../../../assets/images/radio.svg';
import RadioActiveSvg from '../../../../../assets/images/radio_active.svg';
export const RadioItem = ({ id, value, selected, onSelect }) => {
    return (_jsxs("div", Object.assign({ id: `${id}`, className: 'radio-item flex flex-row gap-3 items-center cursor-pointer', onClick: onSelect }, { children: [_jsxs("div", { children: [_jsx("img", { src: RadioSvg, id: `${id}-off`, className: selected ? 'hidden' : '' }), _jsx("img", { src: RadioActiveSvg, id: `${id}-on`, className: selected ? '' : 'hidden' })] }), _jsx("div", Object.assign({ className: 'text-grey1 text-label font-label select-none mt-1' }, { children: value }))] })));
};
