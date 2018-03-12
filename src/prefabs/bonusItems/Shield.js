import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset) {
    super(game, x, y, asset)
    this.game = game
    this.animations.add('createShield', [0, 1, 2], 8, false)
    this.scale.setTo(0.6)
    this.anchor.setTo(0.5)
    this.play('createShield')
    this.game.add.existing(this)
  }
}
