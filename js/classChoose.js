playerStats.class = [0,0,0]
var classLeft = 0
var classTotal = 0
var classState = {
  create: function() {
    enterNum = 0
    if (!death) {
      classLeft += 1
      classTotal += 1
    }
    statsLabel = game.add.text(300,80, `Choose Class: ${classLeft}`, 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    statsLabel.anchor.setTo(.5, .5)
    strengthLabel = game.add.text(300,150, `${playerStats.class[0]} :Fighter`, 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    strengthLabel.anchor.setTo(.5, .5)
    speedLabel = game.add.text(300,220, `${playerStats.class[1]} :Rogue`, 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    speedLabel.anchor.setTo(.5, .5)
    magicLabel = game.add.text(300,290, `${playerStats.class[2]} :Mage`, 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    magicLabel.anchor.setTo(.5, .5)
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
      classState.statsIncrease()
      classState.updateText()
      classState.pause()
      classState.pause()
      
    } else if (cursors.down.isDown && classTotal !== classLeft) {
      classState.statsDecrease()
      classState.updateText()
      classState.pause()
      classState.pause()
    } else if (enterKey.isDown) {
      classState.next()
      classState.pause()
      classState.pause()
      statsTotal = statsLeft      
    }
  },
  updateText: function() {
    statsLabel.setText(`Choose Class: ${classLeft}`)
    strengthLabel.setText(`${playerStats.class[0]} :Fighter`)
    speedLabel.setText(`${playerStats.class[1]} :Rogue`)
    magicLabel.setText(`${playerStats.class[2]} :Mage`)
  },
  statsIncrease: function() {
    if (enterNum == 0) {
      playerStats.class[0]++
      classLeft--
    } else if (enterNum == 1) {
      playerStats.class[1]++
      classLeft--
    } else if (enterNum == 2) {
      playerStats.class[2]++
      classLeft--
    }
  },
  statsDecrease: function() {
    if (enterNum == 0) {
      playerStats.class[0]--
      classLeft++
    } else if (enterNum == 1) {
      playerStats.class[1]--
      classLeft++
    } else if (enterNum == 2) {
      playerStats.class[2]--
      classLeft++
    }
  },
  pause: function() {
    game.paused = !game.paused
  },
  next: function() {
    enterNum++
    if (enterNum === 3) {
      game.state.start('stats')
    }
  }
}