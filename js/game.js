console.log('%c battleFantasy v.0.11.12.0.3 Developed by: VikingPaul ', 'background: #222; color: #bada55');
var game = new Phaser.Game(900,600, Phaser.AUTO, '')
game.state.add('load', loadState)
game.state.add('menu', menuState)
game.state.add('world', worldState)
game.state.add('battle', battleState)
game.state.add('win', winState)
game.state.add('escape', runState)
game.state.add('death', deathState)
game.state.add('stats', statsState)
game.state.add('pause', pauseState)
game.state.add('equip', equipState)

game.state.start('load')