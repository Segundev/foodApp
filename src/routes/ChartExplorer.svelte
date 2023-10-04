<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import Grid from "../lib/Grid.svelte";
  import LineChart from "$lib/LineChart.svelte";
  import data from "$lib/data.json";

  // import d3 dependencies
  import { groups } from "d3-array"; // for data manipulation

  // @ts-ignore - List of selected food items
  let selected = ["icedSardine"];
  const foodItems = [...new Set(data.map((d) => d.foodItem))];

  // @ts-ignore - Data is updated and selected based on fooditems selected from list of checkbox items
  $: updatedData = selected
    .map((s) => data.filter((d) => s === d.foodItem))
    .flat();

  // data is nested(grouped) into an array of key(foodIems) and value(all data particular to the fooditem)
  $: sumstat = groups([...updatedData], (d) => d.foodItem);

  let closeDropdown;
  let active = false;
  let grid = true;

  function toggleDropdown() {
    active = !active;
    if (active) {
      closeDropdown.textContent = "Close";
    } else {
      closeDropdown.textContent = "select food items";
    }
  }

  let rect;
  let width = 540;
  let height = 340;

  onMount(resize);

  function resize() {
    ({ width, height } = rect.getBoundingClientRect());
    console.log(width);
    console.log(height);
  }
</script>

<svelte:window on:resize={resize} />
<div>
  <div class="header-wrapper">
    <header>
      <h2>Title of the Dashboard</h2>
      <p>
        In recent years, multiple, consecutive crises, including the
        COVID-19 pandemic and Russia’s illegal war of aggression
        against Ukraine, have threatened economic resilience and
        wellbeing worldwide.
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
          <div class="button-select button-food-prices">
            food prices
          </div>
          <div class="button-select button-percentage-change">
            percentage changes
          </div>
          <div on:click={() => (grid = !grid)} class="chart-select">
            <div class="button-select button-grid">Grid</div>
            <div class="button-select button-linechart">
              Line Chart
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div>
  <main>
    <figure class="chart-wrapper">
      <div bind:this={rect} class="graph-component">
        {#if grid}
          <LineChart
            {updatedData}
            {sumstat}
            {foodItems}
            {width}
            {height}
          />
        {:else}
          <Grid {sumstat} {updatedData} />
        {/if}
      </div>
    </figure>
  </main>
</div>

<style>
  main {
    min-height: 340px;
  }
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

  figure.chart-wrapper {
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: column;
    margin: 0 auto;
    padding-top: 1.2rem;
    width: 100%;
    max-width: 1190px;
    min-height: 340px;
    height: calc(100vh - 240px);
    position: relative;
  }

  .graph-component {
    width: 100%;
    height: 100%;
    display: inline-block;
    border-bottom: none;
    text-align: left;
    line-height: 1em;
    background: white;
    color: #333;
    position: relative;
    container-type: size;
    container-name: grapher;
    border-radius: 2px;
    box-shadow: #0000001a 0 0 2px, #00000040 0 2px 2px;
    z-index: 1;
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
