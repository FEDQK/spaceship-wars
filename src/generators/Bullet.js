import Phaser from 'phaser'
import Bullet from '../prefabs/Bullet'

export default class BulletGenerator extends Phaser.Group {
  constructor (game, sprite, side, assetName, bulletSpeed, timeCreate, isEnemy = false) {
    super(game, undefined, 'bulletGenerator', false, true)
    this.game = game
    this.sprite = sprite
    this.side = side
    this.isEnemy = isEnemy
    this.assetName = assetName
    this.timeCreate = timeCreate
    this.bulletSpeed = bulletSpeed
    this.bulletTimer = this.game.time.create(false)
    this.bulletTimer.start()
    this.scheduleShooting()
  }

  generate () {
    let bullet = this.getFirstExists(false)
    if (!bullet) {
      bullet = new Bullet(this.game, this.sprite.x, this.sprite[this.side], this.assetName, this.isEnemy)
      this.add(bullet)
    } else {
      bullet.reset(this.sprite.x, this.sprite[this.side])
    }
    bullet.body.velocity.y = this.bulletSpeed
  }

  scheduleShooting () {
    this.generate()
    this.bulletTimer.add(Phaser.Timer.SECOND / this.timeCreate, this.scheduleShooting, this)
  }
}
