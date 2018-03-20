import Phaser from 'phaser'
import Enemy from '../prefabs/Enemy'

export default class EnemyGenerator extends Phaser.Group {
  constructor (game, dataEnemies, currentEnemyIndex) {
    super(game, undefined, 'enemyGenerator', false, true)
    this.game = game
    this.dataEnemies = dataEnemies
    this.currentEnemyIndex = currentEnemyIndex
    this.createEnemy()
  }

  generate (_x, y, health, key, scale, speedX, speedY) {
    let enemy = this.getFirstExists(false)
    let x = this.game.rnd.integerInRange(0, this.game.world.width)
    if (!enemy) {
      enemy = new Enemy(this.game, x, y, key, health)
      this.add(enemy)
    }
    enemy.reset(x, y, health, key, scale, speedX, speedY)
  }

  createEnemy () {
    let nextEnemy = this.dataEnemies[this.currentEnemyIndex]
    if (nextEnemy) {
      let nextTime = 1000 * (nextEnemy.time - (this.currentEnemyIndex === 0 ? 0 : this.dataEnemies[this.currentEnemyIndex - 1].time))
      this.nextEnemyTime = this.game.time.events.add(nextTime, function () {
        this.generate(
          nextEnemy.x * this.game.world.width,
          -150,
          nextEnemy.health,
          nextEnemy.key,
          nextEnemy.scale,
          nextEnemy.speedX,
          nextEnemy.speedY)

        this.currentEnemyIndex++
        this.createEnemy()
      }, this)
    }
  }
}
