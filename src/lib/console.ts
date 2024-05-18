const defaultStyle = {
  color: "rgb(247, 250, 252)",
  "white-space": "pre-wrap",
  "font-size": "0.8888889em;",
};

export class HTMLConsoleDriver {
  constructor(private rootNode: HTMLDivElement) {
    this.rootNode.style.display = "none";
  }

  public write(style?: { color: string }, ...data: string[]) {
    const s = { ...defaultStyle, ...(style || {}) };
    const prefix = `<span style="${Object.entries(s)
      .map(([key, val]) => `${key}: ${val} !important;`)
      .join(" ")}">`;
    const suffix = `</span>`;
    this.rootNode.innerHTML += `${prefix}${data.join(" ")}${suffix}`;
  }

  public writeln(style?: { color: string }, ...data: string[]) {
    this.write(style, ...data);
    this.write(undefined, "<br />");
  }

  public clear() {
    this.rootNode.innerHTML = "";
  }

  public show() {
    this.rootNode.style.display = "block";
  }
}

export class VirtualConsole {
  constructor(private driver: HTMLConsoleDriver) {
    this.log("Virtual Console initialized!");
  }

  log(...args: string[]) {
    this.driver.writeln(undefined, ...args);
  }

  debug(...args: string[]) {
    this.driver.writeln(undefined, ...args);
  }

  info(...args: string[]) {
    args.unshift("&#x1F6C8;");
    this.driver.writeln(undefined, ...args);
  }

  error(...args: string[]) {
    args.unshift("&#x1F6C8;");
    this.driver.writeln(
      {
        color: "rgb(155, 44, 44)",
      },
      ...args
    );
  }

  dir(...args: unknown[]) {
    args.forEach((arg) => {
      if (typeof arg === "string") {
        this.driver.write(undefined, arg, " ");
        return;
      }

      if (typeof arg === "object") {
        const formatted = JSON.stringify(arg, undefined, 2);
        const lines = formatted.split("\n");
        lines.forEach((line) => {
          this.driver.writeln(undefined, line);
        });

        return;
      }

      throw new Error("console.dir unknown type: " + typeof arg);
    });
  }

  clear() {
    this.driver.clear();
  }

  show() {
    this.driver.show();
  }
}
