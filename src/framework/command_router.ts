import { Command, Response, isCommandSystem, isCommandUI, CommandUI, CommandSystem } from './types/commands'
import { CommandHandler, Storage, VisualisationEngine } from './types/modules'

export default class CommandRouter implements CommandHandler {
  system: Storage
  visualisationEngine: VisualisationEngine

  constructor (system: Storage, visualisationEngine: VisualisationEngine) {
    this.system = system
    this.visualisationEngine = visualisationEngine
  }

  async onCommand (command: Command): Promise<Response> {
    return await new Promise<Response>((resolve, reject) => {
      if (isCommandSystem(command)) {
        this.onCommandSystem(command, resolve)
      } else if (isCommandUI(command)) {
        this.onCommandUI(command, resolve)
      } else {
        reject(new TypeError('Unknown command' + JSON.stringify(command)))
      }
    })
  }

  onCommandSystem (command: CommandSystem, resolve: (response: Response) => void): void {
    this.system.send(command)
    resolve({ __type__: 'Response', command, payload: { __type__: 'PayloadVoid', value: undefined } })
  }

  onCommandUI (command: CommandUI, reject: (reason?: any) => void): void {
    this.visualisationEngine.render(command).then(
      (response) => { reject(response) },
      () => {}
    )
  }
}
