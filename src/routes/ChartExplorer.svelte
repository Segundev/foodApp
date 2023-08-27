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
        <div class="button-select button-food-item">select food item</div>
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

  .button-select {
    font-size: 0.85rem;
    border: 1px solid #cdcdcd;
    padding: 0.5rem 1rem;
    color: #acacac;
    text-align: center;
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

    .button-food-item {
      width: 12rem;
      margin: 0 auto;
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
