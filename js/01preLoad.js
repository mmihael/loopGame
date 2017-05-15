/*
 * Basic game setup
 */

var loopGame = {};

loopGame.preLoad = function (phaserGame) {};

loopGame.preLoad.prototype = {
  init: function () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.minWidth = 500;
    this.scale.minHeight = 250;
    this.scale.maxWidth = 2000;
    this.scale.maxHeight = 1000;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },
  preload: function () {
    this.load.spritesheet("player","img/player.png", 32, 32);
  },
  create: function () {
    this.stage.disableVisibilityChange = false;
    this.input.maxPointers = 1;
    this.state.start("Loading");
  }
};
