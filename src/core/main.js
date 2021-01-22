
import { proxy } from 'valtio'

export const appState = proxy({
  stage: 'main',
  count: 0
})
