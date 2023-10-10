import { CommandSystem, CommandSystemDonate, isCommandSystemDonate } from './framework/types/commands'
import { Storage } from './framework/types/modules'

export default class FakeStorage implements Storage {
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
