import App from '@/App'
import { LogInPage } from '@/pages/auth/LogIn'
import { isAuthenticated } from '@/utils/isAuthenticated'
import { RootRoute, Route, redirect } from '@tanstack/react-router'

const rootRoute = new RootRoute({
  component: App,
  beforeLoad: async ({ location }) => {
    const { href } = location
    if (href !== '/log-in') {
      const isAuth = await isAuthenticated()
      if (!isAuth) {
        throw redirect({
          to: '/log-in',
        })
      }
    }
  },
})

const logInRoute = new Route({
  getParentRoute: () => rootRoute,
  component: LogInPage,
  path: '/log-in',
})

export const routeTree = rootRoute.addChildren([logInRoute])
