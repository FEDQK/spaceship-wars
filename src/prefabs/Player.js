import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset) {
    super(game, x, y, asset)
    this.game = game
    this.scale.setTo(0.6)
    this.anchor.setTo(0.5)
    this.game.physics.arcade.enable(this)
    this.body.collideWorldBounds = true
    this.customParams = {shield: false}
    this.health = 3
    this.PLAYER_SPEED = 200
    this.game.add.existing(this)
  }

  update () {
    this.body.velocity.x = 0
    if (this.game.input.activePointer.isDown) {
      let targetX = this.game.input.activePointer.position.x
      let direction = targetX >= this.game.world.centerX ? 1 : -1
      this.body.velocity.x = direction * this.PLAYER_SPEED
    }
  }

  damage (amount) {
    super.damage(amount)
    if (this.health <= 0) {
      this.kill()
    }
  }
}
