import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import Translatable from '../../../translatable';
function prepareCopy({ title, description, extensions, locale }) {
    return {
        title: title.en,
        description: description.en,
        extensions: extensions,
        selectButton: selectButtonLabel().text(locale),
        continueButton: continueButtonLabel().text(locale),
        resetButton: resetButtonLabel().text(locale)
    };
}
export const FileInputFactory = (props) => _jsx(FileInput, { ...props });
const FileInput = (props) => {
    const [selectedFile, setSelectedFile] = React.useState();
    const [confirmHidden, setConfirmHidden] = React.useState(true);
    const input = React.useRef(null);
    const { resolve } = props;
    const { title, description, extensions, selectButton, continueButton, resetButton } = prepareCopy(props);
    function handleClick() {
        input.current?.click();
    }
    function handleReset() {
        handleClick();
    }
    function handleSelect(event) {
        const files = event.target.files;
        if (files != null && files.length > 0) {
            setSelectedFile(files[0]);
            setConfirmHidden(false);
        }
    }
    function handleConfirm() {
        resolve(selectedFile);
    }
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: 'text-title5 font-title5 sm:text-title4 sm:font-title4 lg:text-title3 lg:font-title3 text-grey1', children: title }), _jsx("div", { className: 'mt-8' }), _jsxs("div", { id: 'select-panel', children: [_jsx("div", { className: 'flex-wrap text-bodylarge font-body text-grey1 text-left', children: description }), _jsx("div", { className: 'mt-8' }), _jsx("div", { className: 'flex flex-row', children: _jsx("div", { className: 'flex-wrap cursor-pointer', children: _jsx("div", { id: 'select-button', className: 'pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 bg-primary text-white', onClick: handleClick, children: selectButton }) }) }), _jsx("input", { ref: input, id: 'input', type: 'file', className: 'hidden', accept: extensions, onChange: handleSelect }), _jsx("div", { className: 'mt-8' })] }), _jsxs("div", { id: 'confirm-panel', className: confirmHidden ? 'hidden' : '', children: [_jsx("div", { className: 'flex flex-row', children: _jsx("div", { className: 'flex-wrap bg-grey5 rounded', children: _jsx("div", { className: 'flex flex-row h-14 px-5 items-center', children: _jsx("div", { id: 'selected-filename', className: 'flex-wrap text-subhead font-subhead text-grey1', children: selectedFile?.name }) }) }) }), _jsx("div", { className: 'mt-8' }), _jsx("div", { className: 'text-bodylarge font-body text-grey1 text-left', children: "Continue with the selected file, or select again?" }), _jsx("div", { className: 'mt-4' }), _jsxs("div", { className: 'flex flex-row gap-4', children: [_jsx("div", { id: 'confirm-button', className: 'flex-wrap cursor-pointer', children: _jsx("div", { className: 'pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 bg-primary text-white', onClick: handleConfirm, children: continueButton }) }), _jsx("div", { id: 'reset-button', className: 'flex-wrap cursor-pointer', children: _jsx("div", { className: 'pt-13px pb-13px active:pt-14px active:pb-3 active:shadow-top2px border-2 font-button text-button rounded bg-opacity-0 pr-4 pl-4 bg-delete text-delete', onClick: handleReset, children: resetButton }) })] })] })] }));
};
const continueButtonLabel = () => {
    return new Translatable()
        .add('en', 'Continue')
        .add('nl', 'Doorgaan');
};
const selectButtonLabel = () => {
    return new Translatable()
        .add('en', 'Select file')
        .add('nl', 'Selecteer bestand');
};
const resetButtonLabel = () => {
    return new Translatable()
        .add('en', 'Select again')
        .add('nl', 'Opnieuw');
};
