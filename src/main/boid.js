
export class Boid {
  constructor (sprite) {
    this.sprite = sprite
    this.sprite.scale.set(0.1, 0.1)
  }

  static of (options) {
    return new Boid(options)
  }

  update () {
    const dx = Math.random() * 2 - 1
    const dy = Math.random() * 2 - 1

    this.sprite.position.set(
      this.sprite.position.x + dx,
      this.sprite.position.y + dy
    )
  }
}
