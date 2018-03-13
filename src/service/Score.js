import Phaser from 'phaser'

export default class Score {
  constructor () {
    this.score = 0
    this.updateScore = new Phaser.Signal()
  }

  set score (val) {
    this.score = val
    this.updateScore.dispatch()
    return this.score
  }

  get score () {
    return this.score
  }
}
