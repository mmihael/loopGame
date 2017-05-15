/*
* LEVEL 1
*/

var x = 1; // x in for loop
var step = 32; // size of tile
var playerX = 0; // position of player
var playerY = 0; //
var directions = ['down','left','up','right']; // direction string for animations
var directionFrames = [1,4,11,7]; // frames associated with directions
var direction = 0; // current direction 0 - 3
var rotate = 0; // how much to rotate clockwise
var endScreenMessage = ''; // feedback after level is completed
var maxIterations = 0; // optimal number of iterations
var maxLoops = 0; // optimal number of for loop enterings
var playerIterations = 0; // player iterations counter
var playerLoops = 0; // player loop enterings counter

loopGame.lvl1 = function (phaserGame) {};

loopGame.lvl1.prototype = {
  create: function () {

    //
    // Level specific setup
    maxIterations = 11;
    maxLoops = 2;
    playerIterations = 0;
    playerLoops = 0;
    x = 1;
    playerX = 0;
    playerY = 0;
    direction = 0;

    // ground texture generating
    for (var i = 0; i < 15; i++)
      for (var j = 0; j < 15; j++) {
        var tile = this.add.sprite(i*32, j*32, 'grass', randomGrass(i+j));
        tile.scale.x = 0.5;
        tile.scale.y = 0.5;
      }

    // grid lines
    line = this.add.graphics(0, 0);
    line.lineStyle (1, 0xff0000, 0.3);
    for (var i = 0; i <= 480; i += 32)
    {
      line.moveTo (i, 0);
      line.lineTo (i, 480);
      line.moveTo (0, i);
      line.lineTo (480, i);
    }

    /*
    * Player controlls
    */
    forLoop = this.add.text(485, 5, "for ( x = " + x +" ) {", {font: '32px Consolas', fill: 'white'});

    // move command
    moveAction = this.add.text(485, 45, "player.move();", {font: '32px Consolas', fill: 'white'});
    moveAction.inputEnabled = true;
    moveAction.events.onInputDown.add(moveActionF, this);
    moveAction.events.onInputOver.add(function (moveAction){redText(moveAction);}, this);
    moveAction.events.onInputOut.add(function (moveAction){whiteText(moveAction);}, this);

    // rotate clockwise command
    rotateAction = this.add.text(485, 85, "player.rotate();", {font: '32px Consolas', fill: 'white'});
    rotateAction.inputEnabled = true;
    rotateAction.events.onInputDown.add(rotateActionF, this);
    rotateAction.events.onInputOver.add(function (rotateAction){redText(rotateAction);}, this);
    rotateAction.events.onInputOut.add(function (rotateAction){whiteText(rotateAction);}, this);

    this.add.text(485, 125, "}", {font: '32px Consolas', fill: 'white'});

    // incerase x
    var xPlus = this.add.text(485, 205, "x++;", {font: '32px Consolas', fill: 'white'});
    xPlus.inputEnabled = true;
    xPlus.events.onInputDown.add(xUp, this);
    xPlus.events.onInputOver.add(function (xPlus){redText(xPlus);}, this);
    xPlus.events.onInputOut.add(function (xPlus){whiteText(xPlus);}, this);

    // decrease x
    var xMinus = this.add.text(485, 245, "x--;", {font: '32px Consolas', fill: 'white'});
    xMinus.inputEnabled = true;
    xMinus.events.onInputDown.add(xDown, this);
    xMinus.events.onInputOver.add(function (xMinus){redText(xMinus);}, this);
    xMinus.events.onInputOut.add(function (xMinus){whiteText(xMinus);}, this);

    // cast fireball command
    shootAction = this.add.text(485, 325, "player.shoot();", {font: '32px Consolas', fill: 'white'});
    shootAction.inputEnabled = true;
    shootAction.events.onInputDown.add(shootActionF, this);
    shootAction.events.onInputOver.add(function (shootAction){redText(shootAction);}, this);
    shootAction.events.onInputOut.add(function (shootAction){whiteText(shootAction);}, this);

    // player sprite animations
    player = this.add.sprite(playerX, playerY, 'player', 1);
    player.animations.add('walk_down',[0,1,2], 10, true);
    player.animations.add('walk_left',[3,4,5], 10, true);
    player.animations.add('walk_up',[9,10,11], 10, true);
    player.animations.add('walk_right',[6,7,8], 10, true);
    this.physics.arcade.enable(player);

    // fireball animations
    fireball = this.add.sprite(50, 50, 'fireball', 0);
    fireball.kill();
    fireball.scale.x = 0.5;
    fireball.scale.y = 0.5;
    fireball.animations.add('fire_down',[48,49,50,51,52,53,54,55], 30, true);
    fireball.animations.add('fire_left',[0,1,2,3,4,5,6,7], 30, true);
    fireball.animations.add('fire_up',[16,17,18,19,20,21,22,23], 30, true);
    fireball.animations.add('fire_right',[32,33,34,35,36,37,38,39], 30, true);
    this.physics.arcade.enable(fireball);

    // enemy animations
    greenEnemy = this.add.sprite(32*7, 32*7, 'greenEnemy', 1);
    this.physics.arcade.enable(greenEnemy);
    greenEnemy.animations.add('idle',directionFrames, 0.5, true);
    greenEnemy.animations.play('idle');

    // explosion animation
    explosion = this.add.sprite(32*8, 32*8, 'explosion', 1);
    explosion.kill();
    explosion.scale.x = 0.5;
    explosion.scale.y = 0.5;
    explosion.animations.add('boom',null, 20, false);
    explosion.events.onAnimationComplete.add(function (explosion){
      explosion.kill();
      player.frame = directionFrames[direction];
    }, this);

  },

  update: function () {
    // repaint x in for loop
    forLoop.text = "for ( x = " + x +") {";

    // check collision of fireball and enemy
    this.physics.arcade.collide(fireball, greenEnemy, hitEnemy, null, this);

    // after move command if player position is not same as desired
    // animate and walk forward
    if (player.position.y < playerY) {
      player.position.y += 1;
      player.animations.play('walk_' + directions[direction]);

      if (player.position.y == playerY) {
        player.animations.stop('walk_' + directions[direction]);
        player.frame = directionFrames[direction];
      }
    }
    else if (player.position.y > playerY) {
      player.position.y -= 1;
      player.animations.play('walk_' + directions[direction]);

      if (player.position.y == playerY) {
        player.animations.stop('walk_' + directions[direction]);
        player.frame = directionFrames[direction];
      }
    }


    if (player.position.x < playerX) {
      player.position.x += 1;
      player.animations.play('walk_' + directions[direction]);

      if (player.position.x == playerX) {
        player.animations.stop('walk_' + directions[direction]);
        player.frame = directionFrames[direction];
      }
    }
    else if (player.position.x > playerX) {
      player.position.x -= 1;
      player.animations.play('walk_' + directions[direction]);

      if (player.position.x == playerX) {
        player.animations.stop('walk_' + directions[direction]);
        player.frame = directionFrames[direction];
      }
    }

    // after rotate command change direction of player
    if (rotate > 0) {
      if (direction < 3)
        direction++;
      else
        direction = 0;
      rotate --;
      player.frame = directionFrames[direction];
    }

    // remove fireball if it is outside of play area
    if (fireball.alive && (fireball.position.x < 0 || fireball.position.x > 448 || fireball.position.y < 0 || fireball.position.y > 448)) {
      fireball.kill();
      player.frame = directionFrames[direction];
    }

    // after enemy is dead check if commands were optimal for level completion
    // and activate end screen
    if (!greenEnemy.alive && !explosion.alive) {
      if (playerIterations > maxIterations || playerLoops > maxLoops) {
        endScreenMessage = "Commands are not optimal!";
      } else {
        endScreenMessage = "Good job!";
      }
      this.state.start("EndScreen");
    }
  }

};

// change x functions and check boundaries
function xUp  () {
  if (x < 14)
    x ++;
}

function xDown  () {
  if (x > 1)
    x --;
}

// update player iterations
// set desired position and check boundaries for move action
function moveActionF () {
  playerIterations += x;
  playerLoops++;
  if (direction == 0)
    playerY += step * x;
  else if (direction == 2)
    playerY -= step * x;
  else if (direction == 1)
    playerX -= step * x;
  else if (direction == 3)
    playerX += step * x;

  if (playerX > 448)
    playerX = 448;
  else if (playerX < 0)
    playerX = 0;

  if (playerY > 448)
    playerY = 448;
  else if (playerY < 0)
    playerY = 0;

}

// update player iterations
// and set desired number of 90 degrees rotations
function rotateActionF () {
  rotate = x;
  playerIterations += x;
  playerLoops++;
}

// update player iterations
// play fireball animation after shoot command
function shootActionF () {
  playerIterations++;
  fireball.revive();
  fireball.position.x = player.position.x;
  fireball.position.y = player.position.y;

  fireball.animations.play('fire_' + directions[direction]);

  fireball.body.velocity.x = 0;
  fireball.body.velocity.y = 0;

  if (direction == 0)
    fireball.body.velocity.y = 150;
  else if (direction == 2)
    fireball.body.velocity.y = -150;
  else if (direction == 1)
    fireball.body.velocity.x = -150;
  else if (direction == 3)
    fireball.body.velocity.x = +150;

  player.frame = directionFrames[direction] - 1;
}

// after collision is detected remove enemy and play animation
function hitEnemy () {
  explosion.revive();
  explosion.position.x = greenEnemy.position.x;
  explosion.position.y = greenEnemy.position.y;
  explosion.animations.play('boom');
  greenEnemy.kill();
  fireball.kill();
}
