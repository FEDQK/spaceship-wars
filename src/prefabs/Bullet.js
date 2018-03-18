import Phaser from 'phaser'

export default class Bullet extends Phaser.Sprite {
  constructor (game, x, y, asset, isEnemyBullet) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    if (isEnemyBullet) {
      this.angle = 180
    }
    this.checkWorldBounds = true
    this.outOfBoundsKill = true
  }
}
