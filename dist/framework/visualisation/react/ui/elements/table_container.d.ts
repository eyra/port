/// <reference types="react" />
import { TableWithContext } from '../../../../types/elements';
interface TableContainerProps {
    id: string;
    table: TableWithContext;
    updateTable: (tableId: string, table: TableWithContext) => void;
    locale: string;
}
export declare const TableContainer: ({ id, table, updateTable, locale }: TableContainerProps) => JSX.Element;
export {};
