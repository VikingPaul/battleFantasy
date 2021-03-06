"use strict";
var gameCameraY;
var gameCameraX;
var lastPage;
var hole;
var player;
var ledge;
var ground;
var counter;
var worldState = {
  create: function() {
    lastPage = 'world';
    battlebackground = 'battleOutdoorGrass'
    game.world.resize(4000, 4000);
    game.camera.x = gameCameraX;
    game.camera.y = gameCameraY;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    ground = game.add.group();
    hole = game.add.group();
    hole.enableBody = true;
    let maxWidth = Math.ceil(game.world.width/96);
    let maxHeight = Math.ceil(game.world.height/96);
    for (let i = 0; i < maxHeight; i++) {
      for (let j = 0; j < maxWidth; j++) {
        if (i > 0 && i < maxHeight-1 && j > 0 && j < maxWidth-1) {
          ground.create(j*96,i*96, 'grass');
        } else if (i < 1 && j < 1) {
          ledge = hole.create(j*96,i*96, "grassHole");
          ledge.body.immovable = true;
        } else if (i > maxHeight-2 && j >maxWidth-2) {
          ledge = hole.create(j*96,i*96, "grassHole");
          ledge.body.immovable = true;
        } else if (i < 1 && j > maxWidth-2) {
          ledge = hole.create(j*96,i*96, "grassHole");
          ledge.body.immovable = true;
        } else if (i > maxHeight-2 && j <1) {
          ledge = hole.create(j*96,i*96, "grassHole");
          ledge.body.immovable = true;
        } else if (i < 1) {
          ledge = hole.create(j*96,i*96, "grassHoleBottom");
          ledge.body.immovable = true;
        } else if (j > maxWidth-2) {
          ledge = hole.create(j*96,i*96, "grassHoleLeft");
          ledge.body.immovable = true;
        } else if (j < 1) {
          ledge = hole.create(j*96,i*96, "grassHoleRight");
          ledge.body.immovable = true;
        } else if (i > maxHeight-2) {
          ledge = hole.create(j*96,i*96, "grassHoleTop");
          ledge.body.immovable = true;
        }

        if (i === 4 && j >= 1 && j <3) {
          ledge = hole.create(i*96,j*96, "stoneWall");
          ledge.body.immovable = true;
        } else if (i === 6 && j >= 1 && j <3) {
          ledge = hole.create(i*96,j*96, "stoneWall");
          ledge.body.immovable = true;
        } else if (i === 5 && j === 2) {
          ledge = hole.create(i*96,j*96, "stoneShop");
          ledge.body.immovable = true;
        } else if (i >= 4 && i <= 6 && j === 1) {
          ledge = hole.create(i*96,j*96, "stoneWall");
          ledge.body.immovable = true;
        } else if (i === 4 && j === 3) {
          ledge = hole.create(i*96-16,j*96, "stoneWall");
          ledge.body.immovable = true;
        } else if (i === 6 && j === 3) {
          ledge = hole.create(i*96+16,j*96, "stoneWall");
          ledge.body.immovable = true;
        }
        if (i === 34 && j >= 31 && j <33) {
          ledge = hole.create(i*96,j*96, "stoneWall");
          ledge.body.immovable = true;
        } else if (i === 36 && j >= 31 && j <33) {
          ledge = hole.create(i*96,j*96, "stoneWall");
          ledge.body.immovable = true;
        } else if (i === 35 && j === 32) {
          ledge = hole.create(i*96,j*96, "stoneStairs");
          ledge.body.immovable = true;
        } else if (i >= 34 && i <= 36 && j === 31) {
          ledge = hole.create(i*96,j*96, "stoneWall");
          ledge.body.immovable = true;
        } else if (i === 34 && j === 33) {
          ledge = hole.create(i*96-16,j*96, "stoneWall");
          ledge.body.immovable = true;
        } else if (i === 36 && j === 33) {
          ledge = hole.create(i*96+16,j*96, "stoneWall");
          ledge.body.immovable = true;
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
  },
  update: function() {
    game.physics.arcade.collide(player, hole);
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.addOnce(this.pause, this);
    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    if (enterKey.isDown && player.world.y === 3168 && player.world.x >= 3344 && player.world.x <= 3376) {
      level = 1;
      playerHeight = 2496;
      playerWidth = 1774;
      gameCameraX = 1400;
      gameCameraY = 2048;
      boss = true
      worldState.dungoen1();
    }

    if (enterKey.isDown && player.world.y === 288 && player.world.x >= 464 && player.world.x <= 496) {
      worldState.shop();
    }

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, hole);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    if (cursors.left.isDown) {
      //  Move to the left
      player.body.velocity.x = -350;
      player.animations.play('left');
      if (player.world.x < game.camera.x+1) {
        game.camera.x -= 800;
      }
      battleTest();
    } else if (cursors.right.isDown) {
      //  Move to the right
      player.body.velocity.x = 350;
      player.animations.play('right');
      if (player.world.x > game.camera.x+800) {
        game.camera.x += 800;
      }
      battleTest();
    } else if (cursors.up.isDown) {
      player.body.velocity.y = -350;
      player.animations.play('up');
      if (player.world.y < game.camera.y+1) {
        game.camera.y -= 500;
      }
      battleTest();
    } else if (cursors.down.isDown) {
      player.body.velocity.y = 350;
      player.animations.play('down');
      if (player.world.y > game.camera.y+500) {
        game.camera.y += 500;
      }
      battleTest();
    } else {
      player.animations.stop();
    }
  },
  pause: function() {
    game.state.start('pause');
  },
  shop: function() {
    game.state.start('shop');
  },
  dungoen1: function() {
    game.state.start('dungoen');
  }
};
function battleTest() {
  counter++;
  if (counter >= 150 && playerStats.currentMana < playerStats.maxMana) {
    counter = 0;
    playerStats.currentMana++;
  }
  gameCameraX = game.camera.x;
  gameCameraY = game.camera.y;
  playerHeight = player.world.y;
  playerWidth = player.world.x;
  let randNum = Math.floor(Math.random()*100 + 1);
  if (randNum > 99) {
    game.state.start('battle');
  }
}