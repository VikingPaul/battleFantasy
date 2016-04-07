var amount = 0
var shopState = {
  create: function() {
    amount = 0
    pauseState.pause()
    pauseState.pause()
    shopState.updateText()
    document.addEventListener("keyup", events)
  },
  update: function() {
    if (cursors.up.isDown) {
      amount++
      shopState.pause()
      shopState.pause()
    } else if (cursors.down.isDown && amount > 0) {
      amount--
      shopState.pause()
      shopState.pause()
    }
    amountText.setText(`${amount}`)
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    if (spaceKey.isDown) {
      document.removeEventListener("keyup", events)
      game.state.start(lastPage)
    }
    
  },
  updateText: function() {
    game.world.removeAll();
    game.world.resize(900, 600);
    menu = game.add.group()
    menu.create(0,0,'slateGrey')
    menu.scale.setTo(10,7)
    amountText = game.add.text(500,300, `${amount}`)
    amountText.anchor.setTo()
    game.add.text(350,550, `You have: ${playerStats.Money} Gold`, 
        {
          font: '20px Arial',
          fill: '#000000'
        })
    for (let i =0; i < items.Potions.length+items.Granades.length; i++) {
      if (i < 4) {
        game.add.text(30,i*25, `${i+1}: ${items.Potions[i].Name}(${items.Potions[i].Ability[0]}HP): ${items.Potions[i].Owned}:::: ${items.Potions[i].Price} Gold`, 
        {
          font: '15px Arial',
          fill: '#000000'
        });
      } else if (i > 3 && i < 7) {
        game.add.text(30,i*25, `${i+1}: ${items.Potions[i].Name}(${items.Potions[i].Ability[1]}MP): ${items.Potions[i].Owned}:::: ${items.Potions[i].Price} Gold`, 
        {
          font: '15px Arial',
          fill: '#000000'
        });
      } else if (i === 7) {
        game.add.text(30,i*25, `${i+1}: ${items.Granades[0].Name}(Power: ${items.Granades[0].Damage}): ${items.Granades[0].Owned}:::: ${items.Granades[0].Price} Gold`, 
        {
          font: '15px Arial',
          fill: '#000000'
        });
      } else if (i >= 8) {
        game.add.text(30,550, `spacebar to exit`);
      }
    }
  },
  pause: function() {
    game.paused = !game.paused
  },
  buyItem: function(num) {
    if (num < items.Potions.length){
      items.Potions[num].Owned += amount
      playerStats.Money -= items.Potions[num].Price*amount
    } else if (num < items.Potions.length+items.Granades.length){
      items.Granades[num].Owned += amount
      playerStats.Money -= items.Granades[num].Price*amount
    }
    amount = 0
    shopState.updateText()
    shopState.pause()
    shopState.pause()
  }
}
var events = function(e) {
  shopState.pause()
  if (e.code === "Digit1" && items.Potions[0].Price*amount <= playerStats.Money) {
  shopState.buyItem(0)
  } else if (e.code === "Digit2" && items.Potions[1].Price*amount <= playerStats.Money) {
  shopState.buyItem(1)
  } else if (e.code === "Digit3" && items.Potions[2].Price*amount <= playerStats.Money) {
  shopState.buyItem(2)
  } else if (e.code === "Digit4" && items.Potions[3].Price*amount <= playerStats.Money) {
  shopState.buyItem(3)
  } else if (e.code === "Digit5" && items.Potions[4].Price*amount <= playerStats.Money) {
  shopState.buyItem(4)
  } else if (e.code === "Digit6" && items.Potions[5].Price*amount <= playerStats.Money) {
  shopState.buyItem(5)
  } else if (e.code === "Digit7" && items.Potions[6].Price*amount <= playerStats.Money) {
  shopState.buyItem(6)
  } else if (e.code === "Digit8" && items.Granades[0].Price*amount <= playerStats.Money) {
  shopState.buyItem(7)
  }
  shopState.pause()
}