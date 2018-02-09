import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    game.physics.p2.enable(this, true)
    this.body.static = true
    this.checkWorldBounds = true
    this.outOfBoundsKill = true
  }
}
