import { CommandHandler, ProcessingEngine } from '../types/modules'
import { isCommand, Response, Script } from '../types/commands'

export default class WorkerProcessingEngine implements ProcessingEngine {
  worker: Worker
  commandHandler: CommandHandler

  script!: Script

  constructor (worker: Worker, commandHandler: CommandHandler) {
    this.commandHandler = commandHandler
    this.worker = worker
    this.worker.onerror = console.log
    this.worker.onmessage = (event) => {
      console.log(
        '[WorkerProcessingEngine] Received event from worker: ',
        event.data.eventType
      )
      this.handleEvent(event)
    }
  }

  handleEvent (event: any): void {
    const { eventType } = event.data
    console.log('[ReactEngine] received eventType: ', eventType)
    switch (eventType) {
      case 'initialiseDone':
        console.log('[ReactEngine] received: initialiseDone')
        this.loadScript(this.script)
        break

      case 'loadScriptDone':
        console.log('[ReactEngine] Received: loadScriptDone')
        this.firstRunCycle()
        break

      case 'runCycleDone':
        console.log('[ReactEngine] received: event', event.data.scriptEvent)
        this.handleRunCycle(event.data.scriptEvent)
        break
      default:
        console.log(
          '[ReactEngine] received unsupported flow event: ',
          eventType
        )
    }
  }

  start (script: Script): void {
    console.log('[WorkerProcessingEngine] started')
    this.script = script
    this.worker.postMessage({ eventType: 'initialise' })
  }

  loadScript (script: any): void {
    this.worker.postMessage({ eventType: 'loadScript', script })
  }

  firstRunCycle (): void {
    this.worker.postMessage({ eventType: 'firstRunCycle' })
  }

  nextRunCycle (response: Response): void {
    this.worker.postMessage({ eventType: 'nextRunCycle', response })
  }

  terminate (): void {
    this.worker.terminate()
  }

  handleRunCycle (command: any): void {
    if (isCommand(command)) {
      this.commandHandler.onCommand(command).then(
        (response) => this.nextRunCycle(response),
        () => {}
      )
    }
  }
}
