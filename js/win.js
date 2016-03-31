var winState = {
  create: function() {
    menu = game.add.group()
    menu.create(0,0,'slateGrey')
    menu.scale.setTo(10,10)
    var winLabel = game.add.text(80,80, 'WIN!', 
      {
        font: '50px Arial',
        fill: '#000000'
    });
  },
  update: function() {
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.addOnce(this.start, this);
  },
  start: function() {
    game.state.start('world')
  }
}