import { jsx as _jsx } from "react/jsx-runtime";
import { Translator } from '../../../../translator';
import { Title1 } from './text';
function prepareCopy(_a) {
    var title = _a.title, locale = _a.locale;
    return {
        title: Translator.translate(title, locale)
    };
}
export var Header = function (props) {
    var title = prepareCopy(props).title;
    return (_jsx(Title1, { text: title }));
};
