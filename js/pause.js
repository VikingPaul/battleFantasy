"use strict";
playerStats.status = "Healthy"
var words
var pauseState = {
  create: function() {
    pauseState.pause();
    pauseState.pause();
    game.world.resize(900, 600);
    menu = game.add.group();
    menu.create(0,0,'slateGrey');
    menu.scale.setTo(10,7);
    words = game.add.text(10,0, '',
      {
        font: '25px Arial'
      });
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
    var equipLabel = game.add.text(700,210, 'Equip', 
      {
        font: '50px Arial',
        fill: '#000000'
    });

    var exitLabel = game.add.text(700,280, 'Exit', 
      {
        font: '50px Arial',
        fill: '#000000'
    });
    selector = game.add.sprite(650, 5, 'selector');
    game.physics.arcade.enable(selector);
    selector.animations.add('default', [0, 1], 2, true);
    selector.animations.play('default');
  },
  update: function() {
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.addOnce(this.start, this);
    if (selector.world.y >= 280 || selector.world.y <= 0 || selector.world.y === 140 || selector.world.y === 70 || selector.world.y === 210) {
      selector.body.velocity.y = 0;
    }
    if (cursors.up.isDown && selector.world.y >= 5) {
      selector.body.velocity.y = -150;
    } else if (cursors.down.isDown && selector.world.y <= 285) {
      selector.body.velocity.y = 150;
    }
    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    if (enterKey.isDown) {
      if (selector.world.y >= 280) {
        pauseState.start();
      } else if (selector.world.y <= 5) {
        lastPage = "pause";
        game.state.start('useItem');
      } else if (selector.world.y >= 60 && selector.world.y <= 80) {
        pauseState.showStats()
      } else if (selector.world.y >= 130 && selector.world.y <= 150) {
        pauseState.showAbilities()
      } else if (selector.world.y >= 200 && selector.world.y <= 220) {
        console.log("Equip");
      }
    }
  },
  start: function() {
    game.state.start('world');
  },
  pause: function() {
    game.paused = !game.paused;
  },
  showStats: function() {
    words.setText(`HP: ${playerStats.maxHealth} / ${playerStats.currentHealth} \nMP: ${playerStats.maxMana} / ${playerStats.currentMana} \nStatus: ${playerStats.status}`);
  },
  showAbilities: function() {
    let string = ""
    for (let i in playerStats.abilities.name) {
      string += playerStats.abilities.name[i] +": " + playerStats.abilities.cost[i] + " MP\n"
    }
    words.setText(string)
  }
};