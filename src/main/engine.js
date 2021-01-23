
// import { sim } from './state'

export class Engine {
  static of (options) {
    return new Engine(options)
  }

  constructor (options) {
    this.agents = options.agents

    this.update = this.update.bind(this)
    this.render = this.render.bind(this)
  }

  update (d) {
    // console.log(d)

    this.agents.each(agent => {
      agent.update()
    })
  }

  render () {
    this.agents.each(agent => {
      agent.render()
    })
  }
}
