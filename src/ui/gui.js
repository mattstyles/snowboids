
import { Stack } from '@raid/kit'

import { Absolute } from './absolute'

import { Controls } from './controls'
import { SimulationState } from './state'

export const Gui = () => {
  return (
    <Absolute m={2} zIndex={1} right={0} left='auto'>
      <Stack>
        <Controls />
        <SimulationState />
      </Stack>
    </Absolute>
  )
}
