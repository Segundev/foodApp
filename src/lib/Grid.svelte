<script>
  import { onMount } from "svelte";

  // import modules
  import { scaleX, scaleY } from "./scaleAxis";
  import { curveCatmullRom, line } from "d3-shape"; /// to convert data into svg path
  import { timeParse } from "d3-time-format";

  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";

  export let sumstat;
  export let updatedData;

  // create dimensions and peripherals variables
  let svg;
  let width = 400;
  let height = 200;
  let margin = { top: 25, right: 25, bottom: 25, left: 25 };

  let innerHeight = Math.max(height - margin.top - margin.bottom, 0);
  $: innerWidth = Math.max(width - margin.left - margin.right, 0);

  let parseTime = timeParse("%b-%y");

  //  create x and y axis scales
  $: xScale = scaleX(updatedData, "date", innerWidth);
  $: yScale = scaleY(updatedData, "prices", innerHeight);

  // d3 line generator
  // a reactive variable that has value of d3-path to draw the lines
  $: pathline = line()
    .x((d) => xScale(parseTime(d.date)))
    .y((d) => yScale(d.prices))
    .curve(curveCatmullRom);

  onMount(resize);

  function resize() {
    ({ width, height } = svg.getBoundingClientRect());
  }
</script>

<svelte:window on:resize={resize} />
<div class="chart-wrapper">
  {#each sumstat as data, i}
    <div class="chart">
      <svg bind:this={svg}>
        <g class="linechart">
          <AxisX {xScale} height={innerHeight} {margin} />
          <AxisY {yScale} width={innerWidth} {margin} />
          <g>
            <path
              fill="none"
              stroke="black"
              stroke-width="2"
              d={pathline(data[1])}
            />
          </g>
        </g>
      </svg>
    </div>
  {/each}
</div>

<style>
  .chart-wrapper {
    width: 100%;
    max-width: 840px;
    height: calc(100% - 4em);
    min-height: 480px;
    margin: 2rem auto;
  }

  .chart {
    position: relative;
    width: 50%;
    height: 50%;
    float: left;
    padding: 2rem;
  }
</style>
