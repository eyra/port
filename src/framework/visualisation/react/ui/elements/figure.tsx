import { TableWithContext } from '../../../../types/elements'
import { PropsUIPromptConsentFormVisualization } from '../../../../types/prompts'

import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { VisualizationData, AxisSettings } from '../../../../types/visualizations'

import React, { useMemo } from 'react'

import { ReactFactoryContext } from '../../factory'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
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

  const height = visualizationSettings.height ? visualizationSettings.height + 'px' : '20rem'

  return (
    <div className="flex flex-col relative">
      <Title6 text={title} margin="mt-2 mb-4" />
      <div className={`flex-auto h-[${height}] overflow-hidden`}>
        <RenderVisualization visualizationData={visualizationData} />
      </div>
    </div>
  )
}

interface RenderVisualizationProps {
  visualizationData: VisualizationData | undefined
}

const RenderVisualization = ({ visualizationData }: RenderVisualizationProps): JSX.Element | null => {
  const hasSecondaryAxis = useMemo(() => {
    if (!visualizationData) return false
    return Object.values(visualizationData.yKeys).findIndex((yKey: AxisSettings) => yKey.secondAxis) !== -1
  }, [visualizationData])

  console.log(visualizationData)

  if (!visualizationData) return null

  if (visualizationData.type === 'line') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={visualizationData.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={visualizationData.xKey.label} />
          <YAxis yAxisId="left" />
          {hasSecondaryAxis && <YAxis yAxisId="right" orientation="right" />}
          {Object.values(visualizationData.yKeys).map((yKey: AxisSettings) => {
            return (
              <Line
                key={yKey.label}
                yAxisId={yKey.secondAxis ? 'right' : 'left'}
                type="monotone"
                dataKey={yKey.label}
                dot={false}
                strokeWidth={1.5}
              />
            )
          })}
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return null
}

function prepareCopy(locale: string): Record<string, string> {
  return {
    errorMsg: Translator.translate(errorMsg, locale)
  }
}

const errorMsg = new TextBundle().add('en', 'Could not create visualization').add('nl', 'Kon visualisatie niet maken')
