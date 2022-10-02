import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import Translatable from '../../../translatable';
import RadioSvg from '../../../../assets/images/radio.svg';
import RadioActiveSvg from '../../../../assets/images/radio_active.svg';
function prepareCopy({ title, description, locale }) {
    return {
        title: title.en,
        description: description.en,
        continueButton: continueButtonLabel().text(locale)
    };
}
export const RadioInputFactory = (props) => _jsx(RadioInput, { ...props });
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
        const value = items.at(selectedId);
        resolve(value);
    }
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: 'text-title5 font-title5 sm:text-title4 sm:font-title4 lg:text-title3 lg:font-title3 text-grey1', children: title }), _jsx("div", { className: 'mt-8' }), _jsxs("div", { id: 'select-panel', children: [_jsx("div", { className: 'flex-wrap text-bodylarge font-body text-grey1 text-left', children: description }), _jsx("div", { className: 'mt-4' }), _jsx("div", { children: _jsx("div", { id: 'radio-group', className: 'flex flex-col gap-3', children: items.map((value, index) => _jsx(RadioItem, { onSelect: handleSelect, id: index, value: value, selected: selectedId === index }, index)) }) })] }), _jsx("div", { className: 'mt-8' }), _jsx("div", { className: `flex flex-row ${confirmHidden ? 'hidden' : ''}`, children: _jsx("div", { className: 'pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 bg-primary text-white cursor-pointer', onClick: handleConfirm, children: _jsx("div", { id: 'confirm-button', className: 'flex-wrap', children: continueButton }) }) })] }));
};
const continueButtonLabel = () => {
    return new Translatable()
        .add('en', 'Continue')
        .add('nl', 'Doorgaan');
};
export const RadioItem = ({ id, value, selected, onSelect }) => {
    return (_jsxs("div", { id: `${id}`, className: 'radio-item flex flex-row gap-3 items-center cursor-pointer', onClick: () => onSelect(id), children: [_jsxs("div", { children: [_jsx("img", { src: RadioSvg, id: `${id}-off`, className: selected ? 'hidden' : '' }), _jsx("img", { src: RadioActiveSvg, id: `${id}-on`, className: selected ? '' : 'hidden' })] }), _jsx("div", { className: 'text-grey1 text-label font-label select-none mt-1', children: value })] }));
};
