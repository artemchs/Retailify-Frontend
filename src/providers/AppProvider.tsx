import { Suspense, lazy } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from './theme-provider'
import { QueryProvider } from './query-client-provider'
import { Toaster } from '@/components/ui/sonner'

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : lazy(() =>
      // Lazy load in development
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      }))
    )

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme='system' storageKey='retailify-ui-theme'>
      <QueryProvider>
        {children}
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
        <ReactQueryDevtools />
        <Toaster />
      </QueryProvider>
    </ThemeProvider>
  )
}
