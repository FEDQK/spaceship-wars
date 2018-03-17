import Phaser from 'phaser'

export default class Shield extends Phaser.Sprite {
  constructor (game, x, y, asset) {
    super(game, x, y, asset)
    this.game = game
    this.game.physics.arcade.enable(this)
    this.animations.add('createShield', [0, 1, 2], 8, false)
    this.scale.setTo(0.6)
    this.anchor.setTo(0.5)
    this.play('createShield')
    this.createSounds()

    this.game.add.existing(this)
  }

  createSounds () {
    const volume = 0.1
    this.shieldUp = this.game.sound.add('shieldUp', volume)
    this.shieldDown = this.game.sound.add('shieldDown', volume)
  }

  damage (amount) {
    super.damage(amount)
    this.shieldDown.play()
  }
}
