<script>

    /**
     * Card Component
     *
     * Features back and front sides of a card, including flip animation
     */

    /** type 'hearts' | 'clubs' | 'diamonds' | 'spades'  **/
    export let suit = '';

    // @type string
    export let value = '';

    /**
     * Force the flip transition to play
     * @type boolean
     * @default false
     *
     */
    export let flip = false;

    let suitSymbol = '';

    $ : {

        switch (suit) {
            case 'spades' :
                suitSymbol = '♠';
                break;
            case 'hearts' :
                suitSymbol = '♥';
                break;
            case 'diamonds' :
                suitSymbol = '♦';
                break;
            case 'clubs' :
                suitSymbol = '♣';
                break;
        }
    }

    $: isFlipped = !!suit && !!value;

</script>
<div class='card card__{suit}' class:flipped={isFlipped} class:flip={flip}>
    <div>
        <div class='card__back'></div>
        <div class='card__face'>

            <div class='card-label'>
                <div>{value}</div>
                <div class='symbol'>{suitSymbol}</div>
            </div>

            <div class='card-label card-label__bottom'>
                <div>{value}</div>
                <div class='symbol'>{suitSymbol}</div>
            </div>

            <div class='card-symbols card-symbols__{value}'>
                {#each { length: 10 } as _, i}
                    <div>{suitSymbol}</div>
                {/each}

            </div>
        </div>
    </div>
</div>

<style lang='scss'>

  div.card {

    width: 177px;
    height: 241px;
    position: relative;

    perspective: 500px;

    &.card__hearts, &.card__diamonds {
      color: var(--color-highlight);
    }

    > div {
      box-shadow: 2.148px 0.859px 16.625px 0px rgba(0, 0, 0, 0.25);
      position: absolute;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;

      border-radius: 10px;
    }

    @keyframes flipCard {
      0% {
        transform: rotateY(0deg);
      }

      100% {
        transform: rotateY(180deg);
      }
    }

    &.flipped:not(.flip) {
      > div {
        transform-origin: center;
        transform: rotate3d(0, 1, 0, 180deg);
      }
    }

    &.flip {
      > div {
        transform-origin: center;
        animation: flipCard 1s ease-out forwards;
      }
    }

    div.card__face, div.card__back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 10px;
    }

    div.card__back {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.14) 0%, rgba(0, 0, 0, 0.14) 100%), linear-gradient(161deg, #45C2FF -5.06%, #325BB3 113.31%);
    }

    div.card__face {
      background-color: white;
      transform: rotateY(180deg);
      padding: 10px;
      box-sizing: border-box;
    }

    .card-label {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: fit-content;
      position: absolute;
      top: 10px;
      left: 10px;

      > div:first-of-type {
        font-size: 43px;
      }

      &__bottom {
        top: unset;
        left: unset;
        bottom: 10px;
        right: 10px;
        transform: rotate(180deg);
      }
    }

    .card-symbols {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: grid;
      grid-template-rows: repeat(5, 1fr);
      grid-template-columns: repeat(2, 1fr);
      gap: 20px 35px;

      > div {
        //display: none;
        //visibility: hidden;
      }

      > div:nth-child(n + 6) {
        transform: rotate(180deg);
      }

      &.card-symbols__10 {
        > div {
          visibility: visible;
        }
      }

      &.card-symbols__9 {
        > div:nth-child(n + 6) {
          visibility: hidden;
        }

        > div:nth-child(n + 7) {
          visibility: visible;
        }
      }

      &.card-symbols__8 {
        > div:nth-child(n + 5) {
          visibility: hidden;
        }

        > div:nth-child(n + 7) {
          visibility: visible;
        }
      }

      &.card-symbols__7 {
        > div:nth-child(n + 5) {
          visibility: hidden;
        }

        > div:nth-child(n + 8) {
          visibility: visible;
        }
      }

      &.card-symbols__6 {
        > div:nth-child(n + 4) {
          visibility: hidden;
        }

        > div:nth-child(n + 8) {
          visibility: visible;
        }
      }

      &.card-symbols__5 {
        > div:nth-child(n + 4) {
          visibility: hidden;
        }

        > div:nth-child(n + 9) {
          visibility: visible;
        }
      }

      &.card-symbols__4 {
        > div:nth-child(n + 3) {
          visibility: hidden;
        }

        > div:nth-child(n + 9) {
          visibility: visible;
        }
      }

      &.card-symbols__3 {
        > div:nth-child(n + 3) {
          visibility: hidden;
        }

        > div:nth-child(n + 10) {
          visibility: visible;
        }
      }

      &.card-symbols__2 {
        > div:nth-child(n + 2) {
          visibility: hidden;
        }

        > div:nth-child(n + 10) {
          visibility: visible;
        }
      }

      &.card-symbols__A, &.card-symbols__K, &.card-symbols__Q, &.card-symbols__J {
        > div {
          visibility: hidden;
        }
      }
    }
  }

</style>