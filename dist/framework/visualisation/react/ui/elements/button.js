import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import BackSvg from '../../../../../assets/images/back.svg';
import ForwardSvg from '../../../../../assets/images/forward.svg';
import { Spinner } from './spinner';
function spinnerColor(buttonColor) {
    if (buttonColor.includes('bg-tertiary')) {
        return 'dark';
    }
    return 'light';
}
export const PrimaryButton = ({ label, spinning = false, enabled = true, color = 'bg-primary text-white', onClick }) => {
    return (_jsxs("div", Object.assign({ className: 'relative min-w-button' }, { children: [_jsx("div", Object.assign({ className: `flex flex-col items-center leading-none font-button text-button rounded ${enabled ? 'cursor-pointer active:shadow-top4px' : ''} ${color}`, onClick: onClick }, { children: _jsx("div", Object.assign({ id: 'confirm-button', className: `pt-15px pb-15px pr-4 pl-4 ${enabled ? 'active:pt-4 active:pb-14px' : ''} ${spinning ? 'opacity-0' : ''}` }, { children: label })) })), _jsx("div", Object.assign({ className: `absolute top-0 h-full w-full flex flex-col justify-center items-center ${spinning ? '' : 'hidden'}` }, { children: _jsx("div", Object.assign({ className: 'w-5 h-5' }, { children: _jsx(Spinner, { color: spinnerColor(color), spinning: spinning }) })) }))] })));
};
export const SecondaryButton = ({ label, color = 'bg-delete text-delete', onClick }) => {
    return (_jsx("div", Object.assign({ className: 'relative min-w-button' }, { children: _jsx("div", Object.assign({ className: `flex flex-col items-center active:shadow-top2px border-2 font-button text-button rounded bg-opacity-0 cursor-pointer ${color}`, onClick: onClick }, { children: _jsx("div", Object.assign({ className: 'pt-13px pb-13px pr-4 pl-4 active:pt-14px active:pb-3' }, { children: label })) })) })));
};
export const BackButton = ({ label, onClick }) => {
    return _jsx(IconLabelButton, { icon: BackSvg, label: label, onClick: onClick });
};
export const ForwardButton = ({ label, onClick }) => {
    return _jsx(IconLabelButton, { icon: ForwardSvg, label: label, onClick: onClick, alignment: 'right' });
};
export const BackIconButton = ({ onClick }) => {
    return _jsx(IconButton, { icon: BackSvg, onClick: onClick });
};
export const ForwardIconButton = ({ onClick }) => {
    return _jsx(IconButton, { icon: ForwardSvg, onClick: onClick });
};
export const IconButton = ({ icon, onClick }) => {
    return (_jsx("div", Object.assign({ className: 'active:pt-5px active:pb-3px focus:outline-none cursor-pointer w-6 h-6', onClick: onClick }, { children: _jsxs("div", Object.assign({ className: 'flex flex-col items-center h-full w-full' }, { children: [_jsx("div", { className: 'flex-grow' }), _jsx("div", { children: _jsx("img", { className: '-mt-2px', src: icon }) }), _jsx("div", { className: 'flex-grow' })] })) })));
};
export const IconLabelButton = ({ icon, label, color = 'text-grey1', alignment = 'left', onClick }) => {
    return (_jsx("div", Object.assign({ className: 'pt-1 pb-1 active:pt-5px active:pb-3px rounded bg-opacity-0 focus:outline-none cursor-pointer ', onClick: onClick }, { children: _jsxs("div", Object.assign({ className: 'flex items-center' }, { children: [_jsx("div", Object.assign({ className: `${alignment === 'left' ? '' : 'hidden'}` }, { children: _jsx("img", { className: 'mr-2 -mt-2px', src: icon, alt: label }) })), _jsx("div", Object.assign({ className: 'focus:outline-none' }, { children: _jsx("div", Object.assign({ className: 'flex flex-col justify-center h-full items-center' }, { children: _jsx("div", Object.assign({ className: `flex-wrap text-button font-button ${color}` }, { children: label })) })) })), _jsx("div", Object.assign({ className: `${alignment !== 'left' ? '' : 'hidden'}` }, { children: _jsx("img", { className: 'ml-2 -mt-2px', src: icon, alt: label }) }))] })) })));
};
export const LabelButton = ({ label, color = 'text-grey1', onClick }) => {
    return (_jsx("div", Object.assign({ className: `pt-15px pb-15px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 cursor-pointer bg-opacity-0 ${color}`, onClick: onClick }, { children: _jsx("div", Object.assign({ id: 'confirm-button', className: 'flex-wrap' }, { children: label })) })));
};
