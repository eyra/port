import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
import { RadioItem } from '../elements/radio_item';
function prepareCopy({ title, description, locale }) {
    return {
        title: Translator.translate(title, locale),
        description: Translator.translate(description, locale),
        continueButton: Translator.translate(continueButtonLabel(), locale)
    };
}
export const RadioInput = (props) => {
    const [selectedId, setSelectedId] = React.useState(-1);
    const [confirmHidden, setConfirmHidden] = React.useState(true);
    const { items, resolve } = props;
    const { title, description, continueButton } = prepareCopy(props);
    function handleSelect(id) {
        setSelectedId(id);
        setConfirmHidden(false);
    }
    function handleConfirm() {
        const item = items.at(selectedId);
        if (item !== undefined) {
            resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadString', value: item.value });
        }
    }
    function renderItems(items) {
        return items.map((item, index) => _jsx(RadioItem, { onSelect: () => handleSelect(index), id: index, value: item.value, selected: selectedId === index }, index));
    }
    return (_jsxs(_Fragment, { children: [_jsx("div", Object.assign({ className: 'text-title5 font-title5 sm:text-title4 sm:font-title4 lg:text-title3 lg:font-title3 text-grey1' }, { children: title })), _jsx("div", { className: 'mt-8' }), _jsxs("div", Object.assign({ id: 'select-panel' }, { children: [_jsx("div", Object.assign({ className: 'flex-wrap text-bodylarge font-body text-grey1 text-left' }, { children: description })), _jsx("div", { className: 'mt-4' }), _jsx("div", { children: _jsx("div", Object.assign({ id: 'radio-group', className: 'flex flex-col gap-3' }, { children: renderItems(items) })) })] })), _jsx("div", { className: 'mt-8' }), _jsx("div", Object.assign({ className: `flex flex-row ${confirmHidden ? 'hidden' : ''}` }, { children: _jsx("div", Object.assign({ className: 'pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 bg-primary text-white cursor-pointer', onClick: handleConfirm }, { children: _jsx("div", Object.assign({ id: 'confirm-button', className: 'flex-wrap' }, { children: continueButton })) })) }))] }));
};
const continueButtonLabel = () => {
    return new TextBundle()
        .add('en', 'Continue')
        .add('nl', 'Doorgaan');
};
