import { Text } from './elements';
export interface VisualizationProps {
    title: Text;
    height?: number;
}
export type AggregationFunction = 'count' | 'mean' | 'sum' | 'count_pct' | 'pct';
export interface Axis {
    label?: string;
    column: string;
}
export interface AggregationGroup {
    label?: string;
    column: string;
    dateFormat?: DateFormat;
    tokenize?: boolean;
}
export interface AggregationValue {
    label?: string;
    column: string;
    aggregate?: AggregationFunction;
    group_by?: string;
    secondAxis?: boolean;
    z?: string;
    zAggregate?: AggregationFunction;
    addZeroes?: boolean;
}
export interface ChartVisualization extends VisualizationProps {
    type: 'line' | 'bar' | 'area';
    group: AggregationGroup;
    values: AggregationValue[];
}
export interface TextVisualization extends VisualizationProps {
    type: 'wordcloud';
    textColumn: string;
    valueColumn?: string;
    tokenize?: boolean;
}
export interface ScoredTerm {
    text: string;
    value: number;
    importance: number;
    rowIds?: string[];
}
export type VisualizationType = ChartVisualization | TextVisualization;
export interface AxisSettings {
    label: string;
    secondAxis?: boolean;
    tickerFormat?: TickerFormat;
}
export type TickerFormat = 'percent' | 'default';
export interface ChartVisualizationData {
    type: 'line' | 'bar' | 'area';
    data: Array<Record<string, any>>;
    xKey: AxisSettings;
    yKeys: Record<string, AxisSettings>;
}
export interface TextVisualizationData {
    type: 'wordcloud';
    topTerms: ScoredTerm[];
}
export type VisualizationData = ChartVisualizationData | TextVisualizationData;
export type DateFormat = 'auto' | 'year' | 'quarter' | 'month' | 'day' | 'hour' | 'month_cycle' | 'weekday_cycle' | 'day_cycle' | 'hour_cycle';
