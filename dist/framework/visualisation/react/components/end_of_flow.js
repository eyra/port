import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Translatable from '../../../translatable';
import { Table } from './table';
import { PrimaryButton, SecondaryButton } from './button';
import { Title2 } from './text';
function prepareCopy({ locale }) {
    return {
        donateButton: donateButtonLabel().text(locale),
        declineButton: declineButtonLabel().text(locale)
    };
}
const donateButtonLabel = () => {
    return new Translatable()
        .add('en', 'Yes, donate')
        .add('nl', 'Ja, doneer');
};
const declineButtonLabel = () => {
    return new Translatable()
        .add('en', 'No')
        .add('nl', 'Nee');
};
export const EndOfFlowFactory = (props) => _jsx(EndOfFlow, { ...props });
export const EndOfFlow = (props) => {
    const { title, data, resolve } = props;
    const { donateButton, declineButton } = prepareCopy(props);
    function handleDonate() {
        resolve(JSON.stringify(data));
    }
    function handleDecline() {
        resolve(false);
    }
    function renderTable(table) {
        const id = table.id;
        const dataFrame = JSON.parse(table.data_frame);
        const rowCount = Object.keys(dataFrame).length;
        const header = { cells: Object.keys(dataFrame) };
        const rows = [];
        for (let i = 0; i <= rowCount; i++) {
            const cells = Object.keys(dataFrame).map((column) => dataFrame[column][`${i}`]);
            rows.push({ cells: cells });
        }
        const body = { rows: rows };
        return (_jsx(Table, { id: id, header: header, body: body }, id));
    }
    const tables = data.map((table) => renderTable(table));
    return (_jsxs(_Fragment, { children: [_jsx(Title2, { text: title }), _jsxs("div", { className: 'flex flex-col gap-4', children: [_jsx("div", { className: 'mb-4', children: tables }), _jsxs("div", { className: 'flex flex-row gap-4', children: [_jsx(PrimaryButton, { label: donateButton, onClick: handleDonate }), _jsx(SecondaryButton, { label: declineButton, onClick: handleDecline })] })] })] }));
};
