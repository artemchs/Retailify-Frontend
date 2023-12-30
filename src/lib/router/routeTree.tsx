import App from '@/App'
import AuthScreen from '@/features/auth/components/AuthScreen'
import { LogInPage } from '@/pages/auth/LogIn'
import SignUpPage from '@/pages/auth/SignUp'
import { isAuthenticated } from '@/utils/isAuthenticated'
import { RootRoute, Route, redirect } from '@tanstack/react-router'

const rootRoute = new RootRoute({
  component: App,
  beforeLoad: async ({ location }) => {
    const { href } = location
    if (href !== '/auth/log-in' && href !== '/auth/sign-up') {
      const isAuth = await isAuthenticated()
      if (!isAuth) {
        throw redirect({
          to: '/auth/log-in',
        })
      }
    }
  },
})

const authRoute = new Route({
  getParentRoute: () => rootRoute,
  component: AuthScreen,
  path: '/auth',
})

const logInRoute = new Route({
  getParentRoute: () => authRoute,
  component: LogInPage,
  path: '/log-in',
})

const signUpRoute = new Route({
  getParentRoute: () => authRoute,
  component: SignUpPage,
  path: '/sign-up',
})

export const routeTree = rootRoute.addChildren([
  authRoute.addChildren([logInRoute, signUpRoute]),
])
