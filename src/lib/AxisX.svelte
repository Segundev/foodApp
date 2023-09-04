<script>
  // @ts-nocheck

  export let margin;
  export let xScale;
  export let height;

  import { timeParse } from "d3-time-format";
  let parseTime = timeParse("%b-%y");

  const xTicks = ["Jan-17", "Dec-18", "Jan-21", "Feb-23"];
  $: console.log(xTicks);
</script>

<g class="text" transform="translate({margin.left},{height})">
  {#each xTicks as year}
    <text x={xScale(parseTime(year))} y={-20}> {year} </text>
  {/each}
</g>

<style>
  text {
    font-size: 10px;
  }
</style>
