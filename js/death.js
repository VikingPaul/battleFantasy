var deathState = {
  create: function() {
    var nameLabel = game.add.text(80,80, 'YOU DIED', 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    playerStats.deathCount++
    var versionLabel = game.add.text(390,90, playerStats.deathCount, 
    {
      font: '10px Arial',
      fill: '#ffffff'
    });
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.addOnce(this.start, this);
  },
  start: function() {
    game.state.start('menu')
  }
}