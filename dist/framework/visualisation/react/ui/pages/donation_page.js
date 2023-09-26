import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
import { isPropsUIPromptConfirm, isPropsUIPromptConsentForm, isPropsUIPromptFileInput, isPropsUIPromptRadioInput, isPropsUIPromptQuestionnaire } from '../../../../types/prompts';
import { ForwardButton } from '../elements/button';
import { Title1 } from '../elements/text';
import { Confirm } from '../prompts/confirm';
import { ConsentForm } from '../prompts/consent_form';
import { FileInput } from '../prompts/file_input';
import { Questionnaire } from '../prompts/questionnaire';
import { RadioInput } from '../prompts/radio_input';
import { Footer } from './templates/footer';
// import { Sidebar } from './templates/sidebar'
// import LogoSvg from '../../../../../assets/images/logo.svg'
import { Page } from './templates/page';
import { Progress } from '../elements/progress';
export const DonationPage = (props) => {
    const { title, forwardButton } = prepareCopy(props);
    // const { platform, locale, resolve } = props
    const { locale, resolve } = props;
    function renderBody(props) {
        const context = { locale: locale, resolve: props.resolve };
        const body = props.body;
        if (isPropsUIPromptFileInput(body)) {
            return _jsx(FileInput, Object.assign({}, body, context));
        }
        if (isPropsUIPromptConfirm(body)) {
            return _jsx(Confirm, Object.assign({}, body, context));
        }
        if (isPropsUIPromptConsentForm(body)) {
            return _jsx(ConsentForm, Object.assign({}, body, context));
        }
        if (isPropsUIPromptRadioInput(body)) {
            return _jsx(RadioInput, Object.assign({}, body, context));
        }
        if (isPropsUIPromptQuestionnaire(body)) {
            return _jsx(Questionnaire, Object.assign({}, body, context));
        }
        throw new TypeError('Unknown body type');
    }
    function handleSkip() {
        resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadFalse', value: false });
    }
    const footer = (_jsx(Footer, { middle: _jsx(Progress, { percentage: props.footer.progressPercentage }), right: _jsxs("div", Object.assign({ className: 'flex flex-row' }, { children: [_jsx("div", { className: 'flex-grow' }), _jsx(ForwardButton, { label: forwardButton, onClick: handleSkip })] })) }));
    // COMMENT BY NIEK: I TURNED OFF THE SIDEBAR (UGLY)
    // const sidebar: JSX.Element = (
    //  <Sidebar
    //    logo={LogoSvg}
    //    content={
    //      <Instructions platform={platform} locale={locale} />
    //    }
    //  />
    // )
    // COMMENT BY KASPER: MADE SIDEBAR OPTIONAL IN <Page /> COMPONENT,
    // SO THAT IT DOESN'T AFFECT THE LAYOUT OF THE PAGE
    // const sidebar: JSX.Element = <></>
    const body = (_jsxs(_Fragment, { children: [_jsx(Title1, { text: title }), renderBody(props)] }));
    return _jsx(Page, { body: body, footer: footer });
};
function prepareCopy({ header: { title }, locale }) {
    return {
        title: Translator.translate(title, locale),
        forwardButton: Translator.translate(forwardButtonLabel(), locale)
    };
}
const forwardButtonLabel = () => {
    return new TextBundle().add('en', 'Skip').add('nl', 'Overslaan');
};
