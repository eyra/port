import * as ReactDOM from 'react-dom/client'
import VisualisationEngine from '../../abstractions/visualisation_engine'
import ProcessingEngine from '../../abstractions/processing_engine'
import VisualisationFactory from './factory'
import { Main } from './main'

export default class ReactEngine implements VisualisationEngine {
  factory: VisualisationFactory
  processingEngine: ProcessingEngine
  onEvent: (event: any) => void

  locale!: string
  script!: string
  root!: ReactDOM.Root

  finishFlow!: (value: unknown) => void

  constructor (factory: VisualisationFactory, processingEngine: ProcessingEngine) {
    this.factory = factory
    this.processingEngine = processingEngine
    this.onEvent = (event) => {
      this.handleEvent(event)
    }
  }

  async start (script: string, rootElement: HTMLElement, locale: string): Promise<any> {
    console.log('[ReactEngine] started')
    this.script = script
    this.root = ReactDOM.createRoot(rootElement)
    this.locale = locale
    this.showStartPage()
    this.processingEngine.start()
    return await new Promise((resolve) => {
      this.finishFlow = resolve
    })
  }

  terminate (): void {
    this.processingEngine.terminate()
  }

  renderPage (elements: JSX.Element[]): void {
    this.root.render(<Main elements={elements} />)
  }

  showSpinner (): void {
    const spinner = this.create('Spinner')
    this.renderPage([spinner])
  }

  showStartPage (): void {
    const welcome = this.create('Title0', { text: 'Welcome' })
    const spinner = this.create('Spinner')
    this.renderPage([welcome, spinner])
  }

  showFinalPage (): void {
    const thanks = this.create('Title0', { text: 'Thank you' })
    this.renderPage([thanks])
  }

  create (type: string, props: any = {}): JSX.Element {
    return this.factory.createComponent({ __type__: type, ...props }, this.locale, () => {})
  }

  handleEvent (event: any): void {
    const { eventType } = event.data
    console.log('[ReactEngine] received eventType: ', eventType)
    switch (eventType) {
      case 'initialiseDone':
        console.log('[ReactEngine] received: initialiseDone')
        this.processingEngine.loadScript(this.script)
        break

      case 'loadScriptDone':
        console.log('[ReactEngine] Received: loadScriptDone')
        this.processingEngine.firstRunCycle()
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

  handleRunCycle (scriptEvent: any): void {
    const type = scriptEvent.__type__ as string
    if (type === 'Event.EndOfFlow') {
      this.renderComponent(scriptEvent).then(
        (result) => {
          this.showFinalPage()
          this.finishFlow?.(result)
        },
        null)
      return
    }

    if (type === 'Event.EndOfFlow.NextFlow') {
      scriptEvent.__type__ = "Event.EndOfFlow"
      this.renderComponent(scriptEvent).then(
        (userInput) => {
          this.showSpinner()
          this.processingEngine.nextRunCycle({
            prompt: scriptEvent,
            userInput: userInput
          })
        },
        null)
      return
    }

    if (type.startsWith('Event.Command.Prompt')) {
      this.renderComponent(scriptEvent).then(
        (userInput) => {
          this.showSpinner()
          this.processingEngine.nextRunCycle({
            prompt: scriptEvent,
            userInput: userInput
          })
        },
        null)
      return
    }

    console.log(
      '[ReactEngine] Received unsupported script event: ',
      type
    )
  }

  async renderComponent (data: any): Promise<any> {
    const locale = this.locale
    return await new Promise((resolve) => {
      const component = this.factory.createComponent(data, locale, resolve)
      this.renderPage([component])
    })
  }
}
