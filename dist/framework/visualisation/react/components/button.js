import { jsx as _jsx } from "react/jsx-runtime";
export const PrimaryButtonFactory = (props) => _jsx(PrimaryButton, { ...props });
export const PrimaryButton = ({ label, color = 'bg-primary text-white', onClick }) => {
    return (_jsx("div", { className: `pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 cursor-pointer ${color}`, onClick: onClick, children: _jsx("div", { id: 'confirm-button', className: 'flex-wrap', children: label }) }));
};
export const SecondaryButtonFactory = (props) => _jsx(SecondaryButton, { ...props });
export const SecondaryButton = ({ label, color = 'bg-delete text-delete', onClick }) => {
    return (_jsx("div", { className: `pt-13px pb-13px active:pt-14px active:pb-3 active:shadow-top2px border-2 font-button text-button rounded bg-opacity-0 pr-4 pl-4 ${color}`, onClick: onClick, children: _jsx("div", { className: 'flex-wrap', children: label }) }));
};
