var playerStats = {}
playerStats.deathCount = 0
playerStats.Lvl = 1
var loadState = {
  preload: function() {
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
  },
  create: function() {
    game.state.start('menu')
  },
}