import { TableWithContext } from '../../../../types/elements'
import {
  VisualizationType,
  VisualizationData
} from '../../../../types/visualizations'
import { useEffect, useState } from 'react'

type Status = 'loading' | 'success' | 'error'

export default function useVisualizationData (
  table: TableWithContext,
  visualization: VisualizationType
): [VisualizationData | undefined, Status] {
  const [visualizationData, setVisualizationData] = useState<VisualizationData>()
  const [status, setStatus] = useState<Status>('loading')
  const [worker, setWorker] = useState<Worker>()

  useEffect(() => {
    const worker = new Worker(new URL('../workers/visualizationDataWorker.ts', import.meta.url))
    setWorker(worker)
    return () => {
      worker.terminate()
    }
  }, [])

  useEffect(() => {
    if ((worker != null) && (window.Worker !== undefined)) {
      setStatus('loading')
      worker.onmessage = (
        e: MessageEvent<{ status: Status, visualizationData: VisualizationData }>
      ) => {
        setStatus(e.data.status)
        setVisualizationData(e.data.visualizationData)
      }
      worker.postMessage({ table, visualization })
    }
  }, [table, visualization, worker])

  return [visualizationData, status]
}
