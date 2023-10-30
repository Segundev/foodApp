<script>
  // @ts-nocheck

  export let yScale;
  export let width;
  export let height;

  $: yTicks = yScale.ticks(4);
</script>

<g class="VerticalAxis" transform="translate({0},{0})">
  {#each yTicks as tick}
    <text class="text" x={0} y={yScale(tick)} dy="-15"> {tick}</text>
    <line
      x1={0}
      x2={width + 20}
      y1={yScale(tick)}
      y2={yScale(tick)}
      stroke="#ddd"
      stroke-width="1"
    />
  {/each}
</g>

<style>
  text {
    font-size: 12px;
  }
</style>
