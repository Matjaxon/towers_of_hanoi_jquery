function HanoiView(game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupTowers();
  this.bindEvents();
  this.pendingMove = [];
}

HanoiView.prototype.setupTowers = function() {
  const $board = $("<ul>").addClass('board').addClass('group');

  for (let i = 0; i < 3; i++) {
    const $tower = $("<li>").addClass('tower').attr("data-pos", i);
    const $stack = $("<ul>").addClass('stack');

    $tower.append($stack);
    $board.append($tower);
  }
  this.$el.append($board);
  this.render();
};

HanoiView.prototype.render = function() {
  $('.selected').removeClass('selected');
  this.pendingMove = [];
  const towers = {1: "first", 2: "second", 3:"third"};

  this.game.towers.forEach( (tower, idx) => {
    const $stack = $('.stack').eq(idx);
    $stack.empty();
    tower.forEach( (diskVal) => {
      const $disk = $("<li>").addClass('disk').attr("id", `${towers[diskVal]}`);
      $stack.prepend($disk);
    });
  });

  if (this.game.isWon()) {
    alert("You won!");
    $('.tower').off('click');
  }
};

HanoiView.prototype.bindEvents = function() {

  const $towers = $('.tower');

  $towers.on('click', event => {

    let $targetEl = $(event.currentTarget);
    $targetEl.addClass('selected');
    this.pendingMove.push($targetEl.data('pos'));
    if (this.pendingMove.length === 2) {
      if (this.game.isValidMove(...this.pendingMove)) {
        this.game.move(...this.pendingMove);
      } else {
        alert("Invalid move");
      }
      this.render();
    }
  });
};

module.exports = HanoiView;
