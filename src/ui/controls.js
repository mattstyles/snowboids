
import { useProxy } from 'valtio'
import { Card, Stack, Text, Button } from '@raid/kit'

import { appState } from '../core/main'

export const Controls = () => {
  const view = useProxy(appState)

  const add = () => {
    appState.count = appState.count + 1
  }

  return (
    <Card>
      <Stack>
        <Text>Stage: {view.stage}</Text>
        <Text>Count: {view.count}</Text>
        <Button onClick={add}>Add</Button>
      </Stack>
    </Card>
  )
}
