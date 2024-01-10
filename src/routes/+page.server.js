import Game from './game.js';

/** @satisfies {import('./$types').PageServerLoad} */
export const load = ({ cookies }) => {

	const game = new Game(cookies.get('card-game'));

	return {
		...game
	};
};

/** @satisfies {import('./$types').Actions} */
export const actions = {
	/**
	 * Modify game state in reaction to a keypress. If client-side JavaScript
	 * is available, this will happen in the browser instead of here
	 */
	update: async ({ cookies }) => {
		const game = new Game(cookies.get('card-game'));
		game.deal();
		cookies.set('card-game', game.toString(), { path: '' });
	},

	restart: async ({ cookies }) => {
		cookies.delete('card-game', { path: '' });
		const game = new Game(cookies.get('card-game'));
		game.deal();
		cookies.set('card-game', game.toString(), { path: '' });
	}
};
