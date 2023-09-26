import {
  AxisSettings,
  TickerFormat,
  ChartVisualizationData
} from '../../../../../types/visualizations'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area
} from 'recharts'

interface Props {
  visualizationData: ChartVisualizationData
}

export default function RechartsGraph ({ visualizationData }: Props): JSX.Element | null {
  function tooltip (): JSX.Element {
    return (
      <Tooltip
        allowEscapeViewBox={{ x: false, y: false }}
        labelStyle={{ marginBottom: '0.5rem' }}
        contentStyle={{
          fontSize: '0.8rem',
          lineHeight: '0.8rem',
          background: '#fff8',
          backdropFilter: 'blur(3px)'
        }}
      />
    )
  }

  function axes (minTickGap: number): JSX.Element | null {
    const hasVisualizationData = Boolean(visualizationData)
    if (!hasVisualizationData) return null
    const secondary =
      Object.values(visualizationData.yKeys).findIndex((yKey: AxisSettings) => yKey.secondAxis) !==
      -1
    const { tickFormatter, tickFormatter2 } = getTickFormatters(
      Object.values(visualizationData.yKeys)
    )

    return (
      <>
        <XAxis dataKey={visualizationData.xKey.label} minTickGap={minTickGap} />
        <YAxis yAxisId='left' tickFormatter={tickFormatter} />
        {secondary && <YAxis yAxisId='right' orientation='right' tickFormatter={tickFormatter2} />}
      </>
    )
  }

  function legend (): JSX.Element {
    return (
      <Legend
        margin={{ left: 10 }}
        align='right'
        verticalAlign='top'
        iconType='plainline'
        wrapperStyle={{ fontSize: '0.8rem' }}
      />
    )
  }

  let chart: JSX.Element | null = null

  if (visualizationData.type === 'line') {
    chart = (
      <LineChart data={visualizationData.data}>
        {axes(20)}
        {tooltip()}
        {legend()}
        {Object.values(visualizationData.yKeys).map((yKey: AxisSettings, i: number) => {
          const { color, dash } = getLineStyle(i)
          return (
            <Line
              key={yKey.label}
              yAxisId={yKey.secondAxis ?? false ? 'right' : 'left'}
              type='monotone'
              dataKey={yKey.label}
              dot={false}
              strokeWidth={2}
              stroke={color}
              strokeDasharray={dash}
            />
          )
        })}
      </LineChart>
    )
  }

  if (visualizationData.type === 'bar') {
    chart = (
      <BarChart data={visualizationData.data}>
        {axes(0)}
        {tooltip()}
        {legend()}
        {Object.values(visualizationData.yKeys).map((yKey: AxisSettings, i: number) => {
          const { color } = getLineStyle(i)
          return (
            <Bar
              key={yKey.label}
              yAxisId={yKey.secondAxis ?? false ? 'right' : 'left'}
              dataKey={yKey.label}
              fill={color}
            />
          )
        })}
      </BarChart>
    )
  }

  if (visualizationData.type === 'area') {
    chart = (
      <AreaChart data={visualizationData.data}>
        {axes(20)}
        {tooltip()}
        {legend()}
        {Object.values(visualizationData.yKeys).map((yKey: AxisSettings, i: number) => {
          const { color } = getLineStyle(i)
          return (
            <Area
              key={yKey.label}
              yAxisId={yKey.secondAxis ?? false ? 'right' : 'left'}
              dataKey={yKey.label}
              fill={color}
            />
          )
        })}
      </AreaChart>
    )
  }

  if (chart == null) return null
  return (
    <ResponsiveContainer width='100%' height='100%'>
      {chart}
    </ResponsiveContainer>
  )
}

function getLineStyle (index: number): { color: string, dash: string } {
  const COLORS = ['#4272EF', '#FF5E5E', '#FFCF60', '#1E3FCC', '#CC3F3F', '#CC9F3F']
  const DASHES = ['1', '5 5', '10 10', '5 5 10 10']

  const cell = index % (COLORS.length * DASHES.length)
  const row = index % COLORS.length
  const column = Math.floor(cell / COLORS.length)

  return { color: COLORS[row], dash: DASHES[column] }
}

function getTickFormatters (yKeys: AxisSettings[]): {
  tickFormatter: ((value: number) => string) | undefined
  tickFormatter2: ((value: number) => string) | undefined
} {
  let tickerFormat: TickerFormat | undefined
  let tickerFormat2: TickerFormat | undefined

  for (const yKey of yKeys) {
    if (!(yKey.secondAxis ?? false)) {
      if (tickerFormat === undefined) tickerFormat = yKey.tickerFormat
      if (tickerFormat !== yKey.tickerFormat) tickerFormat = 'default'
    } else {
      if (tickerFormat2 === undefined) tickerFormat2 = yKey.tickerFormat
      if (tickerFormat2 !== yKey.tickerFormat) tickerFormat2 = 'default'
    }
  }

  const tickFormatter = getTickFormatter(tickerFormat ?? 'default')
  const tickFormatter2 = getTickFormatter(tickerFormat2 ?? 'default')
  return { tickFormatter, tickFormatter2 }
}

function getTickFormatter (format: TickerFormat): ((value: number) => string) | undefined {
  if (format === 'percent') return (value: number) => `${value}%`
  return undefined
}
