"use strict";
playerStats.weapon = {};
playerStats.armor = {};
var weaponLabel;
var armorLabel;
var equipNum = 0;
var equipState = {
  create: function() {
    items.Potions[0].Owned = 5;
    enterNum = 0;
    weaponLabel = game.add.text(450,80, `Weapon: Beginner Sword`, 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    weaponLabel.anchor.setTo(0.5, 0.5);
    strengthLabel = game.add.text(450,250, `Strength: +${equipment.Weapon[equipNum].Beginner.Stats[0]}`, 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    strengthLabel.anchor.setTo(0.5, 0.5);
    speedLabel = game.add.text(450,310, `Speed: +${equipment.Weapon[equipNum].Beginner.Stats[1]}`, 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    speedLabel.anchor.setTo(0.5, 0.5);
    magicLabel = game.add.text(450,370, `Magic: +${equipment.Weapon[equipNum].Beginner.Stats[2]}`, 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    magicLabel.anchor.setTo(0.5, 0.5);
    armorLabel = game.add.text(450,150, `Armor: Beginner Light Armor`, 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    armorLabel.anchor.setTo(0.5, 0.5);
    var startLabel = game.add.text(80, game.world.height-80, 'press enter to next',
    {
      font: '25px Arial',
      fill: '#ffffff',
      align: 'center'
    });
    var startLabel = game.add.text(80, game.world.height-100, 'up/down to choose',
    {
      font: '25px Arial',
      fill: '#ffffff',
      align: 'center'
    });
    cursors = game.input.keyboard.createCursorKeys();
  },
  update: function() {
    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    if (cursors.up.isDown && equipNum > 0) {
      equipNum--;
      equipState.updateText();
      equipState.pause();
      equipState.pause();
    } else if (cursors.down.isDown && equipNum < 2) {
      equipNum++;
      equipState.updateText();
      equipState.pause();
      equipState.pause();
    }
    if (enterKey.isDown) {
      if (enterNum === 0) {
        equipment.Weapon[equipNum].Beginner.Owned = true;
        equipment.Weapon[equipNum].Beginner.Equiped = true;
        playerStats.weapon.name = equipment.Weapon[equipNum].Beginner.Name;
        playerStats.weapon.stats = equipment.Weapon[equipNum].Beginner.Stats;
      } else if (enterNum === 1) {
        equipment.Armor[equipNum].Beginner.Owned = true;
        equipment.Armor[equipNum].Beginner.Equiped = true;
        playerStats.armor.name = equipment.Armor[equipNum].Beginner.Name;
        playerStats.armor.stats = equipment.Armor[equipNum].Beginner.Stats;
      }
      enterNum++;
      equipState.updateText();
      equipState.pause();
      equipState.pause();
    }
  },
  updateText: function() {
    if (enterNum === 2) {
      equipState.next();
    }
    if (enterNum === 1) {
      armorLabel.setText(`Armor: ${equipment.Armor[equipNum].Beginner.Name}`);
      strengthLabel.setText(`Protection: +${equipment.Armor[equipNum].Beginner.Stats[0]}`);
      speedLabel.setText(`Speed: +${equipment.Armor[equipNum].Beginner.Stats[1]}`);
      magicLabel.setText(`Magic defense: +${equipment.Armor[equipNum].Beginner.Stats[2]}`);
    }
    if (enterNum === 0) {
      weaponLabel.setText(`Weapon: ${equipment.Weapon[equipNum].Beginner.Name}`);
      strengthLabel.setText(`Strength: +${equipment.Weapon[equipNum].Beginner.Stats[0]}`);
      speedLabel.setText(`Speed: +${equipment.Weapon[equipNum].Beginner.Stats[1]}`);
      magicLabel.setText(`Magic: +${equipment.Weapon[equipNum].Beginner.Stats[2]}`);
    }
    
  },
  pause: function() {
    game.paused = !game.paused;
  },
  next: function() {
    game.state.start('world');
  }
};