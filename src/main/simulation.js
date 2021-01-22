
import React, { useRef, useEffect } from 'react'
import { Application, Sprite } from 'pixi.js'
import { SpritePool } from 'pixi-spritepool'
// import { Camera } from 'pixi-holga'
import fit from 'canvas-fit'
import { ref } from 'valtio'

import { texture } from './texture'
import { Boid } from './boid'
import { sim } from './state'

const mountApplication = ({ canvas }) => {
  const resolution = window.devicePixelRatio || 1
  const resize = fit(canvas)
  const app = new Application({
    width: canvas.width,
    height: canvas.height,
    backgroundColor: 0x333333,
    resolution: resolution,
    view: canvas
  })

  const onWindowResize = () => {
    resize()
    app.renderer.resize(canvas.width, canvas.height)
  }

  window.addEventListener('resize', onWindowResize, false)

  const dispose = () => {
    window.removeEventListener('resize', onWindowResize, false)
  }

  return {
    app,
    dispose
  }
}

const initSimulation = ({
  app
}) => {
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
      return boid
    }
  })

  sim.pool = ref(pool)
  sim.boids = ref(boids)
  sim.numBoids = sim.boids.length

  app.ticker.add(render)
}

const render = () => {
  sim.boids.each(boid => {
    boid.update()
  })
}

// effects
const startSimulation = ({
  canvas
}) => {
  return () => {
    const application = mountApplication({
      canvas: canvas.current
    })

    sim.app = ref(application.app)
    sim.stage = ref(application.app.stage)

    initSimulation({
      app: application.app
    })

    // dispose
    return () => {
      application.dispose()
    }
  }
}

const useSimulation = ({ ref, dependencies }) => {
  useEffect(startSimulation({
    canvas: ref
  }), dependencies)
}

export const Simulation = ({
  stage
}) => {
  const canvas = useRef(null)
  useSimulation({
    ref: canvas,
    dependencies: [
      stage
    ]
  })

  return (
    <canvas
      ref={canvas}
    />
  )
}
