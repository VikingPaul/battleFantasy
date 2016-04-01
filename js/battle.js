var selector
var EnemyTotalHealth
var enemyRemainingHealth
var enemyHealthLabel
var enemyAttack
var turn
var enemyExp
var battleState = {
  create: function() {
    turn = 1
    game.world.resize(900, 600);
    ground = game.add.group()
    ground.create(0,0, 'battleOutdoorGrass')
    ground.scale.setTo(10,4.5)
    menu = game.add.group()
    menu.create(0,204,'slateGrey')
    menu.scale.setTo(10,2)
    player = game.add.sprite(game.world.width-90,200, 'characterBattle')
    var fightLabel = game.add.text(game.world.width-300,game.world.height-150, 'Fight!', 
      {
        font: '50px Arial',
        fill: '#000000'
    });
    var fightLabel = game.add.text(game.world.width-300,game.world.height-60, 'Items!', 
      {
        font: '50px Arial',
        fill: '#000000'
    });
    var dieLabel = game.add.text(game.world.width-130,game.world.height-150, 'Spcl!', 
      {
        font: '50px Arial',
        fill: '#000000'
    });
    var runLabel = game.add.text(game.world.width-130,game.world.height-60, 'RUN!', 
      {
        font: '50px Arial',
        fill: '#000000'
    });
    selector = game.add.sprite(560, 455, 'selector');
    game.physics.arcade.enable(selector);
    selector.animations.add('default', [0, 1], 2, true)
    selector.animations.play('default')
    let randEnemy = Math.floor(Math.random()*6+1)
    let enemyLvl = playerStats.Lvl + 1
    enemyTotalHealth = Math.floor(Math.random()*randEnemy+10*enemyLvl)
    enemyExp = Math.floor(Math.random()*enemyLvl+Math.floor(Math.random()*10+3*playerStats.Lvl))+1
    enemyRemainingHealth = parseInt(enemyTotalHealth)
    enemyAttack = Math.floor(Math.random()*3*enemyLvl+enemyLvl)
    enemySpeed = Math.floor(Math.random()*3*enemyLvl+enemyLvl)
    switch (randEnemy) {
      case 1:
        enemy = game.add.sprite(0,150, 'basicRedEnemy')
        var enemyLabel = game.add.text(0,game.world.height-200, `Lvl: ${enemyLvl} RED!`, 
          {
            font: '50px Arial',
            fill: '#000000'
        });
        break;
      case 2:
        enemy = game.add.sprite(0,150, 'basicGreenEnemy')
        var enemyLabel = game.add.text(0,game.world.height-200, `Lvl: ${enemyLvl} GREEN!`, 
          {
            font: '50px Arial',
            fill: '#000000'
        });
        break;
      case 3:
        enemy = game.add.sprite(0,150, 'basicLightBlueEnemy')
        var enemyLabel = game.add.text(0,game.world.height-200, `Lvl: ${enemyLvl} LIGHT BLUE!`, 
          {
            font: '50px Arial',
            fill: '#000000'
        });
        break;
      case 4:
        enemy = game.add.sprite(0,150, 'basicPurpleEnemy')
        var enemyLabel = game.add.text(0,game.world.height-200, `Lvl: ${enemyLvl} PURPLE!`, 
          {
            font: '50px Arial',
            fill: '#000000'
        });
        break;
      case 5:
        enemy = game.add.sprite(0,150, 'basicBlueEnemy')
        var enemyLabel = game.add.text(0,game.world.height-200, `Lvl: ${enemyLvl} BLUE!`, 
          {
            font: '50px Arial',
            fill: '#000000'
        });
        break;
      case 6:
        enemy = game.add.sprite(0,150, 'basicYellowEnemy')
        var enemyLabel = game.add.text(0,game.world.height-200, `Lvl: ${enemyLvl} YELLOW!`, 
          {
            font: '50px Arial',
            fill: '#000000'
        });
        break;
    }
    enemyHealthLabel = game.add.text(100,game.world.height-100, `${enemyTotalHealth} / ${enemyRemainingHealth}`, 
          {
            font: '25px Arial',
            fill: '#000000'
        });
    enemyHealthLabel.anchor.setTo(.5, .5)

    playerHealthLabel = game.add.text(game.world.width-100,game.world.height-250, `${playerStats.maxHealth} / ${playerStats.currentHealth}`, 
          {
            font: '25px Arial',
            fill: '#000000'
        });
    playerHealthLabel.anchor.setTo(.5, .5)

    cursors = game.input.keyboard.createCursorKeys();
  },
  update: function() {
    if (enemySpeed > playerStats.speed && turn === 1) {
      turn++
      battleState.enemyAttack()
    }
    if (enemyRemainingHealth <= 0) {
      battleState.start()
    }
    if (playerStats.currentHealth <= 0) {
      battleState.death()
    }
    if (selector.world.x >= 730 || selector.world.x <= 560) {
      selector.body.velocity.x = 0
    }
    if (selector.world.y >= 545 || selector.world.y <= 455) {
      selector.body.velocity.y = 0
    }
    if (cursors.left.isDown && selector.world.x >= 560) {
      selector.body.velocity.x = -150
    } else if (cursors.right.isDown && selector.world.x <= 730) {
      selector.body.velocity.x = 150
    } else if (cursors.up.isDown && selector.world.y >= 455) {
      selector.body.velocity.y = -150
    } else if (cursors.down.isDown && selector.world.y <= 545) {
      selector.body.velocity.y = 150
    }

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    if (enterKey.isDown) {
      if (selector.world.x <= 560 && selector.world.y <= 455) {
          enemyRemainingHealth = enemyRemainingHealth-playerStats.strength*3+playerStats.magic
          battleState.updateText();
          if (enemyRemainingHealth <= 0) {
            battleState.start()
          }
          battleState.enemyAttack();
      } else if (selector.world.x >= 730 && selector.world.y <= 455) {
        console.log("Special");
      } else if (selector.world.x <= 560 && selector.world.y >= 545) {
        console.log("items");
      } else if (selector.world.x >= 730 && selector.world.y >= 545) {
        if (enemySpeed < Math.floor(Math.random()*playerStats.speed+playerStats.strength)){
          battleState.run()
        } else {
          battleState.enemyAttack()
        }
      }
    }

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.addOnce(this.start, this);
  
  },
  updateText: function() {
    enemyHealthLabel.setText(`${enemyTotalHealth} / ${enemyRemainingHealth}`)
  },
  start: function() {
    game.state.start('win')
  },
  enemyAttack: function() {
    game.paused = !game.paused;
    if (Math.floor(Math.random()*(playerStats.speed+playerStats.strength)+1) <= enemySpeed) {
      playerStats.currentHealth = playerStats.currentHealth - enemyAttack
    } 
    playerHealthLabel.setText(`${playerStats.maxHealth} / ${playerStats.currentHealth}`)
    setTimeout(battleState.resume(), 3000)
  },
  resume: function() {
    game.paused = !game.paused
  },
  death: function() {
    game.state.start('death')
  },
  run: function() {
    game.state.start('escape')
  }
}