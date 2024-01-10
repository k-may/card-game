
<script>

    import Card from '$lib/Card.svelte';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { sortHand } from '../routes/game.js';

    //-------------------------------------------------------

    /**
     * Card Deck Component include 5 cards and resizes to fit its container.
     */

    /** @type number **/
    export let playerIndex = -1;

    let content;
    let container;

    /** @type { { suit: string, value: string, cardValue?: number , flip?: boolean}[] } **/
    let cards = [];

    $: {

        /**
         * Well sort the cards here in the component, rather than in the game logic, implementations could be different
         * and we want to keep this as extensible as possible.
         */
        let newCards = sortHand($page.data.hands[playerIndex]);
        if(cards.length !== newCards.length) {

            /** @type { { suit: string, value: string, cardValue?: number , flip?: boolean} | undefined } **/
            let newCard;

            if (newCards.length - cards.length === 1) {
                newCard = newCards.find(c => {
                    return !cards.find(nc => nc.suit === c.suit && nc.cardValue?.toString() === c.cardValue.toString());
                });
            }

            cards = newCards;

            if (newCard)
                newCard.flip = true;
        }
    }


    onMount(() => {

        let resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(container);

    });


    const handleResize = () => {

        //since we're required to not use any svg, and there's no
        //clear way to resize these elements with css, we'll need to scale the elements
        //dynamically to fit the containing element.

        let availableWidth = container.clientWidth;
        let availableHeight = container.clientHeight;

        let width = content.offsetWidth;
        let height = content.offsetHeight;

        let scale = Math.min(1, Math.min(availableWidth / width, availableHeight / height));
        content.style.transform = `scale(${scale}, ${scale})`;

    };
</script>

<div class='card-deck'>

    <div bind:this={container}>
        <div bind:this={content}>
            {#each { length: 5 } as _, i}
                {@const card = cards[i] || { suit: "", value: "" } }
                <Card suit='{card.suit}' value='{card.value}' flip='{card.flip}' />
            {/each}
        </div>
    </div>
</div>
<style lang='scss'>

  div.card-deck {
    width: 100%;
    height: 100%;
    padding: var(--gutter);
    box-sizing: border-box;

    > div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 1;

      > div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 30px;
        width: fit-content;
        height: fit-content;
        position: absolute;
      }
    }
  }

</style>