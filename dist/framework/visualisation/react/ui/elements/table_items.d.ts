/// <reference types="react" />
import { TableWithContext } from '../../../../types/elements';
interface Props {
    table: TableWithContext;
    searchedTable: TableWithContext;
    locale: string;
}
export declare const TableItems: ({ table, searchedTable, locale }: Props) => JSX.Element;
export {};
