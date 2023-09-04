<script>
  // @ts-nocheck

  // import chart components - x and y axis, and chart tooltip
  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";
  import Tooltip from "./Tooltip.svelte";

  // export variables from chartExplorer component
  export let innerHeight;
  export let innerWidth;
  export let width;
  export let height;
  export let sumstat;
  export let pathline;
  export let xScale;
  export let yScale;
  export let margin;
  export let parseTime;

  // declare a variable expected to contain data when we mouseover the chart
  let hovered;
</script>

<!-- CHART CONTAINER -->
<div class="chart-wrapper">
  <svg {width} {height}>
    <AxisX {xScale} {height} {margin} />
    <AxisY {yScale} {width} {margin} />

    <g class="line" transform="translate({margin.left}, {margin.top})">
      {#each sumstat as foodItem}
        <path
          fill="none"
          stroke="black"
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
    {#if hovered}
      <Tooltip {xScale} {yScale} data={hovered} {innerHeight} />
    {/if}
  </svg>
</div>

<style>
</style>
