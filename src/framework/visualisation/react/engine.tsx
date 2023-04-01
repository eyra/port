import * as ReactDOM from 'react-dom/client'
import { VisualisationEngine } from '../../types/modules'
import { Response, Payload, CommandUIRender } from '../../types/commands'
import { PropsUIPage } from '../../types/pages'
import VisualisationFactory from './factory'
import { Main } from './main'

export default class ReactEngine implements VisualisationEngine {
  factory: VisualisationFactory

  locale!: string
  root!: ReactDOM.Root

  constructor (factory: VisualisationFactory) {
    this.factory = factory
  }

  start (rootElement: HTMLElement, locale: string): void {
    console.log('[ReactEngine] started')
    this.root = ReactDOM.createRoot(rootElement)
    this.locale = locale
  }

  async render (command: CommandUIRender): Promise<Response> {
    return await new Promise<Response>((resolve) => {
      this.renderPage(command.page).then(
        (payload: Payload) => {
          resolve({ __type__: 'Response', command, payload })
        },
        () => {}
      )
    })
  }

  async renderPage (props: PropsUIPage): Promise<any> {
    return await new Promise<any>((resolve) => {
      const context = { locale: this.locale, resolve }
      const page = this.factory.createPage(props, context)
      this.renderElements([page])
    })
  }

  terminate (): void {
    console.log('[ReactEngine] stopped')
    this.root.unmount()
  }

  renderElements (elements: JSX.Element[]): void {
    this.root.render(<Main elements={elements} />)
  }
}
