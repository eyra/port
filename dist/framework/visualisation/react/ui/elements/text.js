import { jsx as _jsx } from "react/jsx-runtime";
export const BodyLarge = ({ text, color = 'text-grey1', margin = 'mb-6 md:mb-8 lg:mb-10' }) => {
    return (_jsx("div", Object.assign({ className: `text-bodylarge font-body ${color} ${margin}` }, { children: text })));
};
export const BodyMedium = ({ text, color = 'text-grey1', margin = 'mb-6 md:mb-8 lg:mb-10' }) => {
    return (_jsx("div", Object.assign({ className: `text-bodymedium font-body ${color} ${margin}` }, { children: text })));
};
export const BodySmall = ({ text, color = 'text-grey1', margin = '' }) => {
    return (_jsx("div", Object.assign({ className: `text-bodysmall font-body ${color} ${margin}` }, { children: text })));
};
export const Title0 = ({ text, color = 'text-grey1', margin = 'mb-6 md:mb-8 lg:mb-10' }) => {
    return (_jsx("div", Object.assign({ className: `text-title4 font-title4 sm:text-title2 sm:font-title2 lg:text-title0 lg:font-title0 ${color} ${margin}` }, { children: text })));
};
export const Title1 = ({ text, color = 'text-grey1', margin = 'mb-6 md:mb-8' }) => {
    return (_jsx("div", Object.assign({ className: `text-title3 font-title3 sm:text-title2 lg:text-title1 lg:font-title1 ${color} ${margin}` }, { children: text })));
};
export const Title2 = ({ text, color = 'text-grey1', margin = 'mb-6 md:mb-8 lg:mb-10' }) => {
    return (_jsx("div", Object.assign({ className: `text-title4 font-title4 sm:text-title3 sm:font-title3 lg:text-title2 lg:font-title2 ${color} ${margin}` }, { children: text })));
};
export const Title3 = ({ text, color = 'text-grey1', margin = 'mb-3 md:mb-5 lg:mb-6' }) => {
    return (_jsx("div", Object.assign({ className: `text-title5 font-title5 sm:text-title4 sm:font-title4 lg:text-title3 lg:font-title3 ${color} ${margin}` }, { children: text })));
};
export const Title4 = ({ text, color = 'text-grey1', margin = 'mb-3 md:mb-5 lg:mb-6' }) => {
    return (_jsx("div", Object.assign({ className: `text-title6 font-title6 sm:text-title5 sm:font-title5 lg:text-title4 lg:font-title4 ${color} ${margin}` }, { children: text })));
};
export const Title6 = ({ text, color = 'text-grey1', margin = 'mb-2' }) => {
    return (_jsx("div", Object.assign({ className: `text-title6 font-title6 ${margin} ${color}` }, { children: text })));
};
export const Label = ({ text, color = 'text-grey1', margin = '' }) => {
    return (_jsx("div", Object.assign({ className: `text-label font-label ${color} ${margin}` }, { children: text })));
};
export const Caption = ({ text, color = 'text-grey1', margin = '' }) => {
    return (_jsx("div", Object.assign({ className: `text-caption font-caption ${color} ${margin}` }, { children: text })));
};
