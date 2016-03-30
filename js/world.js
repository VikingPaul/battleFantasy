var playerHeight = 0
var playerWidth = 0
var worldState = {
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    ground = game.add.group()
    let maxWidth = Math.ceil(game.world.width/96)
    let maxHeight = Math.ceil(game.world.height/96)
    for (let i = 0; i < maxHeight; i++) {
      for (let j = 0; j < maxWidth; j++) {
        ground.create(j*96,i*96, 'grass')
      }
    }
    player = game.add.sprite(playerWidth, playerHeight, 'characterMovement');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    player.animations.add('left', [4, 5, 6, 7], 10, true)
    player.animations.add('right', [4, 5, 6, 7], 10, true)
    player.animations.add('up', [0, 1, 2, 3], 10, true)
    player.animations.add('down', [0, 1, 2, 3], 10, true)
    cursors = game.input.keyboard.createCursorKeys();
  },
  update: function() {
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown) {
      //  Move to the left
      player.body.velocity.x = -350;
      player.animations.play('left');
      battleTest()
    } else if (cursors.right.isDown) {
      //  Move to the right
      player.body.velocity.x = 350;
      player.animations.play('right');
      battleTest()
    } else if (cursors.up.isDown) {
      player.body.velocity.y = -350;
      player.animations.play('up');
      battleTest()
    } else if (cursors.down.isDown) {
      player.body.velocity.y = 350;
      player.animations.play('down');
      battleTest()
    } else {
      player.animations.stop()
    }
  }
}
function battleTest() {
  playerHeight = player.world.y
  playerWidth = player.world.x
  let randNum = Math.floor(Math.random()*100 + 1)
  if (randNum > 99) {
    game.state.start('battle')
  }
}