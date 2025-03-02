const defaultContext: any = {
  console,
};

const AsyncFunction = async function () {}.constructor;

export function evalSafe(code: string, ctx = defaultContext) {
  try {
    // @ts-expect-error
    new AsyncFunction(...Object.keys(ctx), code).bind(ctx)(...Object.values(ctx));
  } catch (err) {
    ctx.console.error(err);
  }
}
