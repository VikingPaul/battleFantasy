"use strict";
var playerHeight;
var playerWidth;
playerStats.strength = 0;
playerStats.magic = 0;
playerStats.speed = 0;
var menuState = {
  create: function() {
    playerHeight = 100;
    playerWidth = 100;
    gameCameraX = 0;
    gameCameraY = 0;
    // background = game.add.sprite(300, 200, 'openingScene');
    // background.scale.setTo(4.6,3.5);
    // game.physics.arcade.enable(background);
    // background.animations.add('only', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64], 8, false);
    // background.animations.play('only');
    var nameLabel = game.add.text(80,80, 'battleFantasy', 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    var versionLabel = game.add.text(390,90, '0.16.7.0', 
    {
      font: '10px Arial',
      fill: '#ffffff'
    });
    var startLabel = game.add.text(80, game.world.height-80, 'press space to start',
    {
      font: '25px Arial',
      fill: '#ffffff',
      align: 'center'
    });
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.addOnce(this.start, this);
  },
  start: function() {
    game.state.start('class');
  }
};