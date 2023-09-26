import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Translator } from '../../../../translator';
import { Title3 } from './text';
export const MultipleChoiceQuestionCheckbox = (props) => {
    const { question, choices, id, parentSetter, locale } = props;
    const [selectedChoices, setSelectedChoices] = React.useState([]);
    const copy = prepareCopy(locale);
    const setParentState = () => {
        parentSetter((prevState) => {
            prevState[id] = selectedChoices;
            return prevState;
        });
    };
    React.useEffect(() => {
        setParentState();
    });
    const handleChoiceSelect = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedChoices((prevSelectedChoices) => [
                ...prevSelectedChoices,
                value
            ]);
        }
        else {
            setSelectedChoices((prevSelectedChoices) => prevSelectedChoices.filter((choice) => choice !== value));
        }
    };
    return (_jsxs("div", Object.assign({ className: 'p-4' }, { children: [_jsx(Title3, { text: copy.question }), _jsx("ul", Object.assign({ className: 'mt-4 space-y-1' }, { children: copy.choices.map((choice, index) => (_jsx("li", { children: _jsxs("label", Object.assign({ className: 'flex items-center' }, { children: [_jsx("input", { type: 'checkbox', name: 'choice', value: choice, checked: selectedChoices.includes(choice), onChange: handleChoiceSelect, className: 'mr-1 form-checkbox' }), choice] })) }, index))) }))] })));
    function prepareCopy(locale) {
        return {
            choices: choices.map((choice) => Translator.translate(choice, locale)),
            question: Translator.translate(question, locale)
        };
    }
};
