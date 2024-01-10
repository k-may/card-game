<script>
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';

    /**
     * Game UI displays the current round and a button to start the next round.
     */

</script>

<div class='ui'>
    <form method='POST' action='?/update' use:enhance={() => {
		// prevent default callback from resetting the form
		return ({ update }) => {
			update({ reset: false });
		};
	}}>
        {#if $page.data.round > 0}
            {#if $page.data.round === 5}
                <button formaction='?/restart'>PLAY AGAIN</button>
            {:else}
                <button class='button-started' formaction='?/update'>DEAL NEXT ROUND</button>
            {/if}
        {:else}
            <button class='start'>START NEW GAME</button>
        {/if}
    </form>
    <div class='ui-tab' class:visible={$page.data.round > 0 && $page.data.round < 5}>
        <div>CURRENT ROUND</div>
        <ul data-round='{$page.data.round}'>
            {#each { length: 5 } as _, i}
                <li data-id={_} class:highlight={i <= 3}></li>
            {/each}
        </ul>
    </div>
</div>

<style lang='scss'>

  .ui {
    grid-area: 3 / 1 / 5 / -1;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    text-align: center;
    gap: 2rem;
    position: relative;
    z-index: 2;
    overflow: hidden;

    .ui-tab {
      background-color: white;
      padding: 1rem 3rem 0;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      box-shadow: 0px 0px 16.3px 0px rgba(0, 0, 0, 0.05);

      opacity: 0;
      transform: translate(0, 100%);

      &.visible {
        opacity: 1;
        transform: translate(0,0);
        transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
      }

      ul {
        list-style: none;
        display: flex;
        flex-direction: row;
        gap: 0.75rem;
        justify-content: center;
        align-items: center;
        padding: 0.5rem 0;
        margin: 0;

        li {
          width: 0.875rem;
          height: 0.875rem;
          border-radius: 0.2rem;
          background-color: #D9D9D9;
        }

        &[data-round='1'] li:nth-child(1) {
          background-color: var(--color-primary);
        }

        &[data-round='2'] li:nth-child(-n+2) {
          background-color: var(--color-primary);
        }

        &[data-round='3'] li:nth-child(-n+3) {
          background-color: var(--color-primary);
        }

        &[data-round='4'] li:nth-child(-n+4) {
          background-color: var(--color-primary);
        }

        &[data-round='5'] li:nth-child(-n+5) {
          background-color: var(--color-primary);
        }

      }
    }

    button {
      background-color: var(--color-primary);

      &.button-started {
        background-color: var(--color-secondary);
      }
    }

  }


</style>