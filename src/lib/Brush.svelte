<script>
  // @ts-nocheck
  import { scaleLinear } from "d3-scale";
  import { minx, maxx } from "./settings.js";
  import { spring } from "svelte/motion";
  import { pannable } from "./pannable.js";
  import data from "./data.json";

  export let innerWidth, height; // width/height of parent
  export let margin;
  export let minX;
  export let maxX;

  // let handlewidth = 10;

  let leftmin = margin.right;
  $: leftmax = innerWidth;

  $: rightmin = leftmin;
  $: rightmax = innerWidth;

  let left = margin.right;
  let right;
  $: right = innerWidth - margin.right;

  $: _height = height - 10;

  $: xScale = scaleLinear()
    .domain([0, innerWidth])
    .range([0, data.length - 1]);

  function handlePanLeft(event) {
    let x = left + event.detail.dx;
    if (x > leftmin && x < leftmax) {
      left = x;
      let i = Math.round(xScale(x));
      minx.set(data[i].date);
      console.log($minx);
    }
  }

  function handlePanRight(event) {
    let x = right + event.detail.dx;
    if (x > rightmin && x < rightmax) {
      right = x;
      let i = Math.round(xScale(x));
      maxx.set(data[i].date);
      console.log($maxx);
    }
  }
</script>

<div class="date clickable">{minX}</div>
<div class="slider clickable">
  <div
    use:pannable
    on:panmove={handlePanLeft}
    class="handle startMarker"
    style="left: 0%;"
  >
    <div class="icon" style="background-color: red" />
  </div>
  <div class="interval" style="left: 0%; right: 0%;" />
  <div
    use:pannable
    on:panmove={handlePanRight}
    class="handle endMarker"
    style="left: 100%;"
  >
    <div class="icon" />
  </div>
</div>
<div class="date clickable">{maxX}</div>

<style>
  .date {
    font-size: 0.75rem;
    margin-right: 0;
  }

  .clickable {
    cursor: pointer;
  }

  .slider {
    box-sizing: content-box;
    background-clip: content-box;
    height: 4px;
    flex-grow: 1;
    background: #adb6c0;
    background-clip: border-box;
    border-radius: 5px;
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 16px;
    margin-right: 16px;
  }

  .handle {
    position: absolute;
    z-index: 1;
    margin-left: -14px;
    cursor: col-resize;
    padding: 10px 6px;
  }

  .icon {
    height: 16px;
    width: 16px;
    border-radius: 100%;
    background: #ffffff;
    border: 1.5px solid #0073e6;
    box-shadow: 0 2px 2px #00000026;
    z-index: 1;
    pointer-events: none;
  }

  .interval {
    position: absolute;
    height: 6px;
    background: #0073e6;
    background-clip: border-box;
    cursor: grab;
  }
</style>
