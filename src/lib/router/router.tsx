import { Router, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree'

const router = new Router({ routeTree })

export function TanstackRouterProvider() {
  return <RouterProvider router={router} />
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
