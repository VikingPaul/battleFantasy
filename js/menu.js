var playerHeight
var playerWidth
var menuState = {
  create: function() {
    playerHeight = 0
    playerWidth = 0
    playerStats.strength = 1
    playerStats.magic = 1
    playerStats.speed = 1
    playerStats.maxHealth = playerStats.strength*3+playerStats.speed+10
    playerStats.currentHealth = playerStats.maxHealth

    var nameLabel = game.add.text(80,80, 'battleFantasy', 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    var versionLabel = game.add.text(390,90, '0.3.20.0.0', 
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
    game.state.start('world')
  }
}