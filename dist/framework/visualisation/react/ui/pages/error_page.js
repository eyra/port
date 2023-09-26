import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Footer } from './templates/footer';
import { Page } from './templates/page';
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
import { BodyLarge, Title1 } from '../elements/text';
export const ErrorPage = (props) => {
    window.scrollTo(0, 0);
    const { stacktrace } = props;
    const { title, text } = prepareCopy(props);
    const footer = _jsx(Footer, {});
    const sidebar = _jsx(_Fragment, { children: " " });
    const body = (_jsxs(_Fragment, { children: [_jsx(Title1, { text: title }), _jsx(BodyLarge, { text: text }), _jsx(BodyLarge, { text: stacktrace })] }));
    return (_jsx(Page, { sidebar: sidebar, body: body, footer: footer }));
};
function prepareCopy({ locale }) {
    return {
        title: Translator.translate(title, locale),
        text: Translator.translate(text, locale)
    };
}
const title = new TextBundle()
    .add('en', 'Error, not your fault!')
    .add('nl', 'Foutje, niet jouw schuld!');
const text = new TextBundle()
    .add('en', 'Consult the researcher, or close the page')
    .add('nl', 'Raadpleeg de onderzoeker of sluit de pagina');
