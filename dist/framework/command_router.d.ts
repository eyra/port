import { Command, Response, CommandUI, CommandSystem } from './types/commands';
import { CommandHandler, System, VisualisationEngine } from './types/modules';
export default class CommandRouter implements CommandHandler {
    system: System;
    visualisationEngine: VisualisationEngine;
    constructor(system: System, visualisationEngine: VisualisationEngine);
    onCommand(command: Command): Promise<Response>;
    onCommandSystem(command: CommandSystem, resolve: (response: Response) => void): void;
    onCommandUI(command: CommandUI, reject: (reason?: any) => void): void;
}
