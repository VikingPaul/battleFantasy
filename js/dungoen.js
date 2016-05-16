"use strict";
var dungeon;
var level;
var PlayerX;
var whichBoss;
var boss;
var battlebackground
var dungeonState = {
  create: function() {
    lastPage = 'dungoen'
    battlebackground = 'battleIndoorStone'
    game.world.resize(3840, 2688);
    game.camera.x = gameCameraX;
    game.camera.y = gameCameraY;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    ground = game.add.group();
    hole = game.add.group();
    hole.enableBody = true;
    let maxWidth = 28;
    let maxHeight = 40;
    for (let i = 0; i < maxHeight; i++) {
      for (let j = 0; j < maxWidth; j++) {
        if (dungeon.FirstLevel[j][i] === 1) {
          ledge = hole.create(i*96,j*96, "stoneWall");
          ledge.body.immovable = true;
        } else if (dungeon.FirstLevel[j][i] === 2) {
          ground.create(i*96,j*96, "stoneFloor");
        } else if (dungeon.FirstLevel[j][i] === 1) {
          ground.create(i*96,j*96, "stoneStairs");
        } else if (dungeon.FirstLevel[j][i] === 3) {
          ground.create(i*96,j*96, "stoneUp");
        } else if (dungeon.FirstLevel[j][i] === 4) {
          ground.create(i*96,j*96, "stoneDown");
        }
      }
    }
    player = game.add.sprite(playerWidth, playerHeight, 'characterMovement');
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(hole);
    player.body.collideWorldBounds = true;
    player.animations.add('left', [4, 5, 6, 7], 10, true);
    player.animations.add('right', [4, 5, 6, 7], 10, true);
    player.animations.add('up', [0, 1, 2, 3], 10, true);
    player.animations.add('down', [0, 1, 2, 3], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    if (level === 2) {
      dungeonState.level2()
    }
  },
  update: function() {
    player.body.velocity.y=0;
    player.body.velocity.x=0;
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    if (player.world.y >= 1240 && player.world.y <= 1496 && player.world.x >= 1680 && player.world.x <= 1936 && boss === true && level === 2) {
      whichBoss = 1;
      game.state.start('bossFight');
    }
    if (enterKey.isDown) {
      if (player.world.y === 2496) {
        if (player.world.x >= 2112 && player.world.x <= 2208) {
          if (level === 1 && spaceKey.isDown) {
            PlayerX = player.world.x;
            dungeonState.level2();
          } else if (level === 2 && !spaceKey.isDown) {
            PlayerX = player.world.x;
            dungeonState.level1();
          }
        } else if (player.world.x >= 1344 && player.world.x <= 1440) {
          if (level === 1 && spaceKey.isDown) {
            PlayerX = player.world.x;
            dungeonState.level2();
          } else if (level === 2) {
            PlayerX = player.world.x;
            dungeonState.level1();
          }
        } else if (level === 1 &&player.world.x >= 1728 && player.world.x <= 1824) {
          console.log("exit");
          playerHeight = 3168;
          playerWidth = 3360;
          game.state.start('world');
        }
      }
    }
    game.physics.arcade.collide(player, hole);
    if (cursors.up.isDown) {
      player.body.velocity.y = -350;
      player.animations.play('up');
      battleTest();
      if (player.world.y < game.camera.y+1) {
        game.camera.y -= 500;
      }
    } else if (cursors.down.isDown) {
      player.body.velocity.y = 350;
      player.animations.play('down');
      battleTest();
      if (player.world.y > game.camera.y+500) {
        game.camera.y += 500;
      }
    } else if (cursors.left.isDown) {
      player.body.velocity.x = -350;
      player.animations.play('left');
      battleTest();
      if (player.world.x < game.camera.x+1) {
        game.camera.x -= 800;
      }
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 350;
      player.animations.play('right');
      battleTest();
      if (player.world.x > game.camera.x+800) {
        game.camera.x += 800;
      }
    } else {
      player.animations.stop();
    }
  },
  level1: function() {
    game.world.removeAll();
    level = 1;
    game.world.resize(3840, 2688);
    game.camera.x = 1400;
    game.camera.y = 2048;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    ground = game.add.group();
    hole = game.add.group();
    hole.enableBody = true;
    let maxWidth = 28;
    let maxHeight = 40;
    for (let i = 0; i < maxHeight; i++) {
      for (let j = 0; j < maxWidth; j++) {
        if (dungeon.FirstLevel[j][i] === 1) {
          ledge = hole.create(i*96,j*96, "stoneWall");
          ledge.body.immovable = true;
        } else if (dungeon.FirstLevel[j][i] === 2) {
          ground.create(i*96,j*96, "stoneFloor");
        } else if (dungeon.FirstLevel[j][i] === 1) {
          ground.create(i*96,j*96, "stoneStairs");
        } else if (dungeon.FirstLevel[j][i] === 3) {
          ground.create(i*96,j*96, "stoneUp");
        } else if (dungeon.FirstLevel[j][i] === 4) {
          ground.create(i*96,j*96, "stoneDown");
        }
      }
    }
    player = game.add.sprite(PlayerX, 2496, 'characterMovement');
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(hole);
    player.body.collideWorldBounds = true;
    player.animations.add('left', [4, 5, 6, 7], 10, true);
    player.animations.add('right', [4, 5, 6, 7], 10, true);
    player.animations.add('up', [0, 1, 2, 3], 10, true);
    player.animations.add('down', [0, 1, 2, 3], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
  },
  level2: function() {
    game.world.removeAll();
    level = 2;
    game.world.resize(3840, 2688);
    game.camera.x = gameCameraX;
    game.camera.y = gameCameraY;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    ground = game.add.group();
    hole = game.add.group();
    hole.enableBody = true;
    let maxWidth = 28;
    let maxHeight = 40;
    for (let i = 0; i < maxHeight; i++) {
      for (let j = 0; j < maxWidth; j++) {
        if (dungeon.SecondLevel[j][i] === 1) {
          ledge = hole.create(i*96,j*96, "stoneWall");
          ledge.body.immovable = true;
        } else if (dungeon.SecondLevel[j][i] === 2) {
          ground.create(i*96,j*96, "stoneFloor");
        } else if (dungeon.SecondLevel[j][i] === 1) {
          ground.create(i*96,j*96, "stoneStairs");
        } else if (dungeon.SecondLevel[j][i] === 3) {
          ground.create(i*96,j*96, "stoneUp");
        } else if (dungeon.SecondLevel[j][i] === 4) {
          ground.create(i*96,j*96, "stoneDown");
        }
      }
    }
    if (boss) {
      ledge = hole.create(1776,1336, "level1Boss");
      ledge.body.immovable = true;
    }
    player = game.add.sprite(playerWidth, playerHeight, 'characterMovement');
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(hole);
    player.body.collideWorldBounds = true;
    player.animations.add('left', [4, 5, 6, 7], 10, true);
    player.animations.add('right', [4, 5, 6, 7], 10, true);
    player.animations.add('up', [0, 1, 2, 3], 10, true);
    player.animations.add('down', [0, 1, 2, 3], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
  }
};