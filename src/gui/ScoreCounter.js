import Phaser from 'phaser'
import Score from '../service/Score'

export default class ScoreCounter extends Phaser.Text {
  constructor (game, x, y) {
    const style = {
      fill: '#fff',
      font: '23px Bangers'
    }
    super(game, x, y, '0', style)

    this.score = new Score()
    this.score.updateScore.add(this.score.score, this)
  }
}
