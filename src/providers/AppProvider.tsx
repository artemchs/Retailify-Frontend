import React from 'react'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { ThemeProvider } from './theme'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme='system' storageKey='retailify-ui-theme'>
      {children}
      <TanStackRouterDevtools />
    </ThemeProvider>
  )
}
