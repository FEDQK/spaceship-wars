import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, health, enemyBullets }) {
    super(game, x, y, asset)
    this.game = game
    // this.game.physics.arcade.enable(this)

    this.anchor.setTo(0.5)
    this.animations.add('getHit', [0, 1, 2, 1, 0], 25, false)
    this.health = health
    this.enemyBullets = enemyBullets
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
  }
}
