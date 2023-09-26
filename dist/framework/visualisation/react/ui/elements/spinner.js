import { jsx as _jsx } from "react/jsx-runtime";
import Lottie from 'lottie-react';
import spinnerLight from '../../../../../assets/lottie/spinner-light.json';
import spinnerDark from '../../../../../assets/lottie/spinner-dark.json';
export const Spinner = ({ spinning = true, color = 'light' }) => {
    function animationData() {
        if (color === 'dark') {
            return spinnerDark;
        }
        return spinnerLight;
    }
    return (_jsx("div", Object.assign({ id: 'spinner', className: 'flex flex-row items-center gap-4' }, { children: _jsx("div", Object.assign({ className: 'w-5 h-5' }, { children: _jsx(Lottie, { animationData: animationData(), loop: spinning }) })) })));
};
