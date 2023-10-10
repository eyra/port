import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Translator } from '../../../../translator';
import { Title3 } from './text';
export const OpenQuestion = (props) => {
    const { question, id, parentSetter, locale } = props;
    const [userAnswer, setUserAnswer] = React.useState('');
    const copy = prepareCopy(locale);
    const handleInputChange = (event) => {
        setUserAnswer(event.target.value);
    };
    const setParentState = () => {
        parentSetter((prevState) => {
            prevState[id] = userAnswer;
            return prevState;
        });
    };
    React.useEffect(() => {
        setParentState();
    });
    return (_jsxs("div", Object.assign({ className: 'p-4' }, { children: [_jsx(Title3, { text: copy.question }), _jsx("input", { type: 'text', value: userAnswer, onChange: handleInputChange, className: 'w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md resize-none h-16' })] })));
    function prepareCopy(locale) {
        return {
            question: Translator.translate(question, locale)
        };
    }
};
