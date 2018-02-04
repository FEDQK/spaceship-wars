import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
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
    this.load.image('enemyParticle', 'assets/images/enemyParticle.png')
    this.load.spritesheet('enemy1', 'assets/images/enemy1.png', 93, 84, 3)
    this.load.spritesheet('enemy2', 'assets/images/enemy1.png', 104, 84, 3)
    this.load.spritesheet('enemy3', 'assets/images/enemy1.png', 103, 84, 3)
    this.load.spritesheet('enemy4', 'assets/images/enemy1.png', 82, 84, 3)
  }

  create () {
    this.state.start('Game')
  }
}
