import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class Splash extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.image('space', 'assets/images/space.png')
    this.load.image('player', 'assets/images/player.png')
    this.load.image('bullet', 'assets/images/bullet.png')
    this.load.image('enemyBullet', 'assets/images/enemy-bullet.png')
    this.load.image('enemyParticle', 'assets/images/enemyParticle.png')
    this.load.image('bonusShield', 'assets/images/bonus-shield.png')
    this.load.image('tripleShot', 'assets/images/triple-shot.png')
    this.load.image('playerLife', 'assets/images/player-life.png')
    this.load.image('numeralX', 'assets/images/numeralX.png')
    this.load.spritesheet('enemy1', 'assets/images/enemy1.png', 93, 84, 3)
    this.load.spritesheet('enemy2', 'assets/images/enemy2.png', 104, 84, 3)
    this.load.spritesheet('enemy3', 'assets/images/enemy3.png', 103, 84, 3)
    this.load.spritesheet('enemy4', 'assets/images/enemy4.png', 82, 84, 3)
    this.load.spritesheet('shield', 'assets/images/shield.png', 144, 137, 3)
    this.load.text('level1', 'assets/data/level1.json')
    this.load.text('level2', 'assets/data/level2.json')
    this.load.text('level3', 'assets/data/level3.json')
    this.load.audio('music', ['assets/audio/Chameleon-Dream_Awakening.mp3', 'assets/audio/Chameleon-Dream_Awakening.ogg'])
    this.load.audio('zap', 'assets/audio/zap.ogg')
    this.load.audio('lose', 'assets/audio/lose.ogg')
    this.load.audio('shieldUp', 'assets/audio/shieldUp.ogg')
    this.load.audio('shieldDown', 'assets/audio/shieldDown.ogg')
  }

  create () {
    this.state.start('Game')
  }
}
