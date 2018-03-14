import Phaser from 'phaser'

export default class Score {
  constructor () {
    this.score = 0
    this.updateScore = new Phaser.Signal()
  }

  set currentScore (val) {
    this.score = val
    this.updateScore.dispatch()
    return this.score
  }

  get currentScore () {
    return this.score
  }
}
