
import { ThemeProvider } from 'styled-components'
import { theme } from '@raid-ui/theme'
import { Reset } from '@raid/kit'

export const App = ({
  children
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Reset />
      {children}
    </ThemeProvider>
  )
}
