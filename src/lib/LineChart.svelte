<script>
  // @ts-nocheck

  // import modules
  import { scaleX, scaleY } from "./scaleAxis";

  // import chart components - x and y axis, and chart tooltip
  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";
  import Tooltip from "./Tooltip.svelte";

  // import d3 dependencies
  import { curveCatmullRom, line } from "d3-shape"; /// to convert data into svg path
  import { timeParse } from "d3-time-format";
  import { scaleOrdinal } from "d3-scale";
  import { schemePaired } from "d3-scale-chromatic";

  let parseTime = timeParse("%b-%y");

  // export variables from chartExplorer component
  export let sumstat;
  export let updatedData;
  export let foodItems;

  // create margins, chart boundaries and dimensions
  // create margins, chart boundaries and dimensions
  export let width = 500;
  export let height = 340;
  let margin = {
    top: 40,
    bottom: 40,
    left: 75,
    right: 30,
  };
  let innerHeight = height - margin.top - margin.right;
  $: innerWidth = width - margin.left - margin.right;

  $: dms = {
    width,
    height,
    margin,
    innerHeight,
    innerWidth,
  };

  // reactive scale on the horizontal and vertical axis, Mapping date and prices variables to create scaled axis within chart boundaries
  $: xScale = scaleX(updatedData, "date", dms.innerWidth);
  $: yScale = scaleY(updatedData, "prices", dms.innerHeight);

  // create an array of color scheme and color scales
  let scaleColor = scaleOrdinal()
    .domain(foodItems)
    .range(schemePaired);

  // a reactive variable that has value of d3-path to draw the lines
  $: pathline = line()
    .x((d) => xScale(parseTime(d.date)))
    .y((d) => yScale(d.prices))
    .curve(curveCatmullRom);

  // declare a variable expected to contain data when we mouseover the chart
  let hovered;

  $: console.log(dms.width);
</script>

<!-- CHART CONTAINER -->

<svg width={dms.width} height={dms.height}>
  <AxisX {xScale} height={dms.height} {width} margin={dms.margin} />
  <AxisY {yScale} width={dms.width} />

  <g class="line" transform="translate({margin.left}, {margin.top})">
    {#each sumstat as foodItem}
      <path
        fill="none"
        stroke={scaleColor(foodItem[0])}
        stroke-width="2"
        d={pathline(foodItem[1])}
      />
    {/each}
  </g>
  <!-- <g>
      {#each sumstat as d}
        {#each d[1] as foodItem}
          <g
            class="masked-rect"
            transform="translate({xScale(parseTime(foodItem.date))} 0)"
          >
            <rect
              on:mouseenter={() => (hovered = fooditem)}
              opacity="0"
              x="-{xScale(parseTime(d[1][1].date)) / 2}"
              width={xScale(parseTime(d[1][1].date)) -
                xScale(parseTime(data[1][0].date))}
              height={innerHeight}
            />
          </g>
        {/each}
      {/each}
    </g> -->
  <!-- {#if hovered}
      <Tooltip
        {xScale}
        {yScale}
        data={hovered}
        {innerHeight}
      />
    {/if} -->
</svg>

<style>
</style>
