/*
 * Main menu screen
 * Options for specific level and instructions
 */

loopGame.startScreen = function (phaserGame) {};

loopGame.startScreen.prototype = {
  create: function() {
    title = this.add.text(500, 100, "Mage's Loop", {font: '64px Consolas', fill: 'white'});
    title.anchor.setTo(0.5, 0.5);

    lvl1Start = this.add.text(500, 200, "Level 1", {font: '32px Consolas', fill: 'white'});
    lvl1Start.anchor.setTo(0.5, 0.5);
    setTextOption(lvl1Start, 'Lvl1', this);

    lvl2Start = this.add.text(500, 230, "Level 2", {font: '32px Consolas', fill: 'white'});
    lvl2Start.anchor.setTo(0.5, 0.5);
    setTextOption(lvl2Start, 'Lvl2', this);

    lvl3Start = this.add.text(500, 260, "Level 3", {font: '32px Consolas', fill: 'white'});
    lvl3Start.anchor.setTo(0.5, 0.5);
    setTextOption(lvl3Start, 'Lvl3', this);

    instructions = this.add.text(500, 300, "Instructions", {font: '32px Consolas', fill: 'white'});
    instructions.anchor.setTo(0.5, 0.5);
    setTextOption(instructions, 'Instructions', this);

    player = this.add.sprite(500, 150, "player");
    player.anchor.setTo(0.5, 0.5);
    player.animations.add('walk_down',[0,1,2], 10, true);
    player.animations.play('walk_down');
  }

};

function setTextOption (txt, startWhat, context) {
  txt.inputEnabled = true;
  txt.events.onInputDown.add(function () {
    context.state.start(startWhat);
  }, this);
  txt.events.onInputOver.add(function (txt){redText(txt);}, this);
  txt.events.onInputOut.add(function (txt){whiteText(txt);}, this);
}
