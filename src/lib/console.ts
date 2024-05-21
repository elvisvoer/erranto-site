const defaultStyle = {
  "white-space": "pre-wrap",
  "font-size": "0.8888889em",
  padding: "0 .5rem",
  color: "white",
};

function getColor(data: unknown) {
  switch (true) {
    case data === undefined:
    case data === null:
      return "lightgray";
    case typeof data === "number":
    case typeof data === "boolean":
      return "lightgreen";
    case Object.getPrototypeOf(data) === Error.prototype:
      return "lightpink";
    default:
      return "inherit";
  }
}

export class HTMLConsoleDriver {
  constructor(private rootNode: HTMLDivElement) {
    this.rootNode.style.display = "none";
    this.rootNode.style.flexDirection = "column";
    this.rootNode.style.gap = "0.2rem";
  }

  public writeln(style: any = {}, ...data: unknown[]) {
    const s = { ...defaultStyle, ...style };
    const containerStyle = Object.entries(s)
      .map(([key, val]) => `${key}: ${val} !important;`)
      .join(" ");

    const words = data
      .map(
        (d) =>
          `<span style="color: ${getColor(d)} !important;">${String(d)}</span>`
      )
      .join(" ");

    this.rootNode.innerHTML += `<div style="${containerStyle}">${words}</div>`;
  }

  public clear() {
    this.rootNode.innerHTML = "";
  }

  public show() {
    this.rootNode.style.display = "flex";
  }
}

export class VirtualConsole {
  constructor(private driver: HTMLConsoleDriver) {
    this.log("Virtual Console initialized!");
  }

  log(...args: unknown[]) {
    this.driver.writeln(undefined, ...args);
  }

  info(...args: unknown[]) {
    this.log(...args);
  }

  error(...args: unknown[]) {
    this.driver.writeln(
      {
        "background-color": "rgba(155, 44, 44, 0.5)",
        color: "pink",
      },
      ...args
    );
  }

  clear() {
    this.driver.clear();
  }

  show() {
    this.driver.show();
  }
}
