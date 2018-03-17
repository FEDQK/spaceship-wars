import Phaser from 'phaser'
const BONUS_ITEM_SPEED = 100

export default class BonusItem extends Phaser.Sprite {
  constructor ({ game, x, y, asset, type }) {
    super(game, x, y, asset)
    game.physics.arcade.enable(this)
    this.anchor.setTo(0.5)
    this.scale.setTo(0.7)
    this.checkWorldBounds = true
    this.outOfBoundsKill = true
    this.body.velocity.setTo(0, BONUS_ITEM_SPEED)
  }
}
