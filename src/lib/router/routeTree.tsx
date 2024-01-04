import App from '@/App'
import AuthScreen from '@/features/auth/components/AuthScreen'
import Layout from '@/layouts/Layout'
import EmployeesPage from '@/pages/Employees'
import HomePage from '@/pages/Home'
import { LogInPage } from '@/pages/auth/LogIn'
import SignUpPage from '@/pages/auth/SignUp'
import { AccessTokenData } from '@/types/AccessTokenData'
import { accessToken } from '@/utils/accessToken'
import { isAuthenticated } from '@/utils/isAuthenticated'
import setContextUser from '@/utils/setContextUser'
import { Route, redirect, rootRouteWithContext } from '@tanstack/react-router'

interface RouteContext {
  user?: AccessTokenData
}

const rootRoute = rootRouteWithContext<RouteContext>()({
  beforeLoad: async ({ location, context }) => {
    const contextUser: AccessTokenData = context.user

    if (!contextUser) {
      if (!accessToken.value()) {
        const { href } = location
        if (href !== '/auth/log-in' && href !== '/auth/sign-up') {
          const isAuth = await isAuthenticated()
          if (!isAuth) {
            throw redirect({
              to: '/auth/log-in',
            })
          } else {
            setContextUser(context)
          }
        }
      } else {
        setContextUser(context)
      }
    }
  },
  component: App,
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

const layout = new Route({
  getParentRoute: () => rootRoute,
  component: Layout,
  id: 'layout',
})

const homeRoute = new Route({
  getParentRoute: () => layout,
  component: HomePage,
  path: '/',
})

const employeesRoute = new Route({
  getParentRoute: () => layout,
  component: EmployeesPage,
  path: '/employees',
})

export const routeTree = rootRoute.addChildren([
  layout.addChildren([homeRoute, employeesRoute]),
  authRoute.addChildren([logInRoute, signUpRoute]),
])
