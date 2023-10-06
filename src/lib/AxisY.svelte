<script>
  // @ts-nocheck

  export let yScale;
  export let width;

  $: yTicks = yScale.ticks(4);
  $: console.log(yTicks);
</script>

<g class="VerticalAxis">
  {#each yTicks as tick}
    <text class="text" x={40} y={yScale(tick)} dy="-5"> {tick}</text>
    <line
      x1={40}
      x2={width - 20}
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
