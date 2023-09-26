import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Footer } from './templates/footer';
import { Sidebar } from './templates/sidebar';
import LogoSvg from '../../../../../assets/images/logo.svg';
import { Page } from './templates/page';
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
import { BodyLarge, Title1 } from '../elements/text';
export const EndPage = (props) => {
    const { title, text } = prepareCopy(props);
    const footer = _jsx(Footer, {});
    const sidebar = _jsx(Sidebar, { logo: LogoSvg });
    const body = (_jsxs(_Fragment, { children: [_jsx(Title1, { text: title }), _jsx(BodyLarge, { text: text })] }));
    return (_jsx(Page, { body: body, sidebar: sidebar, footer: footer }));
};
function prepareCopy({ locale }) {
    return {
        title: Translator.translate(title, locale),
        text: Translator.translate(text, locale)
    };
}
const title = new TextBundle()
    .add('en', 'Thank you')
    .add('nl', 'Bedankt');
const text = new TextBundle()
    .add('en', 'Thank you for your participation. You can now close the page or refresh to restart the donation flow.')
    .add('nl', 'Hartelijk dank voor uw deelname. U kunt deze pagina nu sluiten of de pagina verversen om de flow nogmaals te doorlopen.');
