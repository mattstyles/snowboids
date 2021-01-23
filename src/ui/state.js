
import { useProxy } from 'valtio'
import { Card, Stack, Text, Divider } from '@raid/kit'

import { sim } from '../main/state'

export const SimulationState = () => {
  const simView = useProxy(sim)

  return (
    <Card>
      <Stack>
        <Text fontWeight='600' color='text.700'>Simulation State</Text>
        <Divider />
        <Text>{`World size: [${simView.worldSize[2]}:${simView.worldSize[3]}]`}</Text>
        <Text>NumBoids: {simView.numBoids}</Text>
      </Stack>
    </Card>
  )
}
