/* globals __DEV__ */
import Phaser from 'phaser'
import PlayerBullet from '../prefabs/PlayerBullet'
import Enemy from '../prefabs/Enemy'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init (currentLevel) {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.physics.startSystem(Phaser.Physics.P2JS)

    this.PLAYER_SPEED = 200
    this.BULLET_SPEED = -1000

    this.numLevels = 3
    this.currentLevel = currentLevel || 1
    console.log('current level - ' + this.currentLevel)
  }
  preload () {}

  create () {
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space')
    this.background.autoScroll(0, 30)

    this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 50, 'player')
    this.game.physics.p2.enable(this.player, true)
    this.player.scale.setTo(0.6)
    this.player.anchor.setTo(0.5)
    this.player.body.static = true
    this.player.body.clearShapes()
    this.player.body.loadPolygon('physicsData', 'player', 0.6)
    this.player.body.collideWorldBounds = true

    this.initBullets()
    this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND / 5, this.createPlayerBullet, this)
    this.initEnemies()

    this.loadLevel()
    this.zap = this.add.audio('zap')
    this.lose = this.add.audio('lose')
    this.music = this.add.audio('music')
    this.music.volume = this.zap.volume = 0.1
    if (!this.music.isPlaying) {
      this.music.play()
    }

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
    // this.game.physics.arcade.overlap(this.playerBullets, this.enemies, this.damageEnemy, null, this)
    // this.game.physics.arcade.overlap(this.enemyBullets, this.player, this.killPlayer, null, this)
    // this.game.physics.arcade.overlap(this.enemies, this.player, this.killPlayer, null, this)

    this.player.body.velocity.x = 0

    if (this.game.input.activePointer.isDown) {
      let targetX = this.game.input.activePointer.position.x
      let direction = targetX >= this.game.world.centerX ? 1 : -1
      this.player.body.velocity.x = direction * this.PLAYER_SPEED
    }
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.player, 32, 32)
    // }
  }

  initBullets () {
    this.playerBullets = this.add.group()
    this.playerBullets.enableBody = true
  }

  createPlayerBullet () {
    // let bullet = this.playerBullets.getFirstExists(false)
    let bullet = this.playerBullets.getFirstDead()
    if (!bullet) {
      bullet = new PlayerBullet({
        game: this.game,
        x: this.player.x,
        y: this.player.top,
        asset: 'bullet'
      })
      this.playerBullets.add(bullet)
    } else {
      bullet.reset(this.player.x, this.player.top)
    }
    bullet.body.velocity.y = this.BULLET_SPEED
  }

  initEnemies () {
    this.enemies = this.add.group()
    this.enemies.enableBody = true

    this.enemyBullets = this.add.group()
    this.enemyBullets.enableBody = true
  }

  damageEnemy (bullet, enemy) {
    this.zap.play()
    enemy.damage(1)
    bullet.kill()
  }

  killPlayer () {
    this.player.kill()
    this.lose.play()
    this.game.state.start('Game')
  }

  createEnemy (_x, y, health, key, scale, speedX, speedY) {
    let enemy = this.enemies.getFirstExists(false)
    let x = this.getRandom(0, this.game.world.width)
    if (!enemy) {
      enemy = new Enemy({
        game: this.game,
        x: x,
        y: y,
        scale: scale,
        asset: key,
        health: health,
        enemyBullets: this.enemyBullets
      })
      this.enemies.add(enemy)
    }
    enemy.reset(x, y, health, key, scale, speedX, speedY)
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
    this.scheduleNextEnemy()
  }

  scheduleNextEnemy () {
    let nextEnemy = this.levelData.enemies[this.currentEnemyIndex]
    if (nextEnemy) {
      let nextTime = 1000 * (nextEnemy.time - (this.currentEnemyIndex === 0 ? 0 : this.levelData.enemies[this.currentEnemyIndex - 1].time))
      this.nextEnemyTime = this.game.time.events.add(nextTime, function () {
        this.createEnemy(
          nextEnemy.x * this.game.world.width,
          -150,
          nextEnemy.health,
          nextEnemy.key,
          nextEnemy.scale,
          nextEnemy.speedX,
          nextEnemy.speedY)
        this.currentEnemyIndex++
        this.scheduleNextEnemy()
      }, this)
    }
  }

  getRandom (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
