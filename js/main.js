const HanoiGame = require('./solution/game.js');
const HanoiView = require('./hanoi-view.js');

$( () => {
  const rootEl = $('.snake');
  new SnakeView(rootEl);
});
