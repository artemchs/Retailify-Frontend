import App from '@/App'
import { RootRoute } from '@tanstack/react-router'

const rootRoute = new RootRoute({
  component: App,
})

export const routeTree = rootRoute.addChildren([])
