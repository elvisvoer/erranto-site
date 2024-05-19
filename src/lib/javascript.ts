const defaultContext: any = {
  console,
};

export function evalSafe(code: string, ctx = defaultContext) {
  try {
    new Function(...Object.keys(ctx), code).bind(ctx)(...Object.values(ctx));
  } catch (err) {
    ctx.console.error(err);
  }
}
