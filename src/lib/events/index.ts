export default class EventEmitter {
  private listeners: Map<string, Set<Function>> = new Map();

  public emit(event: string, ...args: unknown[]) {
    const listeners = this.listeners.get(event);
    listeners?.forEach((h) => h(...args));
  }

  public on(event: string, handler: Function) {
    const listeners = this.listeners.get(event) || new Set();
    listeners.add(handler);
    this.listeners.set(event, listeners);
  }

  public off(event: string, handler: Function) {
    const listeners = this.listeners.get(event);
    listeners?.delete(handler);
  }

  public once(event: string, handler: Function) {
    const temp = (...args: unknown[]) => {
      handler(...args);
      this.off(event, temp);
    };
    this.on(event, temp);
  }
}
