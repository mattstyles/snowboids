
import styled from 'styled-components'
import { Box } from '@raid/kit'

export const Absolute = styled(Box)(
  {
    position: 'absolute'
  }
)
Absolute.defaultProps = {
  top: 0,
  left: 0
}
