/*
 * Loading screen
 */

loopGame.loadingScreen = function (phaserGame) {};

loopGame.loadingScreen.prototype = {
  preload: function () {
    title = this.add.text(500, 100, "Mage's Loop", {font: '64px Consolas', fill: 'white'});
    title.anchor.setTo(0.5, 0.5);
    loadingState = this.add.text(500, 240, "", {font: '32px Consolas', fill: 'white'});
    loadingState.anchor.setTo(0.5, 0.5);
    player = this.add.sprite(500, 200, "player");
    player.anchor.setTo(0.5, 0.5);
    player.animations.add('walk_right',[6,7,8], 25, true);
    player.animations.play('walk_right');
    this.load.spritesheet("greenEnemy","img/greenEnemy.png", 32, 32);
    this.load.spritesheet("grass","img/grass-tiles.png", 64, 64);
    this.load.spritesheet("fireball","img/fireball.png", 64, 64);
    this.load.spritesheet("explosion","img/explosion.png", 64, 64);
  },

  loadUpdate: function() {
    loadingState.setText("Loading " + this.load.progress + "%");
  },

  create: function() {
    this.state.start("StartScreen");
  }
};
