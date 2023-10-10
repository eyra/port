import { PropsUITable, TableContext } from '../../../../../types/elements';
import { ChartVisualizationData, ChartVisualization } from '../../../../../types/visualizations';
export declare function prepareChartData(table: PropsUITable & TableContext, visualization: ChartVisualization): Promise<ChartVisualizationData>;
export interface PrepareAggregatedData {
    xLabel: string;
    xValue: string;
    values: Record<string, number>;
    rowIds: Record<string, string[]>;
    sortBy: number | string;
}
