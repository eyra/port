import { TableWithContext } from '../../../../types/elements'
import { PropsUIPromptConsentFormVisualization } from '../../../../types/prompts'

import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { VisualizationData, AxisSettings } from '../../../../types/visualizations'

import React, { useMemo } from 'react'

import { ReactFactoryContext } from '../../factory'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, AreaChart, Area } from 'recharts'
import { Spinner } from './spinner'
import { set } from 'lodash'
import useVisualizationData from '../hooks/useVisualizationData'
import { Title6 } from './text'

type Props = VisualizationProps & ReactFactoryContext

export interface VisualizationProps {
  table: TableWithContext
  visualizationSettings: PropsUIPromptConsentFormVisualization
  locale: string
  handleDelete: (tableId: string, rowIds: string[]) => void
  handleUndo: (tableId: string) => void
}

export const Figure = ({ table, visualizationSettings, locale, handleDelete, handleUndo }: Props): JSX.Element => {
  const [visualizationData, status] = useVisualizationData(table, visualizationSettings.visualization)

  const { title } = useMemo(() => {
    const title = Translator.translate(visualizationSettings.title, locale)
    return { title }
  }, [visualizationSettings])

  const { errorMsg } = prepareCopy(locale)
  if (status === 'loading') return <Spinner />
  if (status === 'error') return <div className="flex justify-center items-center text-error">{errorMsg}</div>

  const minHeight = visualizationSettings.height ? visualizationSettings.height + 'px' : `20rem`

  return (
    <div className="flex flex-col overflow-hidden">
      <Title6 text={title} margin="mt-2 mb-4" />
      <div className={`relative z-50 `} style={{ flex: `1 1 ${minHeight}`, minHeight }}>
        <RenderVisualization visualizationData={visualizationData} />
      </div>
    </div>
  )
}

interface RenderVisualizationProps {
  visualizationData: VisualizationData | undefined
}

const RenderVisualization = ({ visualizationData }: RenderVisualizationProps): JSX.Element | null => {
  if (!visualizationData) return null

  function tooltip() {
    return (
      <Tooltip
        allowEscapeViewBox={{ x: false, y: false }}
        labelStyle={{ marginBottom: '0.5rem' }}
        contentStyle={{ fontSize: '0.8rem', lineHeight: '0.8rem', background: '#fff8', backdropFilter: 'blur(3px)' }}
      />
    )
  }

  function axes(minTickGap: number) {
    if (!visualizationData) return null
    const secondary = Object.values(visualizationData.yKeys).findIndex((yKey: AxisSettings) => yKey.secondAxis) !== -1
    return (
      <>
        <XAxis dataKey={visualizationData.xKey.label} minTickGap={minTickGap} />
        <YAxis yAxisId="left" />
        {secondary && <YAxis yAxisId="right" orientation="right" />}
      </>
    )
  }

  function legend() {
    return <Legend margin={{ left: 10 }} align="right" verticalAlign="top" iconType="plainline" wrapperStyle={{ fontSize: '0.8rem' }} />
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
              yAxisId={yKey.secondAxis ? 'right' : 'left'}
              type="monotone"
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
          const { color, dash } = getLineStyle(i)
          return <Bar key={yKey.label} yAxisId={yKey.secondAxis ? 'right' : 'left'} dataKey={yKey.label} fill={color} />
        })}
      </BarChart>
    )
  }

  if (visualizationData.type === 'area') {
    chart = (
      <AreaChart data={visualizationData.data}>
        {axes(0)}
        {tooltip()}
        {legend()}
        {Object.values(visualizationData.yKeys).map((yKey: AxisSettings, i: number) => {
          const { color, dash } = getLineStyle(i)
          return <Area key={yKey.label} yAxisId={yKey.secondAxis ? 'right' : 'left'} dataKey={yKey.label} fill={color} />
        })}
      </AreaChart>
    )
  }

  if (!chart) return null
  return (
    <ResponsiveContainer width="100%" height="100%">
      {chart}
    </ResponsiveContainer>
  )
}

function prepareCopy(locale: string): Record<string, string> {
  return {
    errorMsg: Translator.translate(errorMsg, locale)
  }
}

const errorMsg = new TextBundle().add('en', 'Could not create visualization').add('nl', 'Kon visualisatie niet maken')

function getLineStyle(index: number): { color: string; dash: string } {
  const COLORS = ['#4272EF', '#FF5E5E', '#FFCF60', '#1E3FCC', '#CC3F3F', '#CC9F3F']
  const DASHES = ['1', '5 5', '10 10', '5 5 10 10']

  const cell = index % (COLORS.length * DASHES.length)
  const row = index % COLORS.length
  const column = Math.floor(cell / COLORS.length)

  return { color: COLORS[row], dash: DASHES[column] }
}
