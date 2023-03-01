/// <reference types="react" />
import { Weak } from '../../../../helpers';
import { PropsUITable, PropsUITableRow } from '../../../../types/elements';
import { ReactFactoryContext } from '../../factory';
declare type Props = Weak<PropsUITable> & TableContext & ReactFactoryContext;
export interface TableContext {
    onChange: (id: string, rows: PropsUITableRow[]) => void;
}
export declare const Table: ({ id, head, body, readOnly, pageSize, locale, onChange }: Props) => JSX.Element;
export {};
