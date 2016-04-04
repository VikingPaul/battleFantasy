var playerStats = {}
playerStats.deathCount = 0
playerStats.Lvl = 1
var equipment
var items
var loadState = {
  preload: function() {
    var equip = new XMLHttpRequest();
    equip.addEventListener("load", loadState.XHREquip);
    equip.open("GET", "../json/equipment.json");
    equip.send()
    var item = new XMLHttpRequest();
    item.addEventListener("load", loadState.XHRItem);
    item.open("GET", "../json/items.json");
    item.send()
    var loadingLabel = game.add.text(80, 150, 'loading...',
      {
        front: '30px Courier',
        fill: '#ffffff'
    })
    game.load.spritesheet('selector', '../pixels/selector/selector.png', 40, 40);
//////////////////////////////////////////////////////////
////////////////////  Character  /////////////////////////
//////////////////////////////////////////////////////////
    game.load.spritesheet('characterMovement', '../pixels/character/characterMovement.png', 96, 96);
    game.load.image('characterBattle', '../pixels/character/characterBattle.png');
//////////////////////////////////////////////////////////
////////////////////////  Grass  /////////////////////////
//////////////////////////////////////////////////////////
    game.load.image('grass', '../pixels/grass/grass.png')
    game.load.image('grassSteps', '../pixels/grass/grassSteps.png')
    game.load.image('grassHole', '../pixels/grass/grassHole.png')
    game.load.image('grassHoleLeft', '../pixels/grass/grassHoleLeft.png')
    game.load.image('grassHoleRight', '../pixels/grass/grassHoleRight.png')
    game.load.image('grassHoleTop', '../pixels/grass/grassHoleTop.png')
    game.load.image('grassHoleTopLeft', '../pixels/grass/grassHoleTopLeft.png')
    game.load.image('grassHoleTopRight', '../pixels/grass/grassHoleTopRight.png')
    game.load.image('grassHoleBottom', '../pixels/grass/grassHoleBottom.png')
    game.load.image('grassHoleBottomLeft', '../pixels/grass/grassHoleBottomLeft.png')
    game.load.image('grassHoleBottomRight', '../pixels/grass/grassHoleBottomRight.png')
    game.load.image('battleOutdoorGrass', '../pixels/background/battleOutdoorGrass.png')
//////////////////////////////////////////////////////////
//////////////////////  Enemies  /////////////////////////
//////////////////////////////////////////////////////////
    game.load.image('basicRedEnemy', '../pixels/enemies/basic/basicRedEnemy.png')
    game.load.image('basicGreenEnemy', '../pixels/enemies/basic/basicGreenEnemy.png')
    game.load.image('basicLightBlueEnemy', '../pixels/enemies/basic/basicLightBlueEnemy.png')
    game.load.image('basicPurpleEnemy', '../pixels/enemies/basic/basicPurpleEnemy.png')
    game.load.image('basicBlueEnemy', '../pixels/enemies/basic/basicBlueEnemy.png')
    game.load.image('basicYellowEnemy', '../pixels/enemies/basic/basicYellowEnemy.png')
//////////////////////////////////////////////////////////
///////////////////  background  /////////////////////////
//////////////////////////////////////////////////////////
    game.load.image('slateGrey', '../pixels/textBackground/slategrey.png')
    game.load.spritesheet('deathScene', '../pixels/textBackground/deathScene.png', 195, 195)
  },
  create: function() {
    game.state.start('menu')
  },
  XHREquip: function() {
    equipment = JSON.parse(this.responseText)
  },
  XHRItem: function() {
    items = JSON.parse(this.responseText)
  }
}