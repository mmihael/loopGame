/*
 * Final screen with results
 */

loopGame.endScreen = function (phaserGame) {};

loopGame.endScreen.prototype = {
  create: function() {
    title = this.add.text(500, 100, endScreenMessage, {font: '64px Consolas', fill: 'white'});
    title.anchor.setTo(0.5, 0.5);

    back = this.add.text(500, 200, "Back to start", {font: '32px Consolas', fill: 'white'});
    back.anchor.setTo(0.5, 0.5);
    setTextOption(back, 'StartScreen', this);

    player = this.add.sprite(500, 150, "player");
    player.anchor.setTo(0.5, 0.5);
    player.animations.add('walk_down',[0,1,2], 10, true);
    player.animations.play('walk_down');

    var iteration = this.add.text(500, 250, "Iterations: " + playerIterations, {font: '32px Consolas', fill: 'white'});
    iteration.anchor.setTo(0.5, 0.5);
    var loop = this.add.text(500, 300, "Loops: " + playerLoops, {font: '32px Consolas', fill: 'white'});
    loop.anchor.setTo(0.5, 0.5);

  }

};
