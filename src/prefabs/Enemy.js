import Phaser from 'phaser'
import BulletGenerator from '../generators/Bullet'
import Service from '../service'

export default class Enemy extends Phaser.Sprite {
  constructor ({ game, x, y, asset, health }) {
    super(game, x, y, asset)
    this.game = game
    this.game.physics.arcade.enable(this)

    this.anchor.setTo(0.5)
    this.animations.add('getHit', [0, 1, 2, 1, 0], 25, false)
    this.health = health
    this.scoreValue = this.health * 10

    this.score = Service.get('Score')

    this.BULLET_SPEED = 100
    this.enemyBullets = new BulletGenerator(this.game, this, 'bottom', 'enemyBullet', this.BULLET_SPEED, 0.5, true)
    this.createSound()
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
    this.zap.play()

    if (this.health <= 0) {
      const lifespan = 500
      let emitter = this.game.add.emitter(this.x, this.y, 100)
      emitter.makeParticles('enemyParticle')
      emitter.minParticleSpeed.setTo(-200, -200)
      emitter.maxParticleSpeed.setTo(200, 200)
      emitter.gravity = 0
      emitter.setAlpha(1, 0, lifespan)
      emitter.start(true, lifespan, null, 100)

      this.score.currentScore += this.scoreValue
      this.enemyBullets.bulletTimer.pause()
    }
  }

  kill () {
    super.kill()
    this.enemyBullets.bulletTimer.pause()
  }

  createSound () {
    this.zap = this.game.sound.add('zap', 0.1)
  }

  reset (x, y, health, key, scale, speedX, speedY) {
    super.reset(x, y, health)
    this.loadTexture(key)
    this.scale.setTo(scale)
    this.body.velocity.x = speedX
    this.body.velocity.y = speedY
    this.enemyBullets.bulletTimer.resume()
  }
}
