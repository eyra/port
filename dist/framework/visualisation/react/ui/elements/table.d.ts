/// <reference types="react" />
import { TableWithContext } from '../../../../types/elements';
export interface Props {
    table: TableWithContext;
    show: boolean;
    locale: string;
    search: string;
    handleDelete?: (rowIds: string[]) => void;
    handleUndo?: () => void;
    pageSize?: number;
}
export declare const Table: ({ table, show, locale, search, handleDelete, handleUndo, pageSize }: Props) => JSX.Element;
