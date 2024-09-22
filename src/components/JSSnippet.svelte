<script>
  import { onMount } from "svelte";
  import { VirtualConsole, HTMLConsoleDriver } from "../lib/console";
  import { evalSafe } from "../lib/javascript";

  export let showLineNumbers = false;

  let data;
  let jsConsole;
  let jsConsoleRef;

  // slice(0, -1) to exclude last item in the array which is a newline
  $: lineNumbers = (data && data.outerText.split("\n").slice(0, -1).map((_, i) => i + 1)) || [];

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
  <div class="code-wrapper">
    {#if showLineNumbers}
      <div class="line-num">
        <pre>{#each lineNumbers as line}{`${line}\n`}{/each}</pre>
      </div>
    {/if}
    <div class="code" bind:this={data}><slot /></div>
  </div>

  <button
    type="button"
    on:click={handleRunSnippet}
    class="w-full max-w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >Run snippet</button
  >

  <div class="js-console rounded-md" bind:this={jsConsoleRef}></div>
</div>

<style>
  .code-wrapper :global(pre) {
    margin: 0px;
  }

  .code-wrapper {
    width: 100%;
    display: flex;
    border-radius: 0.375rem;
    overflow: hidden;
  }

  .code-wrapper pre {
    margin: 0;
    padding: 1rem 0.2rem;
    border-radius: 0;
  }

  .code-wrapper .line-num pre {
    background-color: inherit;
    text-align: right;
  }

  .code-wrapper .code {
    background-color: #24292e;
    flex-grow: 1;
    overflow: scroll;
  }

  .code-wrapper .code > pre {
    padding: 1rem 1.5rem;
  }

  .js-console {
    background-color: #24292e;
    padding: 1rem;
  }
</style>
