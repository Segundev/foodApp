<script>
  import gsap from "gsap";
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  const dispatch = createEventDispatcher();

  onMount(() => {
    gsap.to(".spoon", {
      duration: 4,
      rotation: 360,
      repeat: -1,
      transformOrigin: "50% 50%",
      ease: "none",
    });
  });
</script>

<div class="homepage-wrapper">
  <div class="image-wrapper">
    <div class="background-mask">
      <img class="image-top" src="tea.svg" alt="food" />
      <img class="image-left" src="yoghurt.svg" alt="food" />
      <svg
        class="spoon"
        fill="#000000"
        height="800px"
        width="800px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 503.646 503.646"
        xml:space="preserve"
      >
        <g>
          <g>
            <path
              d="M493.825,9.804c-13.094-13.085-34.396-13.094-47.608,0.143L178.501,290.431c-37.326-15.284-89.919-1.032-131.332,38.727
			c-29.906,28.714-47.532,65.838-47.163,99.32c0.252,22.31,8.393,41.455,23.552,55.363c14.554,13.354,33.91,19.8,55.053,19.8
			c32.365,0,68.935-15.108,98.858-43.646c28.194-26.884,45.266-62.942,45.669-96.457c0.151-12.724-2.216-24.643-6.698-35.227
			L493.825,57.278C506.919,44.201,506.919,22.898,493.825,9.804z M81.472,366.861c-13.287,13.295-22.931,29.083-27.144,44.468
			c-3.408,12.406-2.652,22.981,1.964,27.598c3.282,3.273,3.282,8.586,0.008,11.868c-1.645,1.637-3.794,2.459-5.943,2.459
			s-4.297-0.823-5.934-2.459c-9.141-9.132-11.432-25.138-6.287-43.898c4.977-18.163,16.149-36.587,31.467-51.905
			c3.282-3.282,8.586-3.282,11.868,0C84.754,358.275,84.754,363.579,81.472,366.861z"
            />
          </g>
        </g>
      </svg>
      <img class="image-right" src="rice.svg" alt="food" />
      <img class="image-bottom" src="soup.svg" alt="food" />
    </div>
  </div>
  <header>
    <h1>Food Prices Observer</h1>
    <p>
      Track the average prices of 38 food items nationally. Prices are
      collected across all the 774 local government across all the
      States and the FCT.
    </p>
    <p class="data-source">
      Data Source: National Bureau of Statistics
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
      ><title>Next button</title><path
        d="M10,17L15,12L10,7V17Z"
      /></svg
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

  .background-mask svg {
    width: 4rem;
    height: 4rem;
    fill: #ffffff;
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
    animation-name: nextButton;
    animation-duration: 2s;
  }

  @keyframes nextButton {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }

    to {
      transform: none;
      opacity: 1;
    }
  }

  .button-wrapper:hover {
    background-color: #a0be7a;
    border-color: unset;
    color: white;
    cursor: pointer;
    transition-property: background-color;
    transition-duration: 1.5s;
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

  .data-source {
    margin-top: 1rem;
    font-size: 0.75rem;
    color: var(--lemon);
  }

  @media (width < 600px) {
    header {
      width: 375px;
    }

    header h1 {
      font-size: 3rem;
    }

    header p {
      font-size: 0.8rem;
    }
  }
</style>
