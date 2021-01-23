
import { Vector2, toRadians } from 'mathutil'

import { frames } from './texture'

export class Boid {
  constructor (sprite) {
    this.sprite = sprite
    this.sprite.scale.set(0.5, 0.5)
    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5
    this.sprite.texture = frames[16]

    this.dir = Vector2.of(0, -1)
    this.position = Vector2.of(0, 0)
    this.speed = 0.15 + (Math.random() * 0.75)

    this.setRotation(Math.random() * 360)
  }

  static of (options) {
    return new Boid(options)
  }

  update () {
    // this._jiggle()

    // Move forwards
    this.position.add(
      Vector2.multiply(this.dir, this.speed)
    )

    // Rotate randomly
    if (Math.random() > 0.8) {
      this.dir.rotate(toRadians(10))
    }

    if (Math.random() > 0.94) {
      this.dir.rotate(toRadians(-10))
    }
  }

  render () {
    this.sprite.position.set(
      ...this.position.position()
    )
    this.sprite.rotation = this.dir.angle()
  }

  setPosition (x, y) {
    this.position = Vector2.of(x, y)
  }

  setRotation (degrees) {
    this.dir.rotate(toRadians(degrees))
  }

  _jiggle () {
    const dx = Math.random() * 2 - 1
    const dy = Math.random() * 2 - 1

    this.position.add([dx, dy])
  }
}
