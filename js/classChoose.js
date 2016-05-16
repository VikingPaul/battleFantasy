"use strict";
playerStats.class = [0,0,0];
var classLeft = 0;
var classTotal = 0;
var cursors;
playerStats.abilities = {
  name: [],
  cost: []
};
var classState = {
  create: function() {
    enterNum = 0;
    if (!death) {
      classLeft += 1;
      classTotal += 1;
    }
    statsLabel = game.add.text(300,80, `Choose Class: ${classLeft}`, 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    statsLabel.anchor.setTo(0.5, 0.5);
    strengthLabel = game.add.text(300,150, `${playerStats.class[0]} :Fighter`, 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    strengthLabel.anchor.setTo(0.5, 0.5);
    speedLabel = game.add.text(300,220, `${playerStats.class[1]} :Rogue`, 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    speedLabel.anchor.setTo(0.5, 0.5);
    magicLabel = game.add.text(300,290, `${playerStats.class[2]} :Mage`, 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    magicLabel.anchor.setTo(0.5, 0.5);
    var startLabel = game.add.text(80, game.world.height-80, 'press enter to next',
    {
      font: '25px Arial',
      fill: '#ffffff',
      align: 'center'
    });
    var startLabel = game.add.text(80, game.world.height-100, 'up/down to increase number',
    {
      font: '25px Arial',
      fill: '#ffffff',
      align: 'center'
    });
    cursors = game.input.keyboard.createCursorKeys();
  },
  update: function() {
    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    if (cursors.up.isDown && classLeft > 0) {
      classState.statsIncrease();
      classState.updateText();
      classState.pause();
      classState.pause();
      
    } else if (cursors.down.isDown && classTotal !== classLeft) {
      classState.statsDecrease();
      classState.updateText();
      classState.pause();
      classState.pause();
    } else if (enterKey.isDown) {
      classState.next();
      classState.pause();
      classState.pause();
      statsTotal = statsLeft;   
    }
  },
  updateText: function() {
    statsLabel.setText(`Choose Class: ${classLeft}`);
    strengthLabel.setText(`${playerStats.class[0]} :Fighter`);
    speedLabel.setText(`${playerStats.class[1]} :Rogue`);
    magicLabel.setText(`${playerStats.class[2]} :Mage`);
  },
  statsIncrease: function() {
    if (enterNum === 0) {
      playerStats.class[0]++;
      classLeft--;
    } else if (enterNum == 1) {
      playerStats.class[1]++;
      classLeft--;
    } else if (enterNum == 2) {
      playerStats.class[2]++;
      classLeft--;
    }
  },
  statsDecrease: function() {
    if (enterNum === 0) {
      playerStats.class[0]--;
      classLeft++;
    } else if (enterNum == 1) {
      playerStats.class[1]--;
      classLeft++;
    } else if (enterNum == 2) {
      playerStats.class[2]--;
      classLeft++;
    }
  },
  pause: function() {
    game.paused = !game.paused;
  },
  next: function() {
    enterNum++;
    if (enterNum === 3) {
      if (classTotal > 0) {
        if (playerStats.class[0] === 1) {
          classes.Fighter.Owned[0] = true;
          classes.Fighter.Owned[1] = true;
        } else if (playerStats.class[0] === 5) {
          classes.Fighter.Owned[2] = true;
          classes.Fighter.Owned[3] = true;
        } else if (playerStats.class[0] === 10) {
          classes.Fighter.Owned[4] = true;
        } else if (playerStats.class[1] === 1) {
          classes.Rogue.Owned[0] = true;
          classes.Rogue.Owned[1] = true;
        } else if (playerStats.class[1] === 5) {
          classes.Rogue.Owned[2] = true;
          classes.Rogue.Owned[3] = true;
        } else if (playerStats.class[1] === 10) {
          classes.Rogue.Owned[4] = true;
        } else if (playerStats.class[2] === 1) {
          classes.Mage.Owned[0] = true;
          classes.Mage.Owned[1] = true;
        } else if (playerStats.class[2] === 5) {
          classes.Mage.Owned[2] = true;
          classes.Mage.Owned[3] = true;
        } else if (playerStats.class[2] === 10) {
          classes.Mage.Owned[4] = true;
        }
        playerStats.abilities.name = [];
        playerStats.abilities.cost = [];
        for (let i in classes.Fighter.Owned) {
          if (classes.Fighter.Owned[i]) {
            playerStats.abilities.name.push(classes.Fighter.Names[i]);
            playerStats.abilities.cost.push(classes.Fighter.Cost[i]);
          }
          if (classes.Rogue.Owned[i]) {
            playerStats.abilities.name.push(classes.Rogue.Names[i]);
            playerStats.abilities.cost.push(classes.Rogue.Cost[i]);
          }
          if (classes.Mage.Owned[i]) {
            playerStats.abilities.name.push(classes.Mage.Names[i]);
            playerStats.abilities.cost.push(classes.Mage.Cost[i]);
          }
        }
      }
      game.state.start('stats');
    }
  }
};