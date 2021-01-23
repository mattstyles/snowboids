
import { render } from 'react-dom'
import { Screen } from '@raid/kit'
import { useProxy } from 'valtio'

import { App } from './ui/app'
import { Simulation } from './main/simulation'
import { Gui } from './ui/gui'
import { appState } from './core/main'

const el = document.getElementById('root')

const Boids = () => {
  const view = useProxy(appState)

  return (
    <App>
      <Screen>
        <Gui />
        <Simulation stage={view.stage} />
      </Screen>
    </App>
  )
}

render(
  <Boids />,
  el
)
