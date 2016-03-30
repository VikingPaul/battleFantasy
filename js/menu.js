var menuState = {
  create: function() {
    var nameLabel = game.add.text(80,80, 'battleFantasy', 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    var versionLabel = game.add.text(390,90, '0.1.22.0.0', 
    {
      font: '10px Arial',
      fill: '#ffffff'
    });
    var startLabel = game.add.text(80, game.world.height-80, 'press space to start',
    {
      font: '25px Arial',
      fill: '#ffffff'
    });
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.addOnce(this.start, this);
  },
  start: function() {
    game.state.start('world')
  }
}