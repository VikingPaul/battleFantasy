var statsLeft
var statsTotal
var statsLabel
var strengthLabel
var speedLabel
var magicLabel
var enterNum
var statsState = {
  create: function() {
    enterNum = 0
    statsLeft = 5
    statsTotal = 5
    playerHeight = 0
    playerWidth = 0
    playerStats.strength = 0
    playerStats.magic = 0
    playerStats.speed = 0
    statsLabel = game.add.text(300,80, 'Choose Starting Stats: 5', 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    statsLabel.anchor.setTo(.5, .5)
    strengthLabel = game.add.text(300,150, '0 :Strength', 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    strengthLabel.anchor.setTo(.5, .5)
    speedLabel = game.add.text(300,220, '0 :Speed', 
    {
      font: '50px Arial',
      fill: '#ffffff'
    });
    speedLabel.anchor.setTo(.5, .5)
    magicLabel = game.add.text(300,290, '0 :Magic', 
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
    if (cursors.up.isDown && statsLeft > 0) {
      statsState.statsIncrease()
      statsState.updateText()
      statsState.pause()
      statsState.pause()
      
    } else if (cursors.down.isDown && statsTotal !== statsLeft) {
      statsState.statsDecrease()
      statsState.updateText()
      statsState.pause()
      statsState.pause()
    } else if (enterKey.isDown) {
      statsState.next()
      statsState.pause()
      statsState.pause()
      statsTotal = statsLeft      
    }
  },
  updateText: function() {
    statsLabel.setText(`Choose Starting Stats: ${statsLeft}`)
    strengthLabel.setText(`${playerStats.strength} :Strength`)
    speedLabel.setText(`${playerStats.speed} :Speed`)
    magicLabel.setText(`${playerStats.magic} :Magic`)
  },
  statsIncrease: function() {
    if (enterNum == 0) {
      playerStats.strength++
      statsLeft--
    } else if (enterNum == 1) {
      playerStats.speed++
      statsLeft--
    } else if (enterNum == 2) {
      playerStats.magic++
      statsLeft--
    }
  },
  statsDecrease: function() {
    if (enterNum == 0) {
      playerStats.strength--
      statsLeft++
    } else if (enterNum == 1) {
      playerStats.speed--
      statsLeft++
    } else if (enterNum == 2) {
      playerStats.magic--
      statsLeft++
    }
  },
  pause: function() {
    game.paused = !game.paused
  },
  next: function() {
    enterNum++
    if (enterNum === 3) {
      playerStats.maxHealth = playerStats.strength*3+playerStats.speed+10
      playerStats.currentHealth = playerStats.maxHealth
      game.state.start('world')
    }
  }
}