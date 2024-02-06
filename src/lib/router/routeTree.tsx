import App from '@/App'
import AuthScreen from '@/features/auth/components/AuthScreen'
import { findAllCategorySchema } from '@/features/categories/types/findAll-category-schema'
import { findAllCategoryGroupsSchema } from '@/features/category-groups/types/findAll-category-groups-schema'
import { employeesSearchParamsSchema } from '@/features/employees/types/searchParams'
import { goodsReceiptsSearchParamsSchema } from '@/features/goods-receipts/types/searchParams'
import { productsSearchParamsSchema } from '@/features/products/types/searchParams'
import { suppliersSearchParamsSchema } from '@/features/suppliers/types/searchParams'
import { warehousesSearchParamsSchema } from '@/features/warehouses/types/searchParams'
import Layout from '@/layouts/Layout'
import EmployeesPage from '@/pages/Employees'
import GoodsReceiptsPage from '@/pages/GoodsReceipts'
import HomePage from '@/pages/Home'
import SuppliersPage from '@/pages/Suppliers'
import WarehousesPage from '@/pages/Warehouses'
import { LogInPage } from '@/pages/auth/LogIn'
import SignUpPage from '@/pages/auth/SignUp'
import CategoriesPage from '@/pages/categories/Categories'
import CategoryGroupsPage from '@/pages/categories/CategoryGroups'
import CreateProductPage from '@/pages/products/CreateProduct'
import ProductsPage from '@/pages/products/Products'
import { AccessTokenData } from '@/types/AccessTokenData'
import { accessToken } from '@/utils/accessToken'
import { isAuthenticated } from '@/utils/isAuthenticated'
import setContextUser from '@/utils/setContextUser'
import { Route, redirect, rootRouteWithContext } from '@tanstack/react-router'

interface RouteContext {
  user?: AccessTokenData
}

function beforeLoadRole(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any,
  requiredRole: 'ADMIN' | 'CASHIER' | 'ECOMMERCE_MANAGER'
) {
  const contextUser: AccessTokenData = context.user

  if (contextUser.role !== requiredRole) {
    throw redirect({
      to: '/',
    })
  }
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

export const employeesRoute = new Route({
  getParentRoute: () => layout,
  component: EmployeesPage,
  path: '/employees',
  validateSearch: (search) => employeesSearchParamsSchema.parse(search),
  beforeLoad: ({ context }) => beforeLoadRole(context, 'ADMIN'),
})

export const suppliersRoute = new Route({
  getParentRoute: () => layout,
  component: SuppliersPage,
  path: '/suppliers',
  validateSearch: (search) => suppliersSearchParamsSchema.parse(search),
})

export const warehousesRoute = new Route({
  getParentRoute: () => layout,
  component: WarehousesPage,
  path: '/warehouses',
  validateSearch: (search) => warehousesSearchParamsSchema.parse(search),
  beforeLoad: ({ context }) => beforeLoadRole(context, 'ADMIN'),
})

export const goodsReceiptsRoute = new Route({
  getParentRoute: () => layout,
  component: GoodsReceiptsPage,
  path: '/goods-receipts',
  validateSearch: (search) => goodsReceiptsSearchParamsSchema.parse(search),
  beforeLoad: ({ context }) => beforeLoadRole(context, 'ADMIN'),
})

export const categoryGroupsRoute = new Route({
  getParentRoute: () => layout,
  component: CategoryGroupsPage,
  path: '/category-groups',
  validateSearch: (search) => findAllCategoryGroupsSchema.parse(search),
  beforeLoad: ({ context }) => beforeLoadRole(context, 'ADMIN'),
})

export const categoriesRoute = new Route({
  getParentRoute: () => layout,
  component: CategoriesPage,
  path: '/categories',
  validateSearch: (search) => findAllCategorySchema.parse(search),
  beforeLoad: ({ context }) => beforeLoadRole(context, 'ADMIN'),
})

export const productsRoute = new Route({
  getParentRoute: () => layout,
  component: ProductsPage,
  path: '/products',
  validateSearch: (search) => productsSearchParamsSchema.parse(search),
  beforeLoad: ({ context }) => beforeLoadRole(context, 'ADMIN'),
})

export const createProductRoute = new Route({
  getParentRoute: () => layout,
  component: CreateProductPage,
  path: '/products/create',
  beforeLoad: ({ context }) => beforeLoadRole(context, 'ADMIN'),
})

export const routeTree = rootRoute.addChildren([
  layout.addChildren([
    homeRoute,
    employeesRoute,
    suppliersRoute,
    warehousesRoute,
    goodsReceiptsRoute,
    productsRoute,
    createProductRoute,
    categoryGroupsRoute,
    categoriesRoute,
  ]),
  authRoute.addChildren([logInRoute, signUpRoute]),
])
