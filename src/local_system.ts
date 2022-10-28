import { CommandSystem, CommandSystemDonate, isCommandSystemDonate } from './framework/types/commands'
import { System } from './framework/types/modules'

export default class LocalSystem implements System {
  send (command: CommandSystem): void {
    if (isCommandSystemDonate(command)) {
      this.handleDonation(command)
    } else {
      console.log('[LocalSystem] received unknown command: ' + JSON.stringify(command))
    }
  }

  handleDonation (command: CommandSystemDonate): void {
    console.log(`[LocalSystem] received donation: ${command.key}=${command.json_string}`)
  }
}
