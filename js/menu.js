var playerHeight
var playerWidth
playerStats.strength = 0
playerStats.magic = 0
playerStats.speed = 0
var menuState = {
  create: function() {
    playerHeight = 0
    playerWidth = 0
    gameCameraX = 0
    gameCameraY = 0
    var nameLabel = game.add.text(80,80, 'battleFantasy', 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    var versionLabel = game.add.text(390,90, '0.14.9.3', 
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
    game.state.start('class')
  }
}