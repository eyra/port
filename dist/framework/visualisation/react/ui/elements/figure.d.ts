/// <reference types="react" />
import { TableWithContext } from '../../../../types/elements';
import { VisualizationType } from '../../../../types/visualizations';
import { ReactFactoryContext } from '../../factory';
type Props = VisualizationProps & ReactFactoryContext;
export interface VisualizationProps {
    table: TableWithContext;
    visualization: VisualizationType;
    locale: string;
    handleDelete: (rowIds: string[]) => void;
    handleUndo: () => void;
}
export declare const Figure: ({ table, visualization, locale, handleDelete, handleUndo }: Props) => JSX.Element;
export {};
