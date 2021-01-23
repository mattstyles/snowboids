
import { sim } from './state'

export const update = () => {
  sim.boids.each(boid => {
    boid.update()
  })
}
