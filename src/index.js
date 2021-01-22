
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from '@raid-ui/theme'
import { Box } from '@raid/kit'

var el = document.createElement('div')
document.body.appendChild(el)

console.log('doing some stuff')

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box p={4} sx={{ border: '1px solid rgba(0,0,0,0.2)' }}>Hello world</Box>
    </ThemeProvider>
  )
}

render(
  <App />,
  el
)
