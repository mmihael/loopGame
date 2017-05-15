/*
 * LEVEL 3
 */

loopGame.lvl3 = function (phaserGame) {};

loopGame.lvl3.prototype = {
  create: function () {

    maxIterations = 18;
    maxLoops = 7;
    playerIterations = 0;
    playerLoops = 0;
    x = 1;
    playerX = 32*2;
    playerY = 32*14;
    direction = 0;

    for (var i = 0; i < 15; i++)
      for (var j = 0; j < 15; j++) {
        var tile = this.add.sprite(i*32, j*32, 'grass', randomGrass3(i+j));
        tile.scale.x = 0.5;
        tile.scale.y = 0.5;
      }

    line = this.add.graphics(0, 0);
    line.lineStyle (1, 0xff0000, 0.3);
    for (var i = 0; i <= 480; i += 32)
    {
      line.moveTo (i, 0);
      line.lineTo (i, 480);
      line.moveTo (0, i);
      line.lineTo (480, i);
    }

    forLoop = this.add.text(485, 5, "for ( x = " + x +" ) {", {font: '32px Consolas', fill: 'white'});

    moveAction = this.add.text(485, 45, "player.move();", {font: '32px Consolas', fill: 'white'});
    moveAction.inputEnabled = true;
    moveAction.events.onInputDown.add(moveActionF, this);
    moveAction.events.onInputOver.add(function (moveAction){redText(moveAction);}, this);
    moveAction.events.onInputOut.add(function (moveAction){whiteText(moveAction);}, this);

    rotateAction = this.add.text(485, 85, "player.rotate();", {font: '32px Consolas', fill: 'white'});
    rotateAction.inputEnabled = true;
    rotateAction.events.onInputDown.add(rotateActionF, this);
    rotateAction.events.onInputOver.add(function (rotateAction){redText(rotateAction);}, this);
    rotateAction.events.onInputOut.add(function (rotateAction){whiteText(rotateAction);}, this);

    this.add.text(485, 125, "}", {font: '32px Consolas', fill: 'white'});

    var xPlus = this.add.text(485, 205, "x++;", {font: '32px Consolas', fill: 'white'});
    xPlus.inputEnabled = true;
    xPlus.events.onInputDown.add(xUp, this);
    xPlus.events.onInputOver.add(function (xPlus){redText(xPlus);}, this);
    xPlus.events.onInputOut.add(function (xPlus){whiteText(xPlus);}, this);

    var xMinus = this.add.text(485, 245, "x--;", {font: '32px Consolas', fill: 'white'});
    xMinus.inputEnabled = true;
    xMinus.events.onInputDown.add(xDown, this);
    xMinus.events.onInputOver.add(function (xMinus){redText(xMinus);}, this);
    xMinus.events.onInputOut.add(function (xMinus){whiteText(xMinus);}, this);


    shootAction = this.add.text(485, 325, "player.shoot();", {font: '32px Consolas', fill: 'white'});
    shootAction.inputEnabled = true;
    shootAction.events.onInputDown.add(shootActionF, this);
    shootAction.events.onInputOver.add(function (shootAction){redText(shootAction);}, this);
    shootAction.events.onInputOut.add(function (shootAction){whiteText(shootAction);}, this);

    player = this.add.sprite(playerX, playerY, 'player', 1);
    player.animations.add('walk_down',[0,1,2], 10, true);
    player.animations.add('walk_left',[3,4,5], 10, true);
    player.animations.add('walk_up',[9,10,11], 10, true);
    player.animations.add('walk_right',[6,7,8], 10, true);
    this.physics.arcade.enable(player);

    fireball = this.add.sprite(50, 50, 'fireball', 0);
    fireball.kill();
    fireball.scale.x = 0.5;
    fireball.scale.y = 0.5;
    fireball.animations.add('fire_down',[48,49,50,51,52,53,54,55], 30, true);
    fireball.animations.add('fire_left',[0,1,2,3,4,5,6,7], 30, true);
    fireball.animations.add('fire_up',[16,17,18,19,20,21,22,23], 30, true);
    fireball.animations.add('fire_right',[32,33,34,35,36,37,38,39], 30, true);
    this.physics.arcade.enable(fireball);

    enemies = this.add.group();
    this.physics.arcade.enable(enemies);
    var positions = [3,3,7,7,12,12];
    for (var i = 0; i < positions.length;i+=2) {
      var enemy = enemies.create(32*positions[i], 32*positions[i+1], 'greenEnemy', 1);
      this.physics.arcade.enable(enemy);
      enemy.animations.add('idle',directionFrames, 0.5, true);
      enemy.animations.play('idle');
    }

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
    forLoop.text = "for ( x = " + x +") {";
    this.physics.arcade.collide(fireball, enemies, hitEnemyGroup, null, this);
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


    if (rotate > 0) {
      if (direction < 3)
        direction++;
      else
        direction = 0;
      rotate --;
      player.frame = directionFrames[direction];
    }

    if (fireball.alive && (fireball.position.x < 0 || fireball.position.x > 448 || fireball.position.y < 0 || fireball.position.y > 448)) {
      fireball.kill();
      player.frame = directionFrames[direction];
    }

    if (enemies.countLiving() == 0 && !explosion.alive) {
      if (playerIterations > maxIterations || playerLoops > maxLoops) {
        endScreenMessage = "Commands are not optimal!";
      } else {
        endScreenMessage = "Good job!";
      }
      this.state.start("EndScreen");
    }
  }

};
