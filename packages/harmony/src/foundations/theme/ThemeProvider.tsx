import type { ReactNode } from 'react'

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'

import { themes } from './theme'
import type { Theme } from './types'

type ThemeProviderProps = {
  theme: Theme
  children: ReactNode
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, theme } = props

  return (
    <EmotionThemeProvider theme={themes[theme]}>
      {children}
    </EmotionThemeProvider>
  )
}
