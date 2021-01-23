
import { proxy } from 'valtio'

export const sim = proxy({
  app: null,
  stage: null,
  pool: null,
  boids: null,
  numBoids: null,
  worldSize: [0, 0, 500, 500]
})
