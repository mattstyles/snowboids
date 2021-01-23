
import { SpritePool } from 'pixi-spritepool'
import { Sprite } from 'pixi.js'
import { ref } from 'valtio'

import { Engine } from './engine'
import { Boid } from './boid'
import { frames } from './texture'
import { sim } from './state'

const numBoids = 20

export const init = () => {
  const app = sim.app

  const onCreateSprite = () => {
    const sprite = new Sprite(frames[0])
    return sprite
  }

  const onCreateBoid = (_, index) => {
    const sprite = pool.get(index)
    const boid = new Boid(sprite)
    boid.sprite.visible = true
    boid.setPosition(
      Math.random() * sim.worldSize[2],
      Math.random() * sim.worldSize[3]
    )
    return boid
  }

  const pool = SpritePool.of({
    length: numBoids,
    container: app.stage,
    onCreateItem: onCreateSprite
  })

  const boids = SpritePool.of({
    length: numBoids,
    onCreateItem: onCreateBoid
  })

  const engine = Engine.of({
    agents: boids
  })

  sim.pool = ref(pool)
  sim.boids = ref(boids)
  sim.engine = ref(engine)
  sim.numBoids = sim.boids.length
}
