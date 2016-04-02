playerStats.Exp = 0
var levelUp
var winState = {
  create: function() {
    levelUp = false
    menu = game.add.group()
    menu.create(0,0,'slateGrey')
    menu.scale.setTo(10,10)
    var winLabel = game.add.text(80,80, 'WIN!', 
      {
        font: '50px Arial',
        fill: '#000000'
    });
    var instructionsLabel = game.add.text(80, game.world.height-80, 'press space to continue', 
      {
        font: '20px Arial',
        fill: '#000000'
    });
    var expLabel = game.add.text(80,125, `Exp: ${enemyExp}!`, 
      {
        font: '25px Arial',
        fill: '#000000'
    });
    playerStats.Exp += enemyExp
    if (playerStats.Exp >= 50+50*(playerStats.Lvl)) {
      var lvlUpLabel = game.add.text(80,145, `LEVEL UP!`, 
        {
          font: '25px Arial',
          fill: '#000000'
      });
      levelUp = true
      playerStats.Exp -= 50+50*(playerStats.Lvl)
      playerStats.Lvl++
      var toNextLevelLabel = game.add.text(80,165, `${playerStats.Exp} / ${50+50*(playerStats.Lvl)}`, 
        {
          font: '25px Arial',
          fill: '#000000'
      });
    } else {
      var toNextLevelLabel = game.add.text(80,145, `${playerStats.Exp} / ${50+50*(playerStats.Lvl)}`, 
        {
          font: '25px Arial',
          fill: '#000000'
      });

    }
  },
  update: function() {
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    if (levelUp) {
      spaceKey.onDown.addOnce(this.levelUp, this)
    } else {
      spaceKey.onDown.addOnce(this.start, this);
    }
  },
  start: function() {
    game.state.start('world')
  },
  levelUp: function() {
    game.state.start('stats')
  }
}