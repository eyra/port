import { CommandHandler, ProcessingEngine } from '../types/modules'
import { CommandSystemDonate, CommandUIRender, isCommand, Response } from '../types/commands'

export default class WorkerProcessingEngine implements ProcessingEngine {
  sessionId: String
  worker: Worker
  commandHandler: CommandHandler

  resolveInitialized!: () => void
  resolveContinue!: () => void

  constructor (sessionId: string, worker: Worker, commandHandler: CommandHandler) {
    this.sessionId = sessionId
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

    this.trackUserStart(sessionId)
  }

  trackUserStart (sessionId: string): void {
    const key = `${sessionId}-tracking`
    const jsonString = JSON.stringify({ message: 'user started' })
    const command: CommandSystemDonate = { __type__: 'CommandSystemDonate', key, json_string: jsonString }
    this.commandHandler.onCommand(command).then(
      () => {},
      () => {}
    )
  }

  handleEvent (event: any): void {
    const { eventType } = event.data
    console.log('[ReactEngine] received eventType: ', eventType)
    switch (eventType) {
      case 'initialiseDone':
        console.log('[ReactEngine] received: initialiseDone')
        this.resolveInitialized()
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

  start (): void {
    console.log('[WorkerProcessingEngine] started')

    const waitForInitialization: Promise<void> = this.waitForInitialization()
    const waitForSplashScreen: Promise<void> = this.waitForSplashScreen()

    Promise.all([waitForInitialization, waitForSplashScreen]).then(
      () => { this.firstRunCycle() },
      () => {}
    )
  }

  async waitForInitialization (): Promise<void> {
    return await new Promise<void>((resolve) => {
      this.resolveInitialized = resolve
      this.worker.postMessage({ eventType: 'initialise' })
    })
  }

  async waitForSplashScreen (): Promise<void> {
    return await new Promise<void>((resolve) => {
      this.resolveContinue = resolve
      this.renderSplashScreen()
    })
  }

  renderSplashScreen (): void {
    const command: CommandUIRender = { __type__: 'CommandUIRender', page: { __type__: 'PropsUIPageSplashScreen' } }
    if (isCommand(command)) {
      this.commandHandler.onCommand(command).then(
        (_response) => this.resolveContinue(),
        () => {}
      )
    }
  }

  firstRunCycle (): void {
    this.worker.postMessage({ eventType: 'firstRunCycle', sessionId: this.sessionId })
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
