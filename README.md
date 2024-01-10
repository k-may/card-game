# CardABLE

A technical excercise for Provable (pun intended).

I've had fun building this, I hope you enjoy playing it.

**Acceptance criteria:**
- [x] Have 4 players seated with 5 face down cards
- [x] Show button as “Start New Game” when there is no game going 
- [x] When clicking “Start New Game” all players are dealt one card and the Current
round is set to 1
- [x] Show button as “Deal Next Round” during a game
- [x] When Clicking“Deal Next Round” a new card is dealt to all players and the round is
advanced 1
- [x] Show “Current Round” only while a game is going on
- [x] Show Card slots that will be available to players during further rounds
- [x] Do not use U+1F0A1 → U+1F0A0 or icons/svgs/art for card representations
- [x] You may use: U+2660 →U+2663 ( ♠ ♥ ♦ ♣ )
- [x] Cards should be ordered in ascending colour order (♠→♥→♦→♣) order, followed by
2..10→JQKA, and in each players hand
- [x] The newly dealt card for the round should be highlighted in some way

## Design

I've used figma to organize the design : https://www.figma.com/file/j10BrJO1SZ2h1mWq2DsMGV/Untitled?type=design&node-id=0%3A1&mode=dev

Its a fairly simple design, I wanted to design something I could build in a few hours. I decided to make the UI first person, with all controls and UI centered in the page.

I'd designed a mobile layout as well, but I didn't have time to implement it.

## Architecture

I've used [SvelteKit](https://kit.svelte.dev/) to build the app.

### Frontend

I decided to use Svelte for this project, I'm a fan of the framework and I think it's a great fit for this project. 

### Backend

Any mutation on the game state is done on the server, the thinking was that it may be necessary to encrypt some aspects of the game (considering we're playing poker here). I also thought it would be a little easier to test the game logic this way.


### Game Logic
Game state is stored in cookies, and is persisted between browser restarts.

### Testing

#### Unit tests
```bash
npm run test:unit
```

#### Integration tests
```bash
npm run test:integration
```

### Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```
