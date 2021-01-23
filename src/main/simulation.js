
import React, { useRef, useEffect } from 'react'
import { Application } from 'pixi.js'
// import { Camera } from 'pixi-holga'
import fit from 'canvas-fit'
import { ref } from 'valtio'

import { sim } from './state'
import { init } from './init'
import { update } from './update'

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

  sim.worldSize = [0, 0, app.renderer.screen.width, app.renderer.screen.height]

  const onWindowResize = () => {
    resize()
    app.renderer.resize(canvas.width, canvas.height)
    sim.worldSize = [0, 0, app.renderer.screen.width, app.renderer.screen.height]
  }

  window.addEventListener('resize', onWindowResize, false)

  const dispose = () => {
    window.removeEventListener('resize', onWindowResize, false)
  }

  window.app = app

  return {
    app,
    dispose
  }
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

    init({
      app: application.app
    })

    const updateTicker = application.app.ticker.add(update)

    // dispose
    return () => {
      application.dispose()
      updateTicker.destroy()
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
