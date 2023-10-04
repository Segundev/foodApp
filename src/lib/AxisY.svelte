<script>
  // @ts-nocheck

  export let yScale;
  export let width;

  $: yTicks = yScale.ticks(4);
</script>

<g>
  {#each yTicks as tick}
    <text class="text" x={0} y={yScale(tick)} dy="-5"> {tick}</text>
    <line
      x1={0}
      x2={width}
      y1={yScale(tick)}
      y2={yScale(tick)}
      stroke="#ddd"
      stroke-width="1"
    />
  {/each}
</g>

<style>
  text {
    font-size: 14px;
  }
</style>
