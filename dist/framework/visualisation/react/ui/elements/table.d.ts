/// <reference types="react" />
import { Weak } from '../../../../helpers';
import { PropsUITable } from '../../../../types/elements';
declare type Props = Weak<PropsUITable> & TableContext;
export interface TableContext {
    onChange: (table: PropsUITable) => void;
}
export declare const Table: ({ readOnly, id, head, body, onChange }: Props) => JSX.Element;
export {};
