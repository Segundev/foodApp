<script>
  // @ts-nocheck

  export let margin;
  export let xScale;
  export let height;
  export let width;

  import { timeParse } from "d3-time-format";
  let parseTime = timeParse("%b-%y");

  const xTicks = ["Jan-17", "Dec-18", "Jan-21", "Feb-23"];
  $: console.log(xTicks);
</script>

<line
  x2={width}
  y1={height - 30}
  y2={height - 30}
  stroke="#ddd"
  stroke-width="1"
/>
<g class="text" transform="translate({margin.left},{height})">
  {#each xTicks as year}
    <text x={xScale(parseTime(year))} y={-5}> {year} </text>
  {/each}
</g>

<style>
  text {
    font-size: 14px;
  }
</style>
