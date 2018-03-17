import Phaser from 'phaser'
import PlayerBullet from './PlayerBullet'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset, playerBullets) {
    super(game, x, y, asset)
    this.game = game
    this.playerBullets = playerBullets
    this.scale.setTo(0.6)
    this.anchor.setTo(0.5)
    this.game.physics.arcade.enable(this)
    this.body.collideWorldBounds = true
    this.customParams = {shield: false}
    this.health = 3
    this.PLAYER_SPEED = 200
    this.BULLET_SPEED = -1000
    
    this.playerTimer = this.game.time.create(false)
    this.playerTimer.start()

    this.scheduleShooting()
    this.createSound()

    this.game.add.existing(this)
  }

  update () {
    this.body.velocity.x = 0
    if (this.game.input.activePointer.isDown) {
      let targetX = this.game.input.activePointer.position.x
      let direction = targetX >= this.game.world.centerX ? 1 : -1
      this.body.velocity.x = direction * this.PLAYER_SPEED
    }
  }

  createSound () {
    this.lose = this.game.sound.add('lose')
  }

  damage (amount) {
    super.damage(amount)
    if (this.health <= 0) {
      this.kill()
      this.lose.play()
      this.playerTimer.pause()
    }
  }

  scheduleShooting () {
    this.shoot()
    this.playerTimer.add(Phaser.Timer.SECOND / 5, this.scheduleShooting, this)
  }

  shoot () {
    let bullet = this.playerBullets.getFirstExists(false)
    if (!bullet) {
      bullet = new PlayerBullet({
        game: this.game,
        x: this.x,
        y: this.top,
        asset: 'bullet'
      })
      this.playerBullets.add(bullet)
    } else {
      bullet.reset(this.x, this.top)
    }
    bullet.body.velocity.y = this.BULLET_SPEED
  }
}
