/*
* Author: Mihael Mamula
*/

// game states
window.onload = function() {
  var phaserGame = new Phaser.Game(1000, 480, Phaser.AUTO, "");
  phaserGame.state.add("PreLoad", loopGame.preLoad);
  phaserGame.state.add("Loading", loopGame.loadingScreen);
  phaserGame.state.add("StartScreen", loopGame.startScreen);
  phaserGame.state.add("Lvl1", loopGame.lvl1);
  phaserGame.state.add("Lvl2", loopGame.lvl2);
  phaserGame.state.add("Lvl3", loopGame.lvl3);
  phaserGame.state.add("EndScreen", loopGame.endScreen);
  phaserGame.state.add("Instructions", loopGame.instructions);
  phaserGame.state.start('PreLoad');
}

/*
* Functions for field tiles generating
*/
function randomGrass (num) {
  return (num % 2 == 0) ? 0 : 5;
}

function randomGrass2 (num) {
  return (num % 2 == 0) ? 3 : 4;
}

function randomGrass3 (num) {
  return (num % 2 == 0) ? 2 : 3;
}

/*
* Functions for mouse over
*/
function redText(text) {
  text.fill = 'red';
}

function whiteText(text) {
  text.fill = 'white';
}
