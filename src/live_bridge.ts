import { CommandSystem, isCommandSystem } from './framework/types/commands'
import { Bridge } from './framework/types/modules'

export default class LiveBridge implements Bridge {
  port: MessagePort

  constructor (port: MessagePort) {
    this.port = port
  }

  static create (window: Window, callback: (bridge: Bridge, locale: string) => void): void {
    window.addEventListener('message', (event) => {
      console.log('MESSAGE RECEIVED', event)
      // Skip webpack messages
      if (event.data.action === 'live-init') {
        const bridge = new LiveBridge(event.ports[0])
        const locale = event.data.locale
        console.log('LOCALE', locale)
        callback(bridge, locale)
      }
    })
  }

  send (command: CommandSystem): void {
    if (isCommandSystem(command)) {
      this.port.postMessage(command)
    } else {
      this.log('error', 'received unknown command', command)
    }
  }

  private log (level: 'info' | 'error', ...message: any[]): void {
    const logger = level === 'info' ? console.log : console.error
    logger(`[${this.constructor.name}]`, ...message)
  }
}
