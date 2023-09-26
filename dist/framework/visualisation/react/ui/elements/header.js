import { jsx as _jsx } from "react/jsx-runtime";
import { Translator } from '../../../../translator';
import { Title1 } from './text';
function prepareCopy({ title, locale }) {
    return {
        title: Translator.translate(title, locale)
    };
}
export const Header = (props) => {
    const { title } = prepareCopy(props);
    return (_jsx(Title1, { text: title }));
};
