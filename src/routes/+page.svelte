<script>
	import CardDeck from '$lib/CardDeck.svelte';
	import Header from '$lib/Header.svelte';
	import GameUI from '$lib/GameUI.svelte';
	import { page } from '$app/stores';

</script>

<svelte:head>
	<title>Cardable</title>
	<meta name='description' content='card game' />
	<link rel='preconnect' href='https://fonts.googleapis.com'>
	<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>
	<link
		href='https://fonts.googleapis.com/css2?family=Noto+Sans+Symbols&family=Roboto+Condensed:ital,wght@0,100;1,500&display=swap'
		rel='stylesheet'>

</svelte:head>

<Header />

<section class:active={$page.data.round > 0}>

	<GameUI />

	<div class='player player-primary'>
		<div class='player-label'>Player 1</div>
		<CardDeck playerIndex={0} />
	</div>

	<div class='players'>
		<div class='player'>
			<div class='player-label'>Player 2</div>
			<CardDeck playerIndex={1} />
		</div>
		<div class='player'>
			<div class='player-label'>Player 3</div>
			<CardDeck playerIndex={2} />
		</div>
		<div class='player'>
			<div class='player-label'>Player 4</div>
			<CardDeck playerIndex={3}/>
		</div>
	</div>
</section>

<style lang='scss'>

  section {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    box-sizing: border-box;

    display: grid;
    grid-template-rows:  repeat(6, 1fr);

    .player-primary {
      grid-area: 1/1/5/-1;
    }

    .player {
      display: flex;
      justify-content: center;
      align-items: center;

      filter: blur(2px);
      opacity: 0.4;
      transition: opacity 1s;
    }

    .players {
      grid-area: 5 / 1 / -1 / -1;

      display: flex;
      flex-direction: row;

      .player {
        flex: 1 0 auto;
      }
    }

    &.active {
      .player {
        filter: none;
        opacity: 1;
      }
    }
  }

  .player {
    position: relative;

    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: linear-gradient(148deg, #FFF 19.43%, rgba(235, 235, 235, 0.29) 90.71%);
    }

    .player-label {
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 1;
      padding: 3rem var(--gutter);
    }
  }

</style>
