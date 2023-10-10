import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import TextBundle from '../../../../text_bundle';
import { PrimaryButton } from '../elements/button';
import { Translator } from '../../../../translator';
import { isPropsUIQuestionMultipleChoice, isPropsUIQuestionMultipleChoiceCheckbox, isPropsUIQuestionOpen } from '../../../../types/elements';
import { MultipleChoiceQuestion } from '../../ui/elements/question_multiple_choice';
import { MultipleChoiceQuestionCheckbox } from '../../ui/elements/question_multiple_choice_checkbox';
import { OpenQuestion } from '../../ui/elements/question_open';
export const Questionnaire = (props) => {
    const { questions, description, resolve, locale } = props;
    const [answers, setAnswers] = React.useState({});
    const copy = prepareCopy(locale);
    function handleDonate() {
        const value = JSON.stringify(answers);
        resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadJSON', value });
    }
    // Still here in case case we need a cancel button click event handler
    // function handleCancel (): void {
    //   resolve?.({ __type__: 'PayloadFalse', value: false })
    // }
    const renderQuestion = (item) => {
        if (isPropsUIQuestionMultipleChoice(item)) {
            return (_jsx("div", { children: _jsx(MultipleChoiceQuestion, Object.assign({}, item, { locale: locale, parentSetter: setAnswers })) }, item.id));
        }
        if (isPropsUIQuestionMultipleChoiceCheckbox(item)) {
            return (_jsx("div", { children: _jsx(MultipleChoiceQuestionCheckbox, Object.assign({}, item, { locale: locale, parentSetter: setAnswers })) }, item.id));
        }
        if (isPropsUIQuestionOpen(item)) {
            return (_jsx("div", { children: _jsx(OpenQuestion, Object.assign({}, item, { locale: locale, parentSetter: setAnswers })) }, item.id));
        }
        else {
            return (_jsx("div", {}));
        }
    };
    const renderQuestions = () => {
        return questions.map((item) => renderQuestion(item));
    };
    return (_jsxs("div", { children: [_jsx("div", Object.assign({ className: 'flex-wrap text-bodylarge font-body text-grey1 text-left' }, { children: copy.description })), _jsx("div", { children: renderQuestions() }), _jsx("div", Object.assign({ className: 'flex flex-row gap-4 mt-4 mb-4' }, { children: _jsx(PrimaryButton, { label: copy.continueLabel, onClick: handleDonate, color: 'bg-success text-white' }) }))] }));
    function prepareCopy(locale) {
        return {
            description: Translator.translate(description, locale),
            continueLabel: Translator.translate(continueLabel, locale)
        };
    }
};
const continueLabel = new TextBundle()
    .add('en', 'Continue')
    .add('nl', 'Verder');
