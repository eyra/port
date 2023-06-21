import _, { get } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { Weak } from '../../../../helpers'

import { ReactFactoryContext } from '../../factory'
import { AxisSettings, VisualizationData } from '../../../../types/visualizations'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'

type Props = VisualizationProps & ReactFactoryContext

export interface VisualizationProps {
  visualizationData: VisualizationData
  handleDelete: (tableId: string, rowIds: string[]) => void
  handleUndo: (tableId: string) => void
}

export const Visualization = ({ visualizationData, locale, handleDelete, handleUndo }: Props): JSX.Element => {
  console.log(visualizationData)

  const hasSecondaryAxis = useMemo(() => {
    return Object.values(visualizationData.yKeys).findIndex((yKey: AxisSettings) => yKey.secondAxis) !== -1
  }, [visualizationData])

  console.log(visualizationData)

  if (visualizationData.type === 'line') {
    return (
      <ResponsiveContainer>
        <LineChart data={visualizationData.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={visualizationData.xKey.label} />
          <YAxis yAxisId="left" />
          {hasSecondaryAxis && <YAxis yAxisId="right" orientation="right" />}
          {Object.values(visualizationData.yKeys).map((yKey: AxisSettings) => {
            return <Line yAxisId={yKey.secondAxis ? 'right' : 'left'} type="monotone" dataKey={yKey.label} stroke="#8884d8" />
          })}
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return <></>
}
