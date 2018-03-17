import Phaser from 'phaser'

export default class HealthPlayer extends Phaser.Text {
  constructor (game, x, y, player) {
    const style = {
      fill: '#fff',
      font: '40px Bangers'
    }
    super(game, x, y, ` ${player.currentHealth} `, style)
    this.player = player
    this.player.updateHealth.add(this.updateHealthCount, this)
    this.createIcon()
    this.createSeparator()
  }

  createIcon () {
    const playerLife = this.game.make.sprite(
      -50,
      20,
      'playerLife'
    )
    playerLife.scale.setTo(0.8)
    this.addChild(playerLife)
  }

  createSeparator () {
    const separator = this.game.make.sprite(
      -16,
      21,
      'numeralX'
    )
    this.addChild(separator)
  }

  updateHealthCount () {
    this.text = ` ${this.player.currentHealth} `
  }
}
