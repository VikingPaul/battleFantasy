var pauseState = {
  create: function() {
    pauseState.pause()
    pauseState.pause()
    game.world.resize(900, 600);
    menu = game.add.group()
    menu.create(0,0,'slateGrey')
    menu.scale.setTo(10,7)
    var itemLabel = game.add.text(700,0, 'Items', 
      {
        font: '50px Arial',
        fill: '#000000'
    });
    var statsLabel = game.add.text(700,70, 'Stats', 
      {
        font: '50px Arial',
        fill: '#000000'
    });
    var abilityLabel = game.add.text(700,140, 'Abilities', 
      {
        font: '50px Arial',
        fill: '#000000'
    });
    var exitLabel = game.add.text(700,210, 'Exit', 
      {
        font: '50px Arial',
        fill: '#000000'
    });
    selector = game.add.sprite(650, 5, 'selector');
    game.physics.arcade.enable(selector);
    selector.animations.add('default', [0, 1], 2, true)
    selector.animations.play('default')
  },
  update: function() {
    if (selector.world.y >= 210 || selector.world.y <= 0 || selector.world.y === 140 || selector.world.y === 70) {
      selector.body.velocity.y = 0
    }
    if (cursors.up.isDown && selector.world.y >= 5) {
      selector.body.velocity.y = -150
    } else if (cursors.down.isDown && selector.world.y <= 215) {
      selector.body.velocity.y = 150
    }
    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    if (enterKey.isDown) {
      if (selector.world.y >= 210) {
        pauseState.start()
      } else if (selector.world.y <= 5) {
        console.log("Items");
      } else if (selector.world.y >= 60 && selector.world.y <= 80) {
        console.log("Stats");
      } else if (selector.world.y >= 130 && selector.world.y <= 150) {
        console.log("Abilities");
      }
    }
  },
  start: function() {
    game.state.start('world')
  },
  pause: function() {
    game.paused = !game.paused
  }
}