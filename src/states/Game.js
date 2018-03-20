import Phaser from 'phaser'
import BonusItem from '../prefabs/BonusItem'
import Player from '../prefabs/Player'
import Shield from '../prefabs/bonusItems/Shield'
import Service from '../service'
import ScoreCounter from '../gui/ScoreCounter'
import HealthPlayer from '../gui/HealthPlayer'
import EnemyGenerator from '../generators/Enemy'

export default class Game extends Phaser.State {
  init (currentLevel) {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.score = Service.get('Score')
    this.score.currentScore = 0

    this.numLevels = 3
    this.currentLevel = currentLevel || 1
    console.log('current level - ' + this.currentLevel)
  }
  preload () {}

  create () {
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space')
    this.background.autoScroll(0, 30)

    this.player = new Player(this.game, this.game.world.centerX, this.game.world.height - 50, 'player')
    this.createHealthLabel()

    this.loadLevel()
    this.music = this.game.sound.add('music', 0.1)
    if (!this.music.isPlaying) {
      this.music.play()
    }
    this.createScoreLabel()
    // this.createShield()
    this.initBonusItems()
    this.createBonusItem(300, 700)
    // const bannerText = 'Phaser + ES6 + Webpack'
    // let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
    //   font: '40px Bangers',
    //   fill: '#77BFA3',
    //   smoothed: false
    // })
    //
    // banner.padding.set(10, 16)
    // banner.anchor.setTo(0.5)
    //
    // this.mushroom = new Mushroom({
    //   game: this.game,
    //   x: this.world.centerX,
    //   y: this.world.centerY,
    //   asset: 'mushroom'
    // })
    //
    // this.game.add.existing(this.mushroom)
  }

  update () {    
    this.game.physics.arcade.overlap(this.player.playerBullets, this.enemies, this.damageEnemy, null, this)
    this.enemies.children.forEach((enemy) => {
      this.game.physics.arcade.overlap(enemy.enemyBullets, [this.shield, this.player], this.damagePlayer, null, this)
    })
    this.game.physics.arcade.overlap(this.enemies, [this.shield, this.player], this.damagePlayer, null, this)
    this.game.physics.arcade.overlap(this.bonusItems, this.player, this.activateBonusItem, null, this)

    if (this.player.customParams.shield) {
      this.shield.x = this.player.x
      this.shield.y = this.player.y
    }
    if (this.player.health <= 0) {
      this.restart()
    }
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.bonusItems, 32, 32)
    // }
  }

  initBonusItems () {
    this.bonusItems = this.add.group()
    this.bonusItems.enableBody = true
  }

  createBonusItem (x, y) {
    let bonusItem = new BonusItem({
      game: this.game,
      x: x,
      y: y,
      asset: 'bonusShield'
    })
    this.bonusItems.add(bonusItem)
  }

  createShield () {
    this.player.customParams.shield = true
    this.shield = new Shield(this.game, this.player.x, this.player.y, 'shield')
    this.shield.shieldUp.play()
  }

  initEnemies () {
    this.enemies = new EnemyGenerator(this.game, this.levelData.enemies, this.currentEnemyIndex)
  }

  damageEnemy (bullet, enemy) {
    // this.createBonusItem(enemy.x, enemy.y)
    enemy.damage(1)
    bullet.kill()
  }

  damagePlayer (player, bulletOrEnemy) {
    bulletOrEnemy.kill()
    player.damage(1)
  }

  restart () {
    this.game.state.start('Game')
  }

  activateBonusItem (player, bonusItem) {
    this.createShield()
    bonusItem.kill()
  }

  loadLevel () {
    this.currentEnemyIndex = 0
    this.levelData = JSON.parse(this.game.cache.getText('level' + this.currentLevel))
    this.endOfLevelTimer = this.game.time.events.add(this.levelData.duration * 1000, function functionName () {
      console.log('level ended')
      if (this.currentLevel < this.numLevels) {
        this.currentLevel++
      } else {
        this.currentLevel = 1
      }
      this.game.state.start('Game', true, false, this.currentLevel)
    }, this)
    this.initEnemies()
  }

  createScoreLabel () {
    this.scoreLabel = new ScoreCounter(this.game, 100, 100)
    this.add.existing(this.scoreLabel)
  }

  createHealthLabel () {
    this.healthPlayer = new HealthPlayer(
      this.game,
      this.game.width - (this.game.width / 12),
      this.game.height - (this.game.height / 12),
      this.player)
    this.add.existing(this.healthPlayer)
  }
}
