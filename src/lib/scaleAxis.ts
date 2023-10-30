import * as d3 from "d3";
import { scaleLinear, scaleTime } from "d3-scale"; // to scale data into dimensions
import { timeParse } from "d3-time-format"; // d3 timeparse fo convert string to Date Object
import { extent, max } from "d3-array"; // for data manipulation

// set a variable that has a function value that converts string to Date
let parseTime = timeParse("%b-%y");

export function scaleX(data, x, width, minRange) {
  const scalex = scaleTime()
    .domain(extent(data, (d) => parseTime(d[x])))
    .range([minRange, width]);
  return scalex;
}

export function scaleY(data, y, height) {
  const scaley = scaleLinear()
    .domain([0, max(data, (d) => d[y])])
    .range([height, 0]);
  return scaley;
}
