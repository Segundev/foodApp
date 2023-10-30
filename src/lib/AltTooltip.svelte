<script>
  // @ts-nocheck

  //--------------------------------------------
  // IMPORT SVELTE DEPENDENCIES
  //--------------------------------------------
  import { tweened } from "svelte/motion";
  import { cubicOut, cubicIn } from "svelte/easing";
  import { fade } from "svelte/transition";

  //--------------------------------------------
  // IMPORT D3 DEPENDENCIES
  //--------------------------------------------

  import { max } from "d3-array";

  export let data;
  export let yAccessor;
  export let xAccessor;
  export let positionOnChart;
  export let width;
  export let height;
  export let xScale;
  export let yScale;
  export let formatTime;
  export let parseTime;
  export let scaleColor;

  const transitionDuration = 200;
  const tweenedTransition = {
    duration: transitionDuration,
    easing: cubicOut,
  };

  let dataPoint = data.filter(
    (d) => xAccessor(d) === formatTime(xAccessor(positionOnChart))
  );

  //tweened coordinates
  let nearestDataX = tweened(
    dataPoint.map((d) => xScale(parseTime(xAccessor(d)))),
    tweenedTransition
  );

  let nearestDataY = tweened(
    dataPoint.map((d) => yScale(yAccessor(d))),
    tweenedTransition
  );

  $: {
    dataPoint = data.filter(
      (d) => xAccessor(d) === formatTime(xAccessor(positionOnChart))
    );

    nearestDataX.set(
      dataPoint.map((d) => xScale(parseTime(xAccessor(d)))),
      tweenedTransition
    );

    nearestDataY.set(
      dataPoint.map((d) => yScale(yAccessor(d))),
      tweenedTransition
    );
  }

  $: console.log($nearestDataX, $nearestDataY);
</script>

<!-- Tooltip Group -->
<div
  transition:fade={{ duration: transitionDuration, easing: cubicIn }}
  class="tooltip"
  style="left:{$nearestDataX[0]}px; top:{$nearestDataY[0]}px"
>
  <div class="date">{formatTime(positionOnChart.date)}</div>
  <div class="prices-wrapper">
    <table class="series-list">
      <tbody>
        {#each dataPoint as d, i}
          <tr>
            <td class="series-color">
              <div
                class="swatch"
                style="background-color:{scaleColor(d.foodItem)}"
              />
            </td>
            <td class="series-name"> {d.fullname}</td>
            <td class="series-value">{d.prices}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .tooltip {
    max-width: 400px;
    border-radius: 4px;
    border: 1px solid #e7e7e7;
    box-shadow: 0 4px 40px #0003;
    background: white;
    text-align: left;
    position: absolute;
    pointer-events: none;
    font-size: 16px;
  }

  .tooltip .date {
    background: #f0f0f0;
    color: #000;
    padding: 8px 12px;
    border-radius: 3px 3px 0 0;
  }

  .tooltip .prices-wrapper {
    padding: 8px 12px;
  }

  table.series-list {
    color: #2d2d2d;
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    white-space: normal;
    border-collapse: collapse;
    width: 100%;
  }

  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }

  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }

  table.series-list td.series-color {
    padding-left: 0;
  }

  table.series-list td.series-name {
    padding-right: 0.9em;
    line-height: 16px;
    width: 100%;
  }

  table.series-list td.series-value {
    font-weight: 700;
    text-align: right;
    white-space: nowrap;
  }

  td .swatch {
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-right: 0.3em;
    text-align: left;
    position: relative;
  }
</style>
