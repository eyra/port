export type AggregationFunction = 'count' | 'mean' | 'sum' | 'count_pct'

export interface Axis {
  label?: string
  column: string
}

export interface YAxis extends Axis {
  aggregate?: AggregationFunction
  group_by?: string
  secondAxis?: boolean
  z?: string
  zAggregate?: AggregationFunction
  addZeroes?: boolean
}

export interface VisualizationInput {
  x: Axis
  ys: YAxis[]
  dateFormat?: DateFormat
  height?: number
}

export interface VisualizationLineChart extends VisualizationInput {
  type: 'line'
}

export interface VisualizationBarChart extends VisualizationInput {
  type: 'bar'
}

export interface VisualizationAreaChart extends VisualizationInput {
  type: 'area'
}

export type AggregateRowIds = Record<string, string[]>

export interface AxisSettings {
  label: string
  secondAxis?: boolean
}

export type AggregatedData = Record<string, string | AggregateRowIds>[]

export interface VisualizationData {
  type: 'line' | 'bar' | 'area'
  data: AggregatedData
  xKey: AxisSettings
  yKeys: Record<string, AxisSettings>
}

export type VisualizationType = VisualizationLineChart | VisualizationBarChart | VisualizationAreaChart

export type DateFormat = 'auto' | 'year' | 'quarter' | 'month' | 'day' | 'hour' | 'month_cycle' | 'weekday_cycle' | 'day_cycle' | 'hour_cycle'
