import EventEmitter from "../events";
type Line = string;

interface ITask extends EventEmitter {
  execute(...args: string[]): Promise<number>;
}

class BuiltinTask extends EventEmitter implements ITask {
  private handler: Function;
  constructor(h: Function) {
    super();

    this.handler = h;
  }

  async execute(...args: string[]): Promise<number> {
    return this.handler(this, ...args);
  }
}

export class Terminal extends EventEmitter {
  private commands: { [key: string]: ITask };

  private history: Line[];

  constructor() {
    super();

    const builtinCommands = {
      help: new BuiltinTask((command: ITask) => {
        command.emit("data", `help command`);
        return 0;
      }),
      history: new BuiltinTask((command: ITask) => {
        command.emit("data", JSON.stringify(this.history));
        return 0;
      }),
    };

    this.history = [];
    this.commands = { ...builtinCommands };
  }

  public interpret(line: Line) {
    this.history.push(line);

    const tokens = this.tokanize(line);
    return this.executeCommand(tokens[0], tokens);
  }

  private async executeCommand(cmd: string, args: string[]) {
    const command = this.findCommand(cmd);
    if (command) {
      command.on("data", (...args: unknown[]) =>
        this.emit("data", ...args)
      );
      command.on("error", (...args: unknown[]) =>
        this.emit("error", ...args)
      );
      return command.execute(...args);
    } else {
      this.emit("error", `Command '${cmd}' not found!`);
      return -1;
    }
  }

  private findCommand(cmd: string): ITask | undefined {
    return this.commands[cmd];
  }

  private tokanize(line: Line) {
    return line.split(" ");
  }
}
