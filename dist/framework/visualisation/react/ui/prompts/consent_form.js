import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { assert } from '../../../../helpers';
import { LabelButton, PrimaryButton } from '../elements/button';
import { BodyLarge } from '../elements/text';
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import useUnloadWarning from '../hooks/useUnloadWarning';
import { TableContainer } from '../elements/table_container';
export const ConsentForm = (props) => {
    useUnloadWarning();
    const [tables, setTables] = useState(() => parseTables(props.tables));
    const [metaTables, setMetaTables] = useState(() => parseTables(props.metaTables));
    // const { visualizationSettings, locale, resolve } = props
    const { locale, resolve } = props;
    // const visualizationSettings = testVisualizations
    const { description, donateQuestion, donateButton, cancelButton } = prepareCopy(props);
    useEffect(() => {
        setTables(parseTables(props.tables));
        setMetaTables(parseTables(props.metaTables));
    }, [props.tables]);
    const updateTable = useCallback((tableId, table) => {
        setTables((tables) => {
            const index = tables.findIndex((table) => table.id === tableId);
            if (index === -1)
                return tables;
            const newTables = [...tables];
            newTables[index] = table;
            return newTables;
        });
    }, []);
    function rowCell(dataFrame, column, row) {
        const text = String(dataFrame[column][`${row}`]);
        return { __type__: 'PropsUITableCell', text: text };
    }
    function headCell(dataFrame, column) {
        return { __type__: 'PropsUITableCell', text: column };
    }
    function columnNames(dataFrame) {
        return Object.keys(dataFrame);
    }
    function columnCount(dataFrame) {
        return columnNames(dataFrame).length;
    }
    function rowCount(dataFrame) {
        if (columnCount(dataFrame) === 0) {
            return 0;
        }
        else {
            const firstColumn = dataFrame[columnNames(dataFrame)[0]];
            return Object.keys(firstColumn).length - 1;
        }
    }
    function rows(data) {
        const result = [];
        for (let row = 0; row <= rowCount(data); row++) {
            const id = `${row}`;
            const cells = columnNames(data).map((column) => rowCell(data, column, row));
            result.push({ __type__: 'PropsUITableRow', id, cells });
        }
        return result;
    }
    function parseTables(tablesData) {
        return tablesData.map((table) => parseTable(table));
    }
    function parseTable(tableData) {
        const id = tableData.id;
        const title = Translator.translate(tableData.title, props.locale);
        const deletedRowCount = 0;
        const dataFrame = JSON.parse(tableData.data_frame);
        const headCells = columnNames(dataFrame).map((column) => headCell(dataFrame, column));
        const head = { __type__: 'PropsUITableHead', cells: headCells };
        const body = { __type__: 'PropsUITableBody', rows: rows(dataFrame) };
        return {
            __type__: 'PropsUITable',
            id,
            head,
            body,
            title,
            deletedRowCount,
            annotations: [],
            originalBody: body,
            deletedRows: [],
            visualizations: tableData.visualizations
        };
    }
    function handleDonate() {
        const value = serializeConsentData();
        resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadJSON', value });
    }
    function handleCancel() {
        resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadFalse', value: false });
    }
    function serializeConsentData() {
        const array = serializeTables().concat(serializeMetaData());
        return JSON.stringify(array);
    }
    function serializeMetaData() {
        return serializeMetaTables().concat(serializeDeletedMetaData());
    }
    function serializeTables() {
        return tables.map((table) => serializeTable(table));
    }
    function serializeMetaTables() {
        return metaTables.map((table) => serializeTable(table));
    }
    function serializeDeletedMetaData() {
        const rawData = tables
            .filter(({ deletedRowCount }) => deletedRowCount > 0)
            .map(({ id, deletedRowCount }) => `User deleted ${deletedRowCount} rows from table: ${id}`);
        const data = JSON.stringify(rawData);
        return { user_omissions: data };
    }
    function serializeTable({ id, head, body: { rows } }) {
        const data = rows.map((row) => serializeRow(row, head));
        return { [id]: data };
    }
    function serializeRow(row, head) {
        assert(row.cells.length === head.cells.length, `Number of cells in row (${row.cells.length}) should be equals to number of cells in head (${head.cells.length})`);
        const keys = head.cells.map((cell) => cell.text);
        const values = row.cells.map((cell) => cell.text);
        return _.fromPairs(_.zip(keys, values));
    }
    return (_jsxs(_Fragment, { children: [_jsx("div", Object.assign({ className: 'max-w-3xl' }, { children: _jsx(BodyLarge, { text: description }) })), _jsxs("div", Object.assign({ className: 'flex flex-col gap-16 w-full' }, { children: [_jsx("div", Object.assign({ className: 'grid gap-8 max-w-full' }, { children: tables.map((table) => {
                            return (_jsx(TableContainer, { id: table.id, table: table, updateTable: updateTable, locale: locale }, table.id));
                        }) })), _jsxs("div", { children: [_jsx(BodyLarge, { margin: '', text: donateQuestion }), _jsxs("div", Object.assign({ className: 'flex flex-row gap-4 mt-4 mb-4' }, { children: [_jsx(PrimaryButton, { label: donateButton, onClick: handleDonate, color: 'bg-success text-white' }), _jsx(LabelButton, { label: cancelButton, onClick: handleCancel, color: 'text-grey1' })] }))] })] }))] }));
};
function prepareCopy({ locale }) {
    return {
        description: Translator.translate(description, locale),
        donateQuestion: Translator.translate(donateQuestionLabel, locale),
        donateButton: Translator.translate(donateButtonLabel, locale),
        cancelButton: Translator.translate(cancelButtonLabel, locale)
    };
}
const donateQuestionLabel = new TextBundle()
    .add('en', 'Do you want to donate the above data?')
    .add('nl', 'Wilt u de bovenstaande gegevens doneren?');
const donateButtonLabel = new TextBundle().add('en', 'Yes, donate').add('nl', 'Ja, doneer');
const cancelButtonLabel = new TextBundle().add('en', 'No').add('nl', 'Nee');
const description = new TextBundle()
    .add('en', 'Determine whether you would like to donate the data below. Carefully check the data and adjust when required. With your donation you contribute to the previously described research. Thank you in advance.')
    .add('nl', 'Bepaal of u de onderstaande gegevens wilt doneren. Bekijk de gegevens zorgvuldig en pas zo nodig aan. Met uw donatie draagt u bij aan het eerder beschreven onderzoek. Alvast hartelijk dank.');
