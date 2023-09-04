<script>
  // @ts-nocheck
  import { onMount } from "svelte";

  import LineChart from "../lib/LineChart.svelte";
  import data from "../lib/data.json";

  // import d3 dependencies
  import { scaleLinear, scaleOrdinal } from "d3-scale"; // to scale data into dimensions
  import { min, max, extent, groups } from "d3-array"; // for data manipulation
  import { timeParse } from "d3-time-format"; // d3 timeparse fo convert
  import { curveCatmullRom, line } from "d3-shape"; /// to convert data into svg path

  // create margins, chart boundaries and dimensions
  let margin = { top: 25, right: 25, bottom: 25, left: 25 };
  let height = 400;
  let width = 400;

  // inner chart boundaries - innerWidth is a reactive variable to screen width responsiveness
  let innerHeight = height - margin.top - margin.bottom;
  $: innerWidth = width - margin.left - margin.right;

  // @ts-ignore - List of selected food items
  let selected = ["icedSardine"];
  const foodItems = [...new Set(data.map((d) => d.foodItem))];

  let closeDropdown;
  let active = false;

  function toggleDropdown() {
    active = !active;
    if (active) {
      closeDropdown.textContent = "Close";
    } else {
      closeDropdown.textContent = "select food items";
    }
  }

  // @ts-ignore - Data is updated and selected based on fooditems selected from list of checkbox items
  $: updatedData = selected
    .map((s) => data.filter((d) => s === d.foodItem))
    .flat();

  // data is nested(grouped) into an array of key(foodIems) and value(all data particular to the fooditem)
  $: sumstat = groups([...updatedData], (d) => d.foodItem);

  // set a variable that has a function value that converts string to Date
  let parseTime = timeParse("%b-%y");

  // reactive scale on the horizontal and vertical axis, Mapping date and prices variables to create scaled axis within chart boundaries
  $: xScale = scaleLinear()
    .domain(extent(updatedData, (d) => parseTime(d.date)))
    .range([margin.left, innerWidth]);

  $: yScale = scaleLinear()
    .domain([0, max(updatedData, (d) => +d.prices)])
    .range([innerHeight, margin.bottom]);

  // a reactive variable that has value of d3-path to draw the lines
  $: pathline = line()
    .x((d) => xScale(parseTime(d.date)))
    .y((d) => yScale(+d.prices))
    .curve(curveCatmullRom);
</script>

<div>
  <div class="header-wrapper">
    <header>
      <h2>Title of the Dashboard</h2>
      <p>
        In recent years, multiple, consecutive crises, including the COVID-19
        pandemic and Russia’s illegal war of aggression against Ukraine, have
        threatened economic resilience and wellbeing worldwide.
      </p>
    </header>
    <div class="select-buttons">
      <div class="flex-wrapper">
        <div class="dropdown-container">
          <div
            bind:this={closeDropdown}
            on:click={toggleDropdown}
            class="button-select button-food-item"
            id="closedropdown"
          >
            select food item
          </div>
          <div class="dropdown-wrapper" class:active>
            <div class="dropdown">
              {#each foodItems as foodItem}
                <label>
                  <input
                    type="checkbox"
                    bind:group={selected}
                    value={foodItem}
                  />
                  {foodItem}
                </label>
              {/each}
            </div>
            <div>Clear Selection</div>
          </div>
        </div>
        <div class="button-grid-wrapper">
          <div class="button-select button-food-prices">food prices</div>
          <div class="button-select button-percentage-change">
            percentage changes
          </div>
          <div class="chart-select">
            <div class="button-select button-grid">Grid</div>
            <div class="button-select button-linechart">Line Chart</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="chart-wrapper" bind:clientWidth={width}>
  <LineChart
    {innerWidth}
    {innerHeight}
    {height}
    {width}
    {sumstat}
    {pathline}
    {yScale}
    {xScale}
    {margin}
    {parseTime}
  />
</div>

<style>
  .header-wrapper {
    background-color: #feffda;
    padding-top: 1rem;
    border-bottom: 3px solid #606060;
  }

  header {
    text-align: center;
    max-width: 740px;
    margin: 0 auto;
  }

  header h2 {
    font-family: "Lancelot";
    font-size: 2rem;
  }

  header p {
    font-size: 0.85rem;
    line-height: 1.3;
    color: #7e7e7e;
  }

  .flex-wrapper {
    margin: 1rem 0;
    display: flex;
    justify-content: space-around;
  }

  .dropdown-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .dropdown-wrapper {
    display: none;
  }

  .dropdown-wrapper.active {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 350px;
    top: 3.5rem;
    z-index: 99;
    overflow-y: auto;
  }

  .dropdown {
    display: flex;
    flex-direction: column;
    border: 0.5px solid #cdcdcd;
  }

  label {
    border: 1px solid transparent;
    background-color: #fefefe;
    padding: 10px;
    font-size: 0.9rem;
    margin: 0;
    width: 100%;
    border-bottom: 0.5px solid #cdcdcd;
  }

  .button-select {
    font-size: 0.85rem;
    border: 1px solid #cdcdcd;
    padding: 0.5rem 1rem;
    color: #acacac;
    text-align: center;
  }

  .button-food-item {
    width: 12rem;
    margin: 0 auto;
  }

  .button-select:active,
  .button-select:hover {
    border-color: #606060;
    background-color: #f9f9f9;
    color: #3f3f3f;
    cursor: pointer;
  }

  .chart-select {
    margin-left: 2rem;
  }

  .button-grid-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.3rem;
  }

  .button-linechart {
    display: none;
  }

  @media (width < 650px) {
    header p {
      font-size: 0.75rem;
    }

    .flex-wrapper {
      display: block;
    }

    .button-grid-wrapper {
      position: fixed;
      bottom: 0;
      display: grid;
      grid-template-columns: repeat(3, auto);
      width: 100%;
      gap: 0;
    }

    .chart-select {
      margin-left: 0;
    }
  }
</style>
