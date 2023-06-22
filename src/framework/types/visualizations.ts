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
}

export interface VisualizationLineChart extends VisualizationInput {
  type: 'line'
}

export interface VisualizationBarChart extends VisualizationInput {
  type: 'bar'
}

export type AggregateRowIds = Record<string, string[]>

export interface AxisSettings {
  label: string
  secondAxis?: boolean
}

export type AggregatedData = Record<string, string | AggregateRowIds>[]

export interface VisualizationData {
  type: 'line' | 'bar'
  data: AggregatedData
  xKey: AxisSettings
  yKeys: Record<string, AxisSettings>
}

export type VisualizationType = VisualizationLineChart | VisualizationBarChart

export type DateFormat = 'auto' | 'year' | 'month' | 'day' | 'hour' | 'month_cycle' | 'weekday_cycle' | 'day_cycle' | 'hour_cycle'
