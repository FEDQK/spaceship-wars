import Phaser from 'phaser'
import EnemyBullet from '../prefabs/EnemyBullet'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, health, enemyBullets }) {
    super(game, x, y, asset)
    this.game = game
    // this.game.physics.arcade.enable(this)

    this.anchor.setTo(0.5)
    this.animations.add('getHit', [0, 1, 2, 1, 0], 25, false)
    this.health = health

    this.BULLET_SPEED = 100
    this.enemyBullets = enemyBullets
    this.enemyTimer = this.game.time.create(false)
    this.enemyTimer.start()
    this.scheduleShooting()
  }

  update () {
    if (this.x < 0.1 * this.game.world.width) {
      this.x = 0.1 * this.game.world.width + 2
      this.body.velocity.x *= -1
    } else if (this.x > 0.9 * this.game.world.width) {
      this.x = 0.9 * this.game.world.width - 2
      this.body.velocity.x *= -1
    }

    if (this.top > this.game.world.height) {
      this.kill()
    }
  }

  damage (amount) {
    super.damage(amount)
    this.play('getHit')

    if (this.health <= 0) {
      let emitter = this.game.add.emitter(this.x, this.y, 100)
      emitter.makeParticles('enemyParticle')
      emitter.minParticleSpeed.setTo(-200, -200)
      emitter.maxParticleSpeed.setTo(200, 200)
      emitter.gravity = 0
      emitter.start(true, 500, null, 100)

      this.enemyTimer.pause()
    }
  }

  scheduleShooting () {
    this.shoot()
    this.enemyTimer.add(Phaser.Timer.SECOND * 2, this.scheduleShooting, this)
  }

  shoot () {
    let bullet = this.enemyBullets.getFirstExists(false)
    if (!bullet) {
      bullet = new EnemyBullet({
        game: this.game,
        x: this.x,
        y: this.bottom,
        asset: 'bullet'
      })
      this.enemyBullets.add(bullet)
    } else {
      bullet.reset(this.x, this.y)
    }
    bullet.body.velocity.y = this.BULLET_SPEED
  }

  reset (x, y, health, key, scale, speedX, speedY) {
    super.reset(x, y, health)
    this.loadTexture(key)
    this.scale.setTo(scale)
    this.body.velocity.x = speedX
    this.body.velocity.y = speedY
    this.enemyTimer.resume()
  }
}