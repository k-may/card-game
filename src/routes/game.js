/**
 * Creates a deck of cards
 * @returns {Array.<{suit:string, value : string}>}
 */
export const generateDeck = () => {

	var suits = ['spades', 'diamonds', 'clubs', 'hearts'];
	var values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	let deck = new Array();

	for (let i = 0; i < suits.length; i++) {
		for (let x = 0; x < values.length; x++) {
			let card = { value: values[x], suit: suits[i] };
			deck.push(card);
		}
	}


	return deck;
};

export const MAX_HANDS = 5;

/**
 * Shuffle a deck of cards
 * see https://www.thatsoftwaredude.com/content/6196/coding-a-card-deck-in-javascript
 * @param deck
 */
export const shuffleDeck = (deck) => {

	// for 1000 turns
	// switch the values of two random cards
	for (let i = 0; i < 1000; i++) {
		let location1 = Math.floor((Math.random() * deck.length));
		let location2 = Math.floor((Math.random() * deck.length));
		let tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
};

/**
 * Serve a card from the deck
 *
 * The randomization is perhaps unnecessary, but it's a fun
 * @param deck
 * @returns {*}
 */
export const serveCard = (deck) => {
	const randIndex = Math.floor(Math.random() * deck.length);
	return deck.splice(randIndex, 1)[0];
};

/**
 * Sort a hand of cards
 * @param hand
 * @returns {Array.<{suit:string, value : string, cardValue : number}>}
 */
export const sortHand = (hand) => {
	return hand.map(card => {
		let cardValue = card.value;
		if (cardValue === 'A') cardValue = 14;
		if (cardValue === 'K') cardValue = 13;
		if (cardValue === 'Q') cardValue = 12;
		if (cardValue === 'J') cardValue = 11;
		return {
			...card,
			cardValue
		};
	}).sort((a, b) => {
		if (parseInt(a.cardValue) > parseInt(b.cardValue)) return 1;
		if (parseInt(a.cardValue) < parseInt(b.cardValue)) return -1;
		return 0;
	});
};

export default class Game {

	/** @type {Array.<{suit:string, value : string} | null>} **/
	hands = [];

	/** @type {Array<{suit:string, value : string}>} **/
	deck = [];

	round = -1;
	winner = -1;

	/**
	 * Create a game object from the player's cookie, or initialise a new game
	 * @param serialized
	 */
	constructor(serialized = undefined) {

		if (serialized) {
			const { round, winner, hands, deck } = JSON.parse(serialized);
			this.round = +round;
			this.hands = hands;
			this.deck = deck;
			this.winner = winner;
		} else {
			this.deck = generateDeck();
			shuffleDeck(this.deck);
			this.hands = [[], [], [], []];
			this.round = 0;
			this.winner = -1;

		}
	}

	/**
	 * Deal each player a card and update the round
	 */
	deal() {

		if (this.round < MAX_HANDS) {
			this.hands.forEach(hand => {
				const card = serveCard(this.deck);
				hand.push(card);
			});
			this.round++;
		}
	}


	/**
	 * Serialize game state so it can be set as a cookie
	 */
	toString() {

		return JSON.stringify({
			round: this.round,
			hands: this.hands,
			deck: this.deck,
			winner: this.winner
		});
	}

}