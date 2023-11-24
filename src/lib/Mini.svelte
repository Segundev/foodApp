<script>
  // @ts-nocheck
  import Brush from "./Brush.svelte";

  export let margin;
  export let innerWidth;
  export let minX;
  export let maxX;

  let width;
  let height = 30;
</script>

<div
  class="controlsFooter"
  bind:offsetWidth={width}
  bind:offsetHeight={height}
>
  <div class="brushWrapper">
    <Brush {innerWidth} {height} {margin} {minX} {maxX} />
  </div>
</div>

<style>
  .controlsFooter {
    width: 100%;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  .brushWrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    padding: 0 1em;
  }
</style>
