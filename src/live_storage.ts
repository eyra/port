import { CommandSystem, CommandSystemDonate, isCommandSystemDonate } from './framework/types/commands'
import { Storage } from './framework/types/modules'

export default class LiveStorage implements Storage {
  port: MessagePort

  constructor (port: MessagePort) {
    this.port = port
  }

  static create (window: Window, callback: (system: Storage) => void): void {
    window.addEventListener('message', (event) => {
      console.log('MESSAGE RECEIVED', event)
      // Skip webpack messages
      if (event.ports.length === 0) {
        return
      }
      const system = new LiveStorage(event.ports[0])
      callback(system)
    })
  }

  send (command: CommandSystem): void {
    if (isCommandSystemDonate(command)) {
      this.port.postMessage(command)
    } else {
      this.log('error', 'received unknown command', command)
    }
  }

  handleDonation (command: CommandSystemDonate): void {
    this.log('info', `received donation: ${command.key}=${command.json_string}`)
  }

  private log (level: 'info' | 'error', ...message: any[]): void {
    const logger = level === 'info' ? console.log : console.error
    logger(`[${this.constructor.name}]`, ...message)
  }
}
