"use strict";
var background;
var deathState = {
  create: function() {
    background = game.add.sprite(0, 0, 'deathScene');
    background.scale.setTo(4.6,3.5);
    game.physics.arcade.enable(background);
    background.animations.add('only', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 8, false);
    background.animations.play('only');

    var moneyLabel = game.add.text(80,500, `you lost: ${Math.floor(playerStats.Money/4)} Gold\nand ${Math.ceil(playerStats.Exp/2)}`, 
    {
      font: '25px Arial',
      fill: '#000000'
    });
    playerStats.Money -= Math.floor(playerStats.Money/4);
    playerStats.Exp = Math.ceil(playerStats.Exp/2);
    
    death = true;
    var nameLabel = game.add.text(80,80, 'YOU DIED', 
    {
      font: '50px Arial',
      fill: '#000000'
    });
    playerStats.deathCount++;
    var versionLabel = game.add.text(390,90, playerStats.deathCount, 
    {
      font: '10px Arial',
      fill: '#000000'
    });
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.addOnce(this.start, this);
  },
  start: function() {
    game.state.start('menu');
  }
};