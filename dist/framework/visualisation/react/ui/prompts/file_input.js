import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
import { PrimaryButton } from '../elements/button';
import { BodyLarge, BodySmall } from '../elements/text';
export const FileInput = (props) => {
    var _a;
    const [waiting, setWaiting] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState();
    const input = React.useRef(null);
    const { resolve } = props;
    const { description, note, placeholder, extensions, selectButton, continueButton } = prepareCopy(props);
    function handleClick() {
        var _a;
        (_a = input.current) === null || _a === void 0 ? void 0 : _a.click();
    }
    function handleSelect(event) {
        const files = event.target.files;
        if (files != null && files.length > 0) {
            setSelectedFile(files[0]);
        }
        else {
            console.log('[FileInput] Error selecting file: ' + JSON.stringify(files));
        }
    }
    function handleConfirm() {
        if (selectedFile !== undefined && !waiting) {
            setWaiting(true);
            resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadFile', value: selectedFile });
        }
    }
    return (_jsx(_Fragment, { children: _jsxs("div", Object.assign({ id: 'select-panel', className: 'max-w-3xl' }, { children: [_jsx("div", Object.assign({ className: 'flex-wrap text-bodylarge font-body text-grey1 text-left' }, { children: description })), _jsx("div", { className: 'mt-8' }), _jsxs("div", Object.assign({ className: 'p-6 border-grey4 border-2 rounded' }, { children: [_jsx("input", { ref: input, id: 'input', type: 'file', className: 'hidden', accept: extensions, onChange: handleSelect }), _jsxs("div", Object.assign({ className: 'flex flex-row gap-4 items-center' }, { children: [_jsx(BodyLarge, { text: (_a = selectedFile === null || selectedFile === void 0 ? void 0 : selectedFile.name) !== null && _a !== void 0 ? _a : placeholder, margin: '', color: selectedFile === undefined ? 'text-grey2' : 'textgrey1' }), _jsx("div", { className: 'flex-grow' }), _jsx(PrimaryButton, { onClick: handleClick, label: selectButton, color: 'bg-tertiary text-grey1' })] }))] })), _jsx("div", { className: 'mt-4' }), _jsxs("div", Object.assign({ className: `${selectedFile === undefined ? 'opacity-30' : 'opacity-100'}` }, { children: [_jsx(BodySmall, { text: note, margin: '' }), _jsx("div", { className: 'mt-8' }), _jsx("div", Object.assign({ className: 'flex flex-row gap-4' }, { children: _jsx(PrimaryButton, { label: continueButton, onClick: handleConfirm, enabled: selectedFile !== undefined, spinning: waiting }) }))] }))] })) }));
};
function prepareCopy({ description, extensions, locale }) {
    return {
        description: Translator.translate(description, locale),
        note: Translator.translate(note(), locale),
        placeholder: Translator.translate(placeholder(), locale),
        extensions: extensions,
        selectButton: Translator.translate(selectButtonLabel(), locale),
        continueButton: Translator.translate(continueButtonLabel(), locale)
    };
}
const continueButtonLabel = () => {
    return new TextBundle().add('en', 'Continue').add('nl', 'Verder');
};
const selectButtonLabel = () => {
    return new TextBundle().add('en', 'Choose file').add('nl', 'Kies bestand');
};
const note = () => {
    return new TextBundle()
        .add('en', 'Note: The process to extract the correct data from the file is done on your own computer. No data is stored or sent yet.')
        .add('nl', 'NB: Het proces om de juiste gegevens uit het bestand te halen gebeurt op uw eigen computer. Er worden nog geen gegevens opgeslagen of verstuurd.');
};
const placeholder = () => {
    return new TextBundle().add('en', 'Choose a file').add('nl', 'Kies een bestand');
};
