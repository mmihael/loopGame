/*
 * Instructions screen
 */

loopGame.instructions = function (phaserGame) {};

loopGame.instructions.prototype = {
  create: function() {
    title = this.add.text(500, 100, "Instructions", {font: '64px Consolas', fill: 'white'});
    title.anchor.setTo(0.5, 0.5);

    var instruction = this.add.text(500, 150, "Goal of game is killing all enemies in minimal number", {font: '16px Consolas', fill: 'white'});
    instruction.anchor.setTo(0.5, 0.5);
    instruction = this.add.text(500, 165, "of function calls and for loop enterings.", {font: '16px Consolas', fill: 'white'});
    instruction.anchor.setTo(0.5, 0.5);
    instruction = this.add.text(500, 195, "Use rotate() for clocockwise rotating of character", {font: '16px Consolas', fill: 'white'});
    instruction.anchor.setTo(0.5, 0.5);
    instruction = this.add.text(500, 210, "Use move() to go forward in current direction", {font: '16px Consolas', fill: 'white'});
    instruction.anchor.setTo(0.5, 0.5);
    instruction = this.add.text(500, 225, "Use shoot() to cast fireball", {font: '16px Consolas', fill: 'white'});
    instruction.anchor.setTo(0.5, 0.5);
    instruction = this.add.text(500, 255, "Use x++ and x-- to control iterations of for loop", {font: '16px Consolas', fill: 'white'});
    instruction.anchor.setTo(0.5, 0.5);

    back = this.add.text(500, 440, "Back to start", {font: '32px Consolas', fill: 'white'});
    back.anchor.setTo(0.5, 0.5);
    setTextOption(back, 'StartScreen', this);
  }
};
