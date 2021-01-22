
import { render } from 'react-dom'
import { Card, Screen, Button, Stack, Text } from '@raid/kit'
import { useProxy } from 'valtio'

import { App } from './ui/app'
import { Absolute } from './ui/absolute'
import { Simulation } from './main/simulation'
import { appState } from './core/main'
import { sim } from './main/state'

const el = document.getElementById('root')

const Gui = () => {
  const view = useProxy(appState)
  const simView = useProxy(sim)

  const add = () => {
    appState.count = appState.count + 1
  }

  return (
    <Absolute m={2} zIndex={1} right={0} left='auto'>
      <Card>
        <Stack>
          <Text>Stage: {view.stage}</Text>
          <Text>NumBoids: {simView.numBoids}</Text>
          <Text>Count: {view.count}</Text>
          <Button onClick={add}>Add</Button>
        </Stack>
      </Card>
    </Absolute>
  )
}

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
