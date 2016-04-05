var gameCameraY
var gameCameraX
var lastPage
var hole
var player
var ledge
var worldState = {
  create: function() {
    game.world.resize(3000, 3000);
    game.camera.x = gameCameraX
    game.camera.y = gameCameraY
    game.physics.startSystem(Phaser.Physics.ARCADE);
    ground = game.add.group()
    hole = game.add.group()
    hole.enableBody = true;
    let maxWidth = Math.ceil(game.world.width/96)
    let maxHeight = Math.ceil(game.world.height/96)
    for (let i = 0; i < maxHeight; i++) {
      for (let j = 0; j < maxWidth; j++) {
        if (i > 0 && i < maxHeight-1 && j > 0 && j < maxWidth-1) {
          ground.create(j*96,i*96, 'grass')
        } else if (i < 1 && j < 1) {
          ledge = hole.create(j*96,i*96, "grassHole")
          ledge.body.immovable = true;
        } else if (i > maxHeight-2 && j >maxWidth-2) {
          ledge = hole.create(j*96,i*96, "grassHole")
          ledge.body.immovable = true;
        } else if (i < 1 && j > maxWidth-2) {
          ledge = hole.create(j*96,i*96, "grassHole")
          ledge.body.immovable = true;
        } else if (i > maxHeight-2 && j <1) {
          ledge = hole.create(j*96,i*96, "grassHole")
          ledge.body.immovable = true;
        } else if (i < 1) {
          ledge = hole.create(j*96,i*96, "grassHoleBottom")
          ledge.body.immovable = true;
        } else if (j > maxWidth-2) {
          ledge = hole.create(j*96,i*96, "grassHoleLeft")
          ledge.body.immovable = true;
        } else if (j < 1) {
          ledge = hole.create(j*96,i*96, "grassHoleRight")
          ledge.body.immovable = true;
        } else if (i > maxHeight-2) {
          ledge = hole.create(j*96,i*96, "grassHoleTop")
          ledge.body.immovable = true;
        }
      }
    }
    player = game.add.sprite(playerWidth, playerHeight, 'characterMovement');
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(hole);
    player.body.collideWorldBounds = true;
    player.animations.add('left', [4, 5, 6, 7], 10, true)
    player.animations.add('right', [4, 5, 6, 7], 10, true)
    player.animations.add('up', [0, 1, 2, 3], 10, true)
    player.animations.add('down', [0, 1, 2, 3], 10, true)
    cursors = game.input.keyboard.createCursorKeys();
  },
  update: function() {
    game.physics.arcade.collide(player, hole)
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.addOnce(this.pause, this);
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
        game.camera.x -= 800
      }
      battleTest()
    } else if (cursors.right.isDown) {
      //  Move to the right
      player.body.velocity.x = 350;
      player.animations.play('right');
      if (player.world.x > game.camera.x+800) {
        game.camera.x += 800
      }
      battleTest()
    } else if (cursors.up.isDown) {
      player.body.velocity.y = -350;
      player.animations.play('up');
      if (player.world.y < game.camera.y+1) {
        game.camera.y -= 500
      }
      battleTest()
    } else if (cursors.down.isDown) {
      player.body.velocity.y = 350;
      player.animations.play('down');
      if (player.world.y > game.camera.y+500) {
        game.camera.y += 500
      }
      battleTest()
    } else {
      player.animations.stop()
    }
  },
  pause: function() {
    game.state.start('pause')
  }
}
function battleTest() {
  gameCameraX = game.camera.x
  gameCameraY = game.camera.y
  playerHeight = player.world.y
  playerWidth = player.world.x
  let randNum = Math.floor(Math.random()*100 + 1)
  if (randNum > 99) {
    game.state.start('battle')
  }
}