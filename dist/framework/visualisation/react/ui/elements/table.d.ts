/// <reference types="react" />
import { Weak } from '../../../../helpers';
import { PropsUITable, PropsUITableRow } from '../../../../types/elements';
declare type Props = Weak<PropsUITable> & TableContext;
export interface TableContext {
    onChange: (id: string, rows: PropsUITableRow[]) => void;
}
export declare const Table: ({ id, head, body, readOnly, pageSize, onChange }: Props) => JSX.Element;
export {};
