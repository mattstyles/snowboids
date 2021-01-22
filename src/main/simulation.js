
import React, { useRef, useEffect } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import fit from 'canvas-fit'

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
  const container = new Container()
  app.stage.addChild(container)
  container.position.set(0, 0)

  const arc = new Graphics()
  arc.beginFill(0xF02044)
  arc.arc(200 + (200 * Math.random()), 200 + (200 * Math.random()), 60, 0, 2 * Math.PI)
  arc.endFill()

  container.addChild(arc)
}

// effects
const startSimulation = ({
  ref
}) => {
  return () => {
    const canvas = ref.current

    const application = mountApplication({
      canvas
    })
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
    ref
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
