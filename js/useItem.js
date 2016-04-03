var potionsLabel
var num
var useItemState = {
  create: function() {
    pauseState.pause()
    pauseState.pause()
    useItemState.updateText()
  },
  update: function() {
    if (selector.world.y >= 400 || selector.world.y <= 0 || selector.world.y === 100 || selector.world.y === 50 || selector.world.y === 150 || selector.world.y === 200 || selector.world.y === 250 || selector.world.y === 300 || selector.world.y === 350) {
      selector.body.velocity.y = 0
    }
    if (cursors.up.isDown && selector.world.y >= 5) {
      selector.body.velocity.y = -150
    } else if (cursors.down.isDown && selector.world.y <= 400) {
      selector.body.velocity.y = 150
    }
    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    if (enterKey.isDown) {
      useItemState.pause()
      useItemState.pause()
      if (selector.world.y >= 400) {
        game.state.start(lastPage)
      } else if (selector.world.y <= 5) {
        num = 0
        useItemState.increaseHealthMana()
      } else if (selector.world.y >= 40 && selector.world.y <= 60) {
        num = 1
        useItemState.increaseHealthMana()
      } else if (selector.world.y >= 90 && selector.world.y <= 110) {
        num = 2
        useItemState.increaseHealthMana()
      } else if (selector.world.y >= 140 && selector.world.y <= 160) {
        num = 3
        useItemState.increaseHealthMana()
      } else if (selector.world.y >= 190 && selector.world.y <= 220) {
        num = 4
        useItemState.increaseHealthMana()
      } else if (selector.world.y >= 240 && selector.world.y <= 260) {
        num = 5
        useItemState.increaseHealthMana()
      } else if (selector.world.y >= 290 && selector.world.y <= 310) {
        num = 6
        useItemState.increaseHealthMana()
      } else if (selector.world.y >= 340 && selector.world.y <= 360) {
        num = 7
        useItemState.increaseHealthMana()
      }
    useItemState.updateText()
    }
  },
  updateText: function() {
    game.world.removeAll();

    game.world.resize(900, 600);
    menu = game.add.group()
    menu.create(0,0,'slateGrey')
    menu.scale.setTo(10,7)
    selector = game.add.sprite(0, 0, 'selector');
    game.physics.arcade.enable(selector);
    selector.animations.add('default', [0, 1], 2, true)
    selector.animations.play('default')
    selector.scale.setTo(.5,.5)

    for (let i in items.Potions) {
      if (i < 4) {
        potionsLabel=game.add.text(30,i*50, `${items.Potions[i].Name}(${items.Potions[i].Ability[0]}HP): ${items.Potions[i].Owned}`, 
        {
          font: '25px Arial',
          fill: '#000000'
        });
      } else if (i > 3) {
        potionsLabel=game.add.text(30,i*50, `${items.Potions[i].Name}(${items.Potions[i].Ability[1]}MP): ${items.Potions[i].Owned}`, 
        {
          font: '25px Arial',
          fill: '#000000'
        });
      }
      if (i >= 7) {
        game.add.text(30,i*50+50, `Exit`, 
        {
          font: '40px Arial',
          fill: '#000000'
        });
      }
    }
  },
  pause: function() {
    game.paused = !game.paused
  },
  increaseHealthMana: function() {
    if (items.Potions[num].Owned > 0) {
      if (num < 4 && playerStats.currentHealth !== playerStats.maxHealth) {
        playerStats.currentHealth += items.Potions[num].Ability[0]
        if (playerStats.currentHealth > playerStats.maxHealth) {
          playerStats.currentHealth = playerStats.maxHealth
        }
        items.Potions[num].Owned--
      }
      if (num > 3 && playerStats.currentMana !== playerStats.maxMana) {
        playerStats.currentHealth += items.Potions[num].Ability[0]
        if (playerStats.currentMana > playerStats.maxMana) {
          playerStats.currentMana = playerStats.maxMana
        }
        items.Potions[num].Owned--
      }
    }
  }
}