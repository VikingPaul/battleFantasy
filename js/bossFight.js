"use strict";
var bossState = {
  create: function() {
    guard = 0;
    rally = 0;
    taunt = 0;
    hide = 0;
    itemText = game.add.text(0,game.world.height-190, ``, 
          {
            font: '16px Arial',
            fill: '#000000'
        });
    itemText.anchor.setTo();

    ememyDropRate=0;
    turn = 1;
    game.world.resize(900, 600);
    ground = game.add.group();
    ground.create(0,0, battlebackground);
    ground.scale.setTo(10,4.5);
    menu = game.add.group();
    menu.create(0,204,'slateGrey');
    menu.scale.setTo(10,2);
    player = game.add.sprite(game.world.width-90,200, 'characterBattle');
    var fightLabel = game.add.text(game.world.width-300,game.world.height-150, 'Fight!', 
      {
        font: '50px Arial',
        fill: '#000000'
    });
    var itemLabel = game.add.text(game.world.width-300,game.world.height-60, 'Items!', 
      {
        font: '50px Arial',
        fill: '#000000'
    });
    var abilityLabel = game.add.text(game.world.width-130,game.world.height-150, 'Spcl!', 
      {
        font: '50px Arial',
        fill: '#000000'
    });
    var runLabel = game.add.text(game.world.width-130,game.world.height-60, 'RUN!', 
      {
        font: '50px Arial',
        fill: '#000000'
    });
    missLabel = game.add.text(game.world.width-130,150, ' ', 
      {
        font: '50px Arial',
        fill: '#000000'
    });
    missLabel.anchor.setTo();
    selector = game.add.sprite(560, 455, 'selector');
    game.physics.arcade.enable(selector);
    selector.animations.add('default', [0, 1], 2, true);
    selector.animations.play('default');
    randEnemy = Math.floor(Math.random()*6+1);
    enemyLvl = playerStats.Lvl + 5;
    enemyTotalHealth = Math.floor(Math.random()*randEnemy+10*enemyLvl);
    enemyRemainingHealth = parseInt(enemyTotalHealth);
    let eNum = Math.floor(Math.random()*6+enemyLvl);
    enemyAttack = eNum;
    enemyArmor = Math.floor(Math.random()*3+enemyLvl);
    enemySpeed = Math.floor(Math.random()*6+enemyLvl);
    enemyExp = Math.floor(Math.random()*5+enemyLvl+Math.floor(Math.random()*5+enemyLvl+100));
    enemyMoney = Math.floor(Math.random()*5+enemyLvl+20);
    for (let i in items.Granades[0].Type) {
      enemyResist[i] = 0;
    }
    let enemy;
    switch (whichBoss) {
      case 1:
        enemy = game.add.sprite(0,150, 'level1Boss');
        enemyLabel = game.add.text(0,game.world.height-200, `Lvl: ${enemyLvl} BOSS!`, 
          {
            font: '50px Arial',
            fill: '#000000'
        });
        break;
    }
    enemyLabel.anchor.setTo();
    enemyHealthLabel = game.add.text(100,game.world.height-100, `${enemyTotalHealth} / ${enemyRemainingHealth}`, 
          {
            font: '25px Arial',
            fill: '#000000'
        });
    enemyHealthLabel.anchor.setTo(0.5, 0.5);

    playerHealthLabel = game.add.text(game.world.width-100,game.world.height-250, `${playerStats.maxHealth} / ${playerStats.currentHealth} HP\n${playerStats.maxMana} / ${playerStats.currentMana} MP`, 
          {
            font: '25px Arial',
            fill: '#000000'
        });
    playerHealthLabel.anchor.setTo(0.5, 0.5);

    cursors = game.input.keyboard.createCursorKeys();
  },
  update: function() {
    if (enemySpeed > playerStats.speed && turn === 1) {
      turn++;
      bossState.enemyAttack();
    }
    if (enemyRemainingHealth <= 0) {
      bossState.start();
    }
    if (playerStats.currentHealth <= 0) {
      bossState.death();
    }
    if (selector.world.x >= 730 || selector.world.x <= 560) {
      selector.body.velocity.x = 0;
    }
    if (selector.world.y >= 545 || selector.world.y <= 455) {
      selector.body.velocity.y = 0;
    }
    if (cursors.left.isDown && selector.world.x >= 560) {
      selector.body.velocity.x = -150;
    } else if (cursors.right.isDown && selector.world.x <= 730) {
      selector.body.velocity.x = 150;
    } else if (cursors.up.isDown && selector.world.y >= 455) {
      selector.body.velocity.y = -150;
    } else if (cursors.down.isDown && selector.world.y <= 545) {
      selector.body.velocity.y = 150;
    }

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    if (enterKey.isDown) {
      if (selector.world.x <= 560 && selector.world.y <= 455) {
        if ((rally+playerStats.strength+playerStats.Lvl+playerStats.weapon.stats[0])-enemyArmor > 0) {
          enemyRemainingHealth = enemyRemainingHealth-((playerStats.strength+playerStats.Lvl + playerStats.weapon.stats[0])-enemyArmor+rally);
        }
        bossState.updateText();
        if (enemyRemainingHealth <= 0) {
          bossState.start();
        }
        bossState.enemyAttack();
      } else if (selector.world.x >= 730 && selector.world.y <= 455) {
        bossState.resume();
        bossState.useAbility();
      } else if (selector.world.x <= 560 && selector.world.y >= 545) {
        bossState.resume();
        bossState.useItem();
      } else if (selector.world.x >= 730 && selector.world.y >= 545) {
        if (enemySpeed < Math.floor(Math.random()*playerStats.speed+playerStats.armor.stats[2])){
          bossState.run();
        } else {
          bossState.enemyAttack();
        }
      }
    }
  },
  updateText: function() {
    itemText.setText("");
    switch (randEnemy) {
      case 1:
        enemyLabel.setText(`Lvl: ${enemyLvl} RED!`);
        break;
      case 2:
        enemyLabel.setText(`Lvl: ${enemyLvl} GREEN!`);
        break;
      case 3:
        enemyLabel.setText(`Lvl: ${enemyLvl} LIGHT BLUE!`);
        break;
      case 4:
        enemyLabel.setText(`Lvl: ${enemyLvl} PURPLE!`);
        break;
      case 5:
        enemyLabel.setText(`Lvl: ${enemyLvl} BLUE!`);
        break;
      case 6:
        enemyLabel.setText(`Lvl: ${enemyLvl} YELLOW!`);
        break;
    }
    enemyHealthLabel.setText(`${enemyTotalHealth} / ${enemyRemainingHealth}`);
  },
  start: function() {
    boss = false
    game.state.start('win');
  },
  enemyAttack: function() {
    game.paused = !game.paused;
    if (hide > 1) {
      hide = Math.floor(hide/2);
      missLabel.setText("HIDDEN");
    } else {
      if (Math.floor(Math.random()*playerStats.speed+playerStats.armor.stats[1]+taunt) <= enemySpeed) {
        if (-enemyAttack+playerStats.armor.stats[0]+guard < 0) {
          playerStats.currentHealth = playerStats.currentHealth - enemyAttack+playerStats.armor.stats[0];
          missLabel.setText("");
        } 
      } else {
        missLabel.setText("MISS");
      }
      playerHealthLabel.setText(`${playerStats.maxHealth} / ${playerStats.currentHealth} HP\n${playerStats.maxMana} / ${playerStats.currentMana} MP`);
    }
    if (guard > 0) {
      guard = Math.floor(guard/2);
    }
    if (rally > 0) {
      rally = Math.floor(rally/2);
    }
    if (taunt > 0) {
      taunt = Math.floor(taunt/2);
    }
    setTimeout(bossState.resume(), 3000);
  },
  resume: function() {
    game.paused = !game.paused;
  },
  death: function() {
    game.state.start('death');
  },
  run: function() {
    game.state.start('escape');
  },
  useItem: function() {
    enemyLabel.setText('');
    enemyHealthLabel.setText('');
    itemText = game.add.text(0,game.world.height-190, `1: ${items.Potions[0].Name}(${items.Potions[0].Ability[0]}HP): ${items.Potions[0].Owned} \n 2: ${items.Potions[1].Name}(${items.Potions[1].Ability[0]}HP): ${items.Potions[1].Owned} \n 3: ${items.Potions[2].Name}(${items.Potions[2].Ability[0]}HP): ${items.Potions[2].Owned} \n 4: ${items.Potions[3].Name}(${items.Potions[3].Ability[0]}HP): ${items.Potions[3].Owned} \n 5: ${items.Potions[4].Name}(${items.Potions[4].Ability[0]}MP): ${items.Potions[4].Owned} \n 6: ${items.Potions[5].Name}(${items.Potions[5].Ability[0]}MP): ${items.Potions[5].Owned} \n 7: ${items.Potions[6].Name}(${items.Potions[6].Ability[0]}MP): ${items.Potions[6].Owned} \n 8: ${items.Granades[0].Name}: ${items.Granades[0].Owned}`, 
          {
            font: '16px Arial',
            fill: '#000000'
        });
    document.addEventListener("keyup", numEvent);
    function numEvent(e) {
      if (e.code === "Digit1" && items.Potions[0].Owned >0) {
        num = 0;
        document.removeEventListener("keyup", numEvent);
        bossState.increaseHealthMana();
      } else if (e.code === "Digit2" && items.Potions[1].Owned >0) {
        num = 1;
        document.removeEventListener("keyup", numEvent);
        bossState.increaseHealthMana();
      } else if (e.code === "Digit3" && items.Potions[2].Owned >0) {
        num = 2;
        document.removeEventListener("keyup", numEvent);
        bossState.increaseHealthMana();
      } else if (e.code === "Digit4" && items.Potions[3].Owned >0) {
        num = 3;
        document.removeEventListener("keyup", numEvent);
        bossState.increaseHealthMana();
      } else if (e.code === "Digit5" && items.Potions[4].Owned >0) {
        num = 4;
        document.removeEventListener("keyup", numEvent);
        bossState.increaseHealthMana();
      } else if (e.code === "Digit6" && items.Potions[5].Owned >0) {
        num = 5;
        document.removeEventListener("keyup", numEvent);
        bossState.increaseHealthMana();
      } else if (e.code === "Digit7" && items.Potions[6].Owned >0) {
        num = 6;
        document.removeEventListener("keyup", numEvent);
        bossState.increaseHealthMana();
      } else if (e.code === "Digit8" && items.Granades[0].Owned >0) {
        num = 0;
        document.removeEventListener("keyup", numEvent);
        bossState.granade();
      } else if (e.code === "Space") {
        document.removeEventListener("keyup", numEvent);
        bossState.updateText();
        bossState.resume();
      }
    }
  },
  granade: function() {
    bossState.resume();
    damage = 0;
    for (let i in items.Granades[num].Type) {
      damage += items.Granades[num].Damage*(items.Granades[num].Type[i]/100)- enemyResist[i];
    }
    items.Granades[num].Owned--;
    enemyRemainingHealth -= damage;
    bossState.updateText();
    if (enemyRemainingHealth < 1) {
      game.state.start('win');
    } else {
      bossState.enemyAttack();
    }
  },
  increaseHealthMana: function() {
    playerStats.currentHealth += items.Potions[num].Ability[0];
    if (playerStats.currentHealth > playerStats.maxHealth) {
      playerStats.currentHealth = playerStats.maxHealth;
    }
    playerStats.currentMan += items.Potions[num].Ability[1];
    if (playerStats.currentMana > playerStats.maxMana) {
      playerStats.currentMana = playerStats.maxMana;
    }
    items.Potions[num].Owned--;
    bossState.updateText();
    bossState.enemyAttack();
    bossState.resume();
  },
  useAbility: function() {

    enemyLabel.setText('');
    enemyHealthLabel.setText('');
    let num = "";
    numLabel = game.add.text(350,game.world.height-190, " ", 
      {
        font: '20px Arial',
        fill: '#000000'
    });
    numLabel.anchor.setTo();
    let string = "";
    for (let i in playerStats.abilities.name) {
      string += i + ": " + playerStats.abilities.name[i] + ": " + playerStats.abilities.cost[i] + "\n";
    }
    itemText = game.add.text(0,game.world.height-190, string, 
          {
            font: '16px Arial',
            fill: '#000000'
        });
    document.addEventListener("keyup", numAbility);
    function numAbility(e) {
      numLabel.setText("");
      if (e.code === "Digit1") {
        num = num + "1";
      } else if (e.code === "Digit2") {
        num = num + "2";
      } else if (e.code === "Digit3") {
        num = num + "3";
      } else if (e.code === "Digit4") {
        num = num + "4";
      } else if (e.code === "Digit5") {
        num = num + "5";
      } else if (e.code === "Digit6") {
        num = num + "6";
      } else if (e.code === "Digit7") {
        num = num + "7";
      } else if (e.code === "Digit8") {
        num = num + "8";
      } else if (e.code === "Digit9") {
        num = num + "9";
      } else if (e.code === "Digit0") {
        num = num + "0";
      } else if (e.code === "Enter" && num !== "" && parseInt(num) < playerStats.abilities.name.length && playerStats.currentMana >= playerStats.abilities.cost[parseInt(num)]) {
        document.removeEventListener("keyup", numAbility);
        bossState.abilities(num);
      } else if (e.code === "Space") {
        document.removeEventListener("keyup", numAbility);
        bossState.resume();
        bossState.updateText();
      }
      if (parseInt(num) > 99) {
        num = num.substring(1,num.length);
      }
      if (parseInt(num) > 99) {
        num = num.substring(1,num.length);
      }
      if (e.code !== "Enter" && e.code !== "Space") {
        numLabel.setText(`${num}`);
      }
    }
  },
  abilities: function(num) {
    playerStats.currentMana -=playerStats.abilities.cost[num];
    let name = playerStats.abilities.name[num];
    bossState.resume();
    if (name === "Guard") {
      guard += 5*playerStats.class[0];
      bossState.updateText();
      bossState.enemyAttack();
    } else if (name === "Critical Strike") {
      enemyRemainingHealth = enemyRemainingHealth-((playerStats.strength+playerStats.Lvl + playerStats.weapon.stats[0]))*1.5+playerStats.class[0];
      if (enemyRemainingHealth <=0) {
        bossState.start();
      } else {
        bossState.enemyAttack();
        rally += 5*playerStats.class[0];
        bossState.updateText();
        bossState.enemyAttack();
      }
    } else if (name === "Taunt") {
      taunt += 5*playerStats.class[0];
      bossState.updateText();
      bossState.enemyAttack();
    } else if (name === "Call to Arms") {
      guard += 5*playerStats.class[0];
      taunt += 5*playerStats.class[0];
      rally += 5*playerStats.class[0];
      bossState.updateText();
      bossState.enemyAttack();
    } else if (name === "Steal") {
      stealLabel = game.add.text(game.world.width-200,game.world.height-190, '', 
      {
        font: '15px Arial',
        fill: '#000000'
      });
      stealLabel.anchor.setTo();
      playerStats.Money += Math.ceil(enemyMoney/2)+playerStats.class[1];
      stealLabel.setText(`You stole: ${Math.ceil(enemyMoney/2)} Gold.`);
      setTimeout(bossState.deleteSteal, 10000);
      bossState.updateText();
      bossState.enemyAttack();
    } else if (name === "Escape") {
      bossState.run();
    } else if (name === "Mug") {
      if (Math.ceil(Math.random()*99) > 50) {
        playerStats.Money += Math.ceil(enemyMoney/2)+playerStats.class[1];
        stealLabel.setText(`You stole: ${Math.ceil(enemyMoney/2)} Gold.`);
      } else {
        if (playerStats.class < 6) {
          items.Potions[0].Owned++;
          stealLabel.setText(`You stole: Health Potion`);
        } else if(playerStats.class[1] < 10) {
          items.Potions[1].Owned++;
          stealLabel.setText(`You stole: Super Health Potion`);
        } else if (playerStats.class < 12) {
          items.Potions[2].Owned++;
          stealLabel.setText(`You stole: Giga Health Potion`);
        } else if (playerStats.class < 15) {
          items.Potions[3].Owned++;
          stealLabel.setText(`You stole: Max Health Potion`);
        }
      }
      if ((rally+playerStats.strength+playerStats.Lvl+playerStats.weapon.stats[0])-enemyArmor > 0) {
        enemyRemainingHealth = enemyRemainingHealth-((playerStats.strength+playerStats.Lvl + playerStats.weapon.stats[0])-enemyArmor+rally);
      }
      bossState.updateText();
      if (enemyRemainingHealth <=0) {
        bossState.start();
      } else {
        bossState.enemyAttack();
      }tleState.updateText();
      if (enemyRemainingHealth <=0) {
        bossState.start();
      } else {
        bossState.enemyAttack();
      }
    } else if (name === "Hide") {
      hide += playerStats.class[1];
      bossState.updateText();
      bossState.enemyAttack();
    } else if (name === "Confuse") {
      enemyRemainingHealth -= (enemyAttack+playerStats.class[1]);
      bossState.updateText();
    } else if (name === "Heal") {
      playerStats.currentHealth += 10*playerStats.class[2];
      if (playerStats.currentHealth > playerStats.maxHealth) {
        playerStats.currentHealth = playerStats.maxHealth;
      }
      bossState.updateText();
      bossState.enemyAttack();
    } else if (name === "Fire") {
      enemyRemainingHealth -= 5*(playerStats.class[2]+Math.ceil(playerStats.magic/5))-enemyResist[0];
      bossState.updateText();
      if (enemyRemainingHealth <=0) {
        bossState.start();
      } else {
        bossState.enemyAttack();
      }
    } else if (name === "Thunder") {
      enemyRemainingHealth -= 5*(playerStats.class[2]+Math.ceil(playerStats.magic/5))-enemyResist[2];
      bossState.updateText();
      if (enemyRemainingHealth <=0) {
        bossState.start();
      } else {
        bossState.enemyAttack();
      }
    } else if (name === "Blizzard") {
      enemyRemainingHealth -= 5*(playerStats.class[2]+Math.ceil(playerStats.magic/5))-enemyResist[1];
      bossState.updateText();
      if (enemyRemainingHealth <=0) {
        bossState.start();
      } else {
        bossState.enemyAttack();
      }
    } else if (name === "Summon") {
      enemyRemainingHealth -= 5*(playerStats.class[2]+Math.ceil(playerStats.magic/5))-enemyResist[0];
      enemyRemainingHealth -= 5*(playerStats.class[2]+Math.ceil(playerStats.magic/5))-enemyResist[1];
      enemyRemainingHealth -= 5*(playerStats.class[2]+Math.ceil(playerStats.magic/5))-enemyResist[2];
      bossState.updateText();
      if (enemyRemainingHealth <=0) {
        bossState.start();
      } else {
        bossState.enemyAttack();
      }
    }
  },
  deleteSteal: function() {
    stealLabel.setText("");
  }

};