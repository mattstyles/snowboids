
import { SpritePool } from 'pixi-spritepool'
import { Sprite } from 'pixi.js'
import { ref } from 'valtio'

import { Boid } from './boid'
import { texture } from './texture'
import { sim } from './state'

export const init = () => {
  const app = sim.app

  const onCreateSprite = () => {
    const sprite = new Sprite(texture)
    sprite.anchor.x = 0.5
    sprite.anchor.y = 0.5
    sprite.scale.set(0.25, 0.25)
    return sprite
  }

  const pool = SpritePool.of({
    length: 100,
    container: app.stage,
    onCreateItem: onCreateSprite
  })

  const boids = SpritePool.of({
    length: 100,
    onCreateItem: (_, index) => {
      const sprite = pool.get(index)
      const boid = new Boid(sprite)
      boid.sprite.visible = true
      boid.sprite.position.set(
        Math.random() * sim.worldSize[2],
        Math.random() * sim.worldSize[3]
      )
      return boid
    }
  })

  sim.pool = ref(pool)
  sim.boids = ref(boids)
  sim.numBoids = sim.boids.length
}
