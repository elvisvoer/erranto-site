<script>
  import { onMount } from "svelte";
  import { VirtualConsole, HTMLConsoleDriver } from "../lib/console";
  import { evalSafe } from "../lib/javascript";

  let data;
  let jsConsole;
  let jsConsoleRef;

  onMount(() => {
    jsConsole = new VirtualConsole(new HTMLConsoleDriver(jsConsoleRef));
  });

  const handleRunSnippet = () => {
    if (data && data.outerText) {
      const code = data.outerText;
      const context = {
        console: jsConsole,
        window: null,
      };
      context.window = context;

      jsConsole.clear();
      jsConsole.show();
      evalSafe(code, context);
    }
  };
</script>

<div class="w-full flex flex-col gap-4">
  <div class="code-wrapper" bind:this={data}><slot /></div>

  <button
    type="button"
    on:click={handleRunSnippet}
    class="w-full max-w-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >Run snippet</button
  >

  <div class="js-console rounded-md" bind:this={jsConsoleRef}></div>
</div>

<style>
  .code-wrapper :global(pre) {
    margin: 0px;
  }

  .js-console {
    background-color: #24292e;
    padding: 1rem;
  }
</style>
