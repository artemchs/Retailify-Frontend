import App from '@/App'
import { isAuthenticated } from '@/utils/isAuthenticated'
import { RootRoute, redirect } from '@tanstack/react-router'

const rootRoute = new RootRoute({
  component: App,
  beforeLoad: async () => {
    const isAuth = await isAuthenticated()

    if (!isAuth) {
      throw redirect({
        to: '/log-in',
      })
    }
  },
})

export const routeTree = rootRoute.addChildren([])
