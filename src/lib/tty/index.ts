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
        this.history.forEach((line, index) => {
          command.emit("data", `${index} ${line}`);
        });
        return 0;
      }),
      echo: new BuiltinTask((command: ITask, ...args: string[]) => {
        const [cmd, ...rest] = args;
        command.emit("data", ...rest);
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
    const onData = (...args: unknown[]) => this.emit("data", args.join(" "));
    const onError = (...args: unknown[]) => this.emit("error", args.join(" "));
    if (command) {
      command.on("data", onData);
      command.on("error", onError);

      const res = await command.execute(...args);

      command.off("data", onData);
      command.off("error", onError);

      return res;
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
