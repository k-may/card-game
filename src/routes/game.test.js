import { describe, it, expect } from 'vitest';
import Game, { sortHand } from './game.js';

describe('game tests', () => {
	it('serializes the game state', () => {

		const game = new Game();
		game.round = 2;
		const serialized = game.toString();
		const {round} = JSON.parse(serialized);
		expect(round).toBe(2);

	});

	it('deals a hand', () => {

		const game = new Game();
		const countBefore = game.deck.length;
		game.deal();
		const countAfter = game.deck.length;
		expect(countBefore - countAfter).toBe(4);

		const hands = game.hands;
		expect(hands.length).toBe(4);

		expect(hands[0].length).toBe(1);
	});

	it("updates the round", () => {
		const game = new Game();
		expect(game.round).toBe(0);
		game.deal();
		expect(game.round).toBe(1);
	});

	it("sorts the hand correctly", () => {

		const hand = [
			{ suit: 'hearts', value : "K" },{ suit: 'hearts', value : "2" },{ suit: 'hearts', value : "Q" },{ suit: 'hearts', value : 10 }];
		const sortedHand = sortHand(hand);
		expect(sortedHand[0].value).toBe("2");
		expect(sortedHand[1].value).toBe(10);
	});
});