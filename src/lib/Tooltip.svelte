<script>
  export let data;
  export let xScale;
  export let yScale;
  export let innerHeight;
  import { timeParse } from "d3-time-format";
  let parseTime = timeParse("%y-%b");
</script>

<g
  fill="red"
  transform="translate({xScale(parseTime(data.date))} {yScale(data.prices)})"
>
  <text
    text-anchor="middle"
    font-size="12"
    font-weight="bold"
    fill="hsl(0, 0%, 10%)"
    y="-3">{data.prices}</text
  >
  <path
    opacity="0.75"
    fill="blue"
    stroke="hsl(0, 0%, 10%)"
    stroke-width="0.5"
    stroke-dasharray="1"
    d="M 0 0 v {innerHeight - yScale(data.wheatFlour)}"
  />
  <circle r="2" fill="red" />
</g>
