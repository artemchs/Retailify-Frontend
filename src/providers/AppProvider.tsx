import React from 'react'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from './theme-provider'
import { QueryProvider } from './query-client-provider'
import { Toaster } from '@/components/ui/sonner'
import AuthProvider from './AuthProvider'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme='system' storageKey='retailify-ui-theme'>
      <QueryProvider>
        <AuthProvider>
          {children}
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
          <Toaster />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
