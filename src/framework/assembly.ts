import ReactEngine from './visualisation/react/engine'
import ReactFactory from './visualisation/react/factory'
import WorkerProcessingEngine from './processing/worker_engine'
import VisualisationEngine from './abstractions/visualisation_engine'

export const Assembly = (worker: Worker): VisualisationEngine => {
  const processingEngine = new WorkerProcessingEngine(worker)
  const visualisationEngine = new ReactEngine(
    new ReactFactory(),
    processingEngine
  )
  processingEngine.eventListener = visualisationEngine.onEvent
  return visualisationEngine
}
