<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div class="homepage-wrapper">
  <div class="image-wrapper">
    <div class="background-mask">
      <img class="image-top" src="tea.svg" alt="food" />
      <img class="image-left" src="yoghurt.svg" alt="food" />
      <img class="image-right" src="rice.svg" alt="food" />
      <img class="image-bottom" src="soup.svg" alt="food" />
    </div>
  </div>
  <header>
    <h1>Food Prices Observer</h1>
    <p>
      In recent years, multiple, consecutive crises, including the COVID-19
      pandemic and Russia’s illegal war of aggression against Ukraine, have
      threatened economic resilience and wellbeing worldwide.
    </p>
  </header>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="button-wrapper"
    on:click={() => {
      dispatch("clickNext", "chart");
    }}
  >
    <div>Next</div>
    <svg viewBox="0 0 24 24"
      ><title>Next button</title><path d="M10,17L15,12L10,7V17Z" /></svg
    >
  </div>
</div>

<style>
  .homepage-wrapper {
    background-color: var(--green);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .image-wrapper {
    margin-top: -4rem;
  }

  .background-mask {
    height: 18rem;
    width: 18rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* grid-template-rows: repeat(3, 1fr); */
  }

  img {
    width: 4rem;
    height: 4rem;
  }

  .image-top,
  .image-bottom {
    grid-column: 2;
  }

  .image-left {
    grid-column: 1;
  }

  .image-right {
    grid-column: 3;
  }

  header {
    text-align: center;
    width: 600px;
    margin: 0 auto;
  }

  header h1 {
    font-family: "Lancelot";
    font-size: 3.5rem;
    color: var(--white);
  }

  header p {
    font-size: 0.9rem;
    color: var(--peach);
  }

  .button-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1.5rem;
    border: 2px solid var(--lemon);
    margin-top: 1rem;
  }

  .button-wrapper div {
    font-size: 1.2rem;
    color: var(--peach);
  }

  .button-wrapper svg {
    height: 2rem;
    width: 2rem;
    fill: var(--lemon);
  }
</style>
