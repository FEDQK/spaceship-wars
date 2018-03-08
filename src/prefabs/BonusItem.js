import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, type }) {
    super(game, x, y, asset)
    game.physics.arcade.enable(this)
    this.anchor.setTo(0.5)
    this.scale.setTo(0.7)
    this.checkWorldBounds = true
    this.outOfBoundsKill = true
    this.BONUS_ITEM_SPEED = 100
    this.body.velocity.setTo(0, this.BONUS_ITEM_SPEED)
  }
}
