import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CheckSvg from '../../../../../assets/images/check.svg';
import CheckActiveSvg from '../../../../../assets/images/check_active.svg';
export const CheckBox = ({ id, selected, size = 'w-6 h-6', onSelect }) => {
    return (_jsx("div", Object.assign({ id: id, className: 'radio-item flex flex-row gap-3 cursor-pointer', onClick: onSelect }, { children: _jsxs("div", Object.assign({ className: `flex-shrink-0  ${size}` }, { children: [_jsx("img", { src: CheckSvg, id: `${id}-off`, className: `w-full h-full ${selected ? 'hidden' : ''}` }), _jsx("img", { src: CheckActiveSvg, id: `${id}-on`, className: `w-full h-full ${selected ? '' : 'hidden'}` })] })) })));
};
