import Phaser from 'phaser'
import BulletGenerator from '../generators/Bullet'

export default class Player extends Phaser.Sprite {
  constructor (game, x, y, asset) {
    super(game, x, y, asset)
    this.game = game
    this.playerBullets = null
    this.scale.setTo(0.6)
    this.anchor.setTo(0.5)
    this.game.physics.arcade.enable(this)
    this.body.collideWorldBounds = true
    this.customParams = {shield: false}
    this.health = 3
    this.PLAYER_SPEED = 200
    this.BULLET_SPEED = -1000
    this.updateHealth = new Phaser.Signal()
    this.playerBullets = new BulletGenerator(this.game, this, 'top', 'bullet', this.BULLET_SPEED, 5)

    this.createSound()

    this.game.add.existing(this)
  }

  set currentHealth (val) {
    this.health = val
    this.updateHealth.dispatch()
    return this.health
  }

  get currentHealth () {
    return this.health
  }

  update () {
    this.body.velocity.x = 0
    this.body.velocity.y = 0
    if (this.game.input.activePointer.isDown) {
      let targetX = this.game.input.activePointer.position.x
      let direction = targetX >= this.game.world.centerX ? 1 : -1
      this.body.velocity.x = direction * this.PLAYER_SPEED
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      this.body.velocity.x = -this.PLAYER_SPEED
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
      this.body.velocity.x = this.PLAYER_SPEED
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
      this.body.velocity.y = -this.PLAYER_SPEED
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
      this.body.velocity.y = this.PLAYER_SPEED
    }
  }

  createSound () {
    this.lose = this.game.sound.add('lose')
  }

  damage (amount) {
    super.damage(amount)
    this.currentHealth = this.health
    if (this.health <= 0) {
      this.kill()
      this.lose.play()
      this.playerBullets.bulletTimer.pause()
    }
  }
}
