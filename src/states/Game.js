/* globals __DEV__ */
import Phaser from 'phaser'
import PlayerBullet from '../prefabs/PlayerBullet'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.PLAYER_SPEED = 200
    this.BULLET_SPEED = -1000
  }
  preload () {}

  create () {
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space')
    this.background.autoScroll(0, 30)

    this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 50, 'player')
    this.player.scale.setTo(0.6)
    this.player.anchor.setTo(0.5)
    this.game.physics.arcade.enable(this.player)
    this.player.body.collideWorldBounds = true

    this.initBullets()
    this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND / 5, this.createPlayerBullet, this)


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
    this.player.body.velocity.x = 0

    if (this.game.input.activePointer.isDown) {
      let targetX = this.game.input.activePointer.position.x
      let direction = targetX >= this.game.world.centerX ? 1 : -1
      this.player.body.velocity.x = direction * this.PLAYER_SPEED
    }
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.mushroom, 32, 32)
    // }
  }

  initBullets () {
    this.playerBullets = this.add.group()
    this.playerBullets.enableBody = true
  }

  createPlayerBullet () {
    let bullet = this.playerBullets.getFirstExists(false)
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
}
