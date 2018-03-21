import Phaser from 'phaser'
import BonusItem from '../prefabs/BonusItem'

export default class BonusItemGenerator extends Phaser.Group {
  constructor (game, posX, posY) {
    super(game, undefined, 'bonusItemGenerator', false, true)
    this.game = game
    this.posX = posX
    this.posY = posY
    this.types = ['bonusShield', 'tripleShot']
  }

  generate (x, y) {
    let bonusItem = this.getFirstExists(false)
    if (!bonusItem) {
      bonusItem = new BonusItem(this.game, x, y, this.game.rnd.pick(this.types))
      this.add(bonusItem)
    } else {
      bonusItem.reset(x, y)
    }
  }
}
