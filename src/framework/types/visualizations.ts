export type AggregationFunction = 'count' | 'mean' | 'sum' | 'count_pct'

export interface Axis {
  label?: string
  column: string
  formatDate?: 'auto' | 'year' | 'year_month' | 'month' | 'day' | 'weekday' | 'day_hour' | 'hour'
}

export interface YAxis extends Axis {
  aggregate?: AggregationFunction
  group_by?: string
  secondAxis?: boolean
  z?: string
  zAggregate?: AggregationFunction
}

export interface VisualizationLineChart {
  type: 'line'
  x: Axis
  ys: YAxis[]
}

export interface VisualizationBarChart {
  type: 'bar'
  x: Axis
  ys: YAxis[]
}

export type AggregateRowIds = Record<string, string[]>
export interface AxisSettings {
  label: string
  secondAxis?: boolean
}

export interface VisualizationData {
  type: 'line' | 'bar'
  tableId: string
  position: 'top' | 'bottom' | 'table'
  data: Record<string, string | AggregateRowIds>[]
  xKey: AxisSettings
  yKeys: Record<string, AxisSettings>
}

export type VisualizationType = VisualizationLineChart | VisualizationBarChart
