import { CommandSystem, CommandSystemDonate, CommandSystemEvent, CommandSystemExit, isCommandSystemDonate, isCommandSystemEvent, isCommandSystemExit } from './framework/types/commands'
import { Bridge } from './framework/types/modules'

export default class FakeBridge implements Bridge {
  send (command: CommandSystem): void {
    if (isCommandSystemDonate(command)) {
      this.handleDonation(command)
    } else if (isCommandSystemEvent(command)) {
      this.handleEvent(command)
    } else if (isCommandSystemExit(command)) {
      this.handleExit(command)
    } else {
      console.log('[FakeBridge] received unknown command: ' + JSON.stringify(command))
    }
  }

  handleDonation (command: CommandSystemDonate): void {
    console.log(`[FakeBridge] received donation: ${command.key}=${command.json_string}`)
  }

  handleEvent (command: CommandSystemEvent): void {
    console.log(`[FakeBridge] received event: ${command.name}`)
  }

  handleExit (command: CommandSystemExit): void {
    console.log(`[FakeBridge] received exit: ${command.code}=${command.info}`)
  }
}
