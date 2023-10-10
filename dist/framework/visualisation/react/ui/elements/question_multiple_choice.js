import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Translator } from '../../../../translator';
import { Title3 } from './text';
export const MultipleChoiceQuestion = (props) => {
    const { question, choices, id, parentSetter, locale } = props;
    const [selectedChoice, setSelectedChoice] = React.useState('');
    const [checkedArray, setCheckedArray] = React.useState(Array(choices.length).fill(false));
    const copy = prepareCopy(locale);
    const handleChoiceSelect = (choice, index) => {
        setSelectedChoice(choice);
        setCheckedArray(Array.from({ length: choices.length }, (_, i) => i === index));
    };
    const setParentState = () => {
        parentSetter((prevState) => {
            prevState[id] = selectedChoice;
            return prevState;
        });
    };
    React.useEffect(() => {
        setParentState();
    });
    return (_jsxs("div", Object.assign({ className: 'p-4' }, { children: [_jsx(Title3, { text: copy.question }), _jsx("ul", Object.assign({ className: 'mt-4 space-y-1' }, { children: copy.choices.map((choice, index) => (_jsxs("li", { children: [_jsx("label", Object.assign({ className: 'inline-flex items-center' }, { children: _jsx("input", { type: 'radio', name: `${index}-${id}`, value: choice, checked: checkedArray.at(index), onChange: () => handleChoiceSelect(choice, index), className: 'mr-1 form-radio' }) })), choice] }, index))) }))] })));
    function prepareCopy(locale) {
        return {
            choices: choices.map((choice) => Translator.translate(choice, locale)),
            question: Translator.translate(question, locale)
        };
    }
};
