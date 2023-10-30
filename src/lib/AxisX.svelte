<script>
  // @ts-nocheck

  export let margin;
  export let xScale;
  export let height;
  export let width;

  import { timeFormat } from "d3-time-format";
  let formatTime = timeFormat("%b-%y");

  $: xTicks = width < 400 ? xScale.ticks(4) : xScale.ticks(6);
</script>

<g
  class="HorizontalAxis"
  transform="translate({0},{height + margin.bottom})"
>
  <g class="text">
    {#each xTicks as year}
      <!-- <line
        x1={xScale(year)}
        x2={xScale(year)}
        y1={15}
        y2={5}
        stroke="#999"
      /> -->
      <text x={xScale(year)} y={-5} dx={20}>
        {formatTime(year)}
      </text>
    {/each}
  </g>
</g>

<style>
  text {
    font-size: 12px;
  }
</style>
