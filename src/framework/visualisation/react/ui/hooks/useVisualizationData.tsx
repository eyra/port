import { PropsUITable, TableWithContext, TableContext } from '../../../../types/elements'
import { VisualizationType, VisualizationData, DateFormat, AxisSettings, TickerFormat } from '../../../../types/visualizations'
import React, { useEffect, useState } from 'react'

type Status = 'success' | 'error' | 'loading'

export default function useVisualizationData(table: TableWithContext, visualization: VisualizationType): [VisualizationData | undefined, Status] {
  const [visualizationData, setVisualizationData] = useState<VisualizationData>()
  const [status, setStatus] = useState<Status>('loading')
  const [worker] = useState(new Worker(new URL('../workers/visualizationDataWorker.ts', import.meta.url)))

  useEffect(() => {
    if (window.Worker) {
      setStatus('loading')
      worker.postMessage({ table, visualization })
      worker.onmessage = (e: MessageEvent<{ status: Status; visualizationData: VisualizationData }>) => {
        setStatus(e.data.status)
        setVisualizationData(e.data.visualizationData)
      }
    }
  }, [table, visualization, worker])

  return [visualizationData, status]
}
