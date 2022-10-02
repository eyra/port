import ProcessingEngine from '../abstractions/processing_engine'

export default class WorkerProcessingEngine implements ProcessingEngine {
  eventListener: (event: any) => void
  worker: Worker

  constructor (worker: Worker) {
    this.eventListener = (event) => {
      const eventString = JSON.stringify(event)
      console.log(
        '[ProcessingEngine] No event listener registered for event: ',
        eventString
      )
    }

    this.worker = worker
    this.worker.onerror = console.log
    this.worker.onmessage = (event) => {
      console.log(
        '[ProcessingEngine] Received event from worker: ',
        event.data.eventType
      )
      this.eventListener(event)
    }
  }

  start (): void {
    this.worker.postMessage({ eventType: 'initialise' })
  }

  loadScript (script: any): void {
    this.worker.postMessage({ eventType: 'loadScript', script })
  }

  firstRunCycle (): void {
    this.worker.postMessage({ eventType: 'firstRunCycle' })
  }

  nextRunCycle (response: any): void {
    this.worker.postMessage({ eventType: 'nextRunCycle', response })
  }

  terminate (): void {
    this.worker.terminate()
  }
}
