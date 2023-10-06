<script>
  // @ts-nocheck

  export let margin;
  export let xScale;
  export let height;
  export let width;

  import { timeFormat } from "d3-time-format";
  let formatTime = timeFormat("%b-%y");

  const xTicks = xScale.ticks(5);
</script>

<g class="HorizontalAxis">
  <g class="text" transform="translate({margin.left},{height})">
    {#each xTicks as year}
      <line
        x1={xScale(year)}
        x2={xScale(year)}
        y1={15}
        y2={5}
        stroke="#999"
      />
      <text x={xScale(year)} y={30} dx={-15}>
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
