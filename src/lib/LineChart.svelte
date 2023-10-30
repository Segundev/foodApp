<script>
  // @ts-nocheck

  // import modules
  import { scaleX, scaleY } from "./scaleAxis";

  // import chart components - x and y axis, and chart tooltip
  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";
  import AltTooltip from "./AltTooltip.svelte";

  // import d3 dependencies
  import { curveCatmullRom, line } from "d3-shape"; /// to convert data into svg path
  import { timeParse, timeFormat } from "d3-time-format";
  import { scaleOrdinal, scaleLinear, scaleTime } from "d3-scale";
  import { schemeSet1 } from "d3-scale-chromatic";
  import { min, extent, max } from "d3-array";

  let parseTime = timeParse("%b-%y");
  let formatTime = timeFormat("%b-%y");

  // export variables from chartExplorer component
  export let sumstat;
  export let updatedData;
  export let foodItems;

  // create margins, chart boundaries and dimensions
  // create margins, chart boundaries and dimensions
  export let width = 400;
  export let height;
  let margin = {
    top: 25,
    bottom: 25,
    left: 25,
  };

  $: margin.right = width < 400 ? 70 : 120;
  $: innerHeight = height - margin.top - margin.right;
  $: innerWidth = width - margin.left - margin.right;

  $: dms = {
    width,
    height,
    margin,
    innerHeight,
    innerWidth,
  };

  const xAccessor = (d) => d.date;
  const yAccessor = (d) => d.prices;

  // reactive scale on the horizontal and vertical axis, Mapping date and prices variables to create scaled axis within chart boundaries
  $: xScale = scaleTime()
    .domain(extent(updatedData, (d) => parseTime(xAccessor(d))))
    .range([margin.left, dms.innerWidth]);

  $: yScale = scaleLinear()
    .domain([0, max(updatedData, (d) => yAccessor(d))])
    .range([dms.innerHeight, margin.bottom]);

  // create an array of color scheme and color scales
  let scaleColor = scaleOrdinal().domain(foodItems).range(schemeSet1);

  // a reactive variable that has value of d3-path to draw the lines
  $: pathline = line()
    .x((d) => xScale(parseTime(d.date)))
    .y((d) => yScale(d.prices))
    .curve(curveCatmullRom);

  //-------------------------------------------------------------------------
  //  TOOLTIP  DATA - this falttens the data from a multi array to a single
  //  array
  //-------------------------------------------------------------------------
  /*  $: tooltipData = sumstat
    .flat(Infinity)
    .filter(
      (item) => typeof item === "object" && !Array.isArray(item)
    )
    .map((obj, index) => ({ index, ...obj }));
 */

  // declare a variable expected to contain data when we mouseover the chart
  let hovered;

  //-------------------------------------------------------------------------
  //  TOOLTIP ON HOVER - This section is to try out if i canget the data on a
  //  single rect
  //-------------------------------------------------------------------------

  let hoveredEvent = null;
  let mousePosition = {};
  let positionOnChart = {};

  $: {
    // calculate mouse position from event
    if (hoveredEvent) {
      mousePosition.x = hoveredEvent.layerX - 45;
      mousePosition.y = hoveredEvent.layerY - margin.top;

      // is mouse within chart but outside the coverage of the data
      let nearestYear = xScale.invert(mousePosition.x);
      let minYear = min(updatedData, (d) => parseTime(xAccessor(d)));
      nearestYear = nearestYear >= minYear ? nearestYear : minYear;

      positionOnChart = {
        date: nearestYear,
        prices: updatedData
          .filter((d) => d.date === formatTime(nearestYear))
          .map((d) => yAccessor(d)),
      };
    }
  }
</script>

<!-- CHART CONTAINER -->

<svg width={dms.width} height={dms.height}>
  <g
    class="inner-chart"
    transform="translate({margin.left} {margin.top})"
  >
    <defs>
      <clipPath id="boundClip">
        <rect
          x={margin.left}
          y={0}
          width={innerWidth}
          height={innerHeight}
        />
      </clipPath>
    </defs>
    <rect
      x={40}
      y={30}
      width={innerWidth}
      height={innerHeight}
      fill="none"
    />
    <g class="DualAxisView">
      <AxisX
        {xScale}
        height={dms.innerHeight}
        width={dms.innerWidth}
        margin={dms.margin}
      />
      <AxisY
        {yScale}
        width={dms.innerWidth}
        height={dms.innerHeight}
      />
    </g>

    <g
      class="line"
      transform="translate({margin.left}, {margin.top})"
    >
      {#each sumstat as foodItem}
        <path
          fill="none"
          stroke={scaleColor(foodItem[0])}
          stroke-width="2"
          d={pathline(foodItem[1])}
        />
      {/each}
    </g>
    <rect
      id="listener-layer"
      x={25}
      y={0}
      width={dms.innerWidth}
      height={dms.innerHeight}
      fill="transparent"
      on:mouseover={(e) => (hoveredEvent = e)}
      on:focus={(e) => (hoveredEvent = e)}
      on:mousemove={(e) => (hoveredEvent = e)}
      on:mouseleave={() => (hoveredEvent = null)}
      on:mouseout={() => (hoveredEvent = null)}
      on:blur={() => (hoveredEvent = null)}
      on:touchend={() => (hoveredEvent = null)}
    />
  </g>
</svg>
{#if hoveredEvent}
  <AltTooltip
    {positionOnChart}
    {xScale}
    {yScale}
    data={updatedData}
    {formatTime}
    {parseTime}
    {xAccessor}
    {yAccessor}
    {scaleColor}
    width={innerWidth}
    height={innerHeight}
  />
{/if}

<style>
</style>
