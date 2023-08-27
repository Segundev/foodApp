<script>
  import "../style.css";
  import Homepage from "./Homepage.svelte";
  import ChartExplorer from "./ChartExplorer.svelte";

  let state = "home";
</script>

<div class="main-container">
  {#if state === "home"}
    <Homepage on:clickNext={(e) => (state = e.detail)} />
  {:else if state === "chart"}
    <ChartExplorer />
  {/if}
</div>

<style>
  .main-container {
    height: 100vh;
    overflow: hidden;
  }
</style>
