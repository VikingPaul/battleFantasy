"use strict";
var playerStats = {};
playerStats.deathCount = 0;
playerStats.Lvl = 1;
var equipment;
var items;
var classes;
var loadState = {
  preload: function() {
    let dun = new XMLHttpRequest();
    dun.addEventListener("load", function() {
    dungeon = JSON.parse(this.responseText);
  });
    dun.open("GET", "../json/firstDungeon.json");
    dun.send();
    let classes = new XMLHttpRequest();
    classes.addEventListener("load", loadState.XHRclasses);
    classes.open("GET", "../json/classes.json");
    classes.send();
    let equip = new XMLHttpRequest();
    equip.addEventListener("load", loadState.XHREquip);
    equip.open("GET", "../json/equipment.json");
    equip.send();
    let item = new XMLHttpRequest();
    item.addEventListener("load", loadState.XHRItem);
    item.open("GET", "../json/items.json");
    item.send();
    var loadingLabel = game.add.text(80, 150, 'loading...',
      {
        front: '30px Courier',
        fill: '#ffffff'
    });
    game.load.spritesheet('selector', '../pixels/selector/selector.png', 40, 40);
//////////////////////////////////////////////////////////
////////////////////  Character  /////////////////////////
//////////////////////////////////////////////////////////
    game.load.spritesheet('characterMovement', '../pixels/character/characterMovement.png', 96, 96);
    game.load.image('characterBattle', '../pixels/character/characterBattle.png');
//////////////////////////////////////////////////////////
////////////////////////  Stone  /////////////////////////
//////////////////////////////////////////////////////////
    game.load.image('stoneFloor', '../pixels/stone/stoneFloor.png');
    game.load.image('stoneWall', '../pixels/stone/stoneWall.png');
    game.load.image('stoneStairs', '../pixels/stone/stoneStairs.png');
    game.load.image('stoneThrone', '../pixels/stone/stoneThrone.png');
    game.load.image('stoneShop', '../pixels/stone/stoneShop.png');
    game.load.image('stoneUp', '../pixels/stone/stoneUp.png');
    game.load.image('stoneDown', '../pixels/stone/stoneDown.png');
    game.load.image('battleIndoorStone', '../pixels/background/battleIndoorStone.png');

////////////////////////////////////////////////////////
////////////////////////  Grass  /////////////////////////
//////////////////////////////////////////////////////////
    game.load.image('grass', '../pixels/grass/grass.png');
    game.load.image('grassSteps', '../pixels/grass/grassSteps.png');
    game.load.image('grassHole', '../pixels/grass/grassHole.png');
    game.load.image('grassHoleLeft', '../pixels/grass/grassHoleLeft.png');
    game.load.image('grassHoleRight', '../pixels/grass/grassHoleRight.png');
    game.load.image('grassHoleTop', '../pixels/grass/grassHoleTop.png');
    game.load.image('grassHoleTopLeft', '../pixels/grass/grassHoleTopLeft.png');
    game.load.image('grassHoleTopRight', '../pixels/grass/grassHoleTopRight.png');
    game.load.image('grassHoleBottom', '../pixels/grass/grassHoleBottom.png');
    game.load.image('grassHoleBottomLeft', '../pixels/grass/grassHoleBottomLeft.png');
    game.load.image('grassHoleBottomRight', '../pixels/grass/grassHoleBottomRight.png');
    game.load.image('battleOutdoorGrass', '../pixels/background/battleOutdoorGrass.png');
//////////////////////////////////////////////////////////
//////////////////////  Enemies  /////////////////////////
//////////////////////////////////////////////////////////
    game.load.image('basicRedEnemy', '../pixels/enemies/basic/basicRedEnemy.png');
    game.load.image('basicGreenEnemy', '../pixels/enemies/basic/basicGreenEnemy.png');
    game.load.image('basicLightBlueEnemy', '../pixels/enemies/basic/basicLightBlueEnemy.png');
    game.load.image('basicPurpleEnemy', '../pixels/enemies/basic/basicPurpleEnemy.png');
    game.load.image('basicBlueEnemy', '../pixels/enemies/basic/basicBlueEnemy.png');
    game.load.image('basicYellowEnemy', '../pixels/enemies/basic/basicYellowEnemy.png');
//////////////////////////////////////////////////////////
//////////////////////  Boss  /////////////////////////
//////////////////////////////////////////////////////////
    game.load.image('level1Boss', '../pixels/enemies/bosses/boss.png');
//////////////////////////////////////////////////////////
///////////////////  background  /////////////////////////
//////////////////////////////////////////////////////////
    game.load.image('slateGrey', '../pixels/textBackground/slategrey.png');
    game.load.spritesheet('deathScene', '../pixels/textBackground/deathScene.png', 195, 195);
    //game.load.spritesheet('openingScene', '../pixels/textBackground/openingScene.png', 66, 66);
  },
  create: function() {
    game.state.start('menu');
  },
  XHREquip: function() {
    equipment = JSON.parse(this.responseText);
  },
  XHRItem: function() {
    items = JSON.parse(this.responseText);
  },
  XHRclasses: function() {
    classes = JSON.parse(this.responseText);
  }
};