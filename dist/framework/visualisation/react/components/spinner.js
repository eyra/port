import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Translatable from '../../../translatable';
import SpinnerSvg from '../../../../assets/images/spinner.svg';
function prepareCopy({ texts, locale }) {
    return {
        text: texts.text(locale)
    };
}
const texts = () => {
    return new Translatable()
        .add('en', 'One moment please')
        .add('nl', 'Een moment geduld');
};
export const SpinnerFactory = (props) => _jsx(Spinner, { ...props });
export const Spinner = (props) => {
    const { text } = prepareCopy({ texts: texts(), ...props });
    return (_jsxs("div", { id: 'spinner', className: 'flex flex-row items-center gap-4', children: [_jsx("div", { className: 'font-body text-bodymedium text-grey1', children: text }), _jsx("div", { className: 'w-10 h-10', children: _jsx("img", { src: SpinnerSvg }) })] }));
};
