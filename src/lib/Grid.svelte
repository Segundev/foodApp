<script>
  // @ts-nocheck
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
  let rect;
  export let width;
  export let height;
  let margin = { top: 25, right: 25, bottom: 25, left: 25 };

  $: innerHeight = height - margin.top - margin.bottom;
  $: innerWidth = width - margin.left - margin.right;

  $: dms = {
    width,
    height,
    margin,
    innerHeight,
    innerWidth,
  };

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

  let w;
  let h;

  function resize() {
    let x = rect.getBoundingClientRect();
    w = x.width;
    h = x.height;
  }

  $: console.log(w);
</script>

<svelte:window on:resize={resize} />

<svg width={dms.width} height={dms.height}>
  <rect />
  {#each sumstat as data, i}
    <g bind:this={rect} class="chart">
      <g class="linechart">
        <g>
          <path
            fill="none"
            stroke="black"
            stroke-width="2"
            d={pathline(data[1])}
          />
        </g>
      </g>
    </g>
  {/each}
</svg>

<style>
  .chart {
    position: relative;
    width: 50%;
    height: 50%;
    float: left;
    padding: 2rem;
  }
</style>
