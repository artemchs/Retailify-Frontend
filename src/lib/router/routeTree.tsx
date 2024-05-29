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
import GoodsReceiptsPage from '@/pages/goods-receipts/GoodsReceipts'
import HomePage from '@/pages/Home'
import SuppliersPage from '@/pages/Suppliers'
import WarehousesPage from '@/pages/Warehouses'
import { LogInPage } from '@/pages/auth/LogIn'
import SignUpPage from '@/pages/auth/SignUp'
import CategoriesPage from '@/pages/categories/Categories'
import CategoryGroupsPage from '@/pages/categories/CategoryGroups'
import CreateProductPage from '@/pages/products/CreateProduct'
import EditProductPage from '@/pages/products/EditProduct'
import ProductsPage from '@/pages/products/Products'
import { AccessTokenData } from '@/types/AccessTokenData'
import { accessToken } from '@/utils/accessToken'
import { isAuthenticated } from '@/utils/isAuthenticated'
import setContextUser from '@/utils/setContextUser'
import {
    createRootRouteWithContext,
    createRoute,
    redirect,
} from '@tanstack/react-router'
import CreateGoodsReceiptPage from '@/pages/goods-receipts/CreateGoodsReceipt'
import EditGoodsReceiptPage from '@/pages/goods-receipts/EditGoodsReceipt'
import InventoryAdjustmentsPage from '@/pages/InventoryAdjustments'
import { inventoryAdjustmentsSearchParamsSchema } from '@/features/inventory-adjustments/types/inventory-adjustment-search-params'
import InventoryTransfersPage from '@/pages/InventoryTransfers'
import { inventoryTransfersSearchParamsSchema } from '@/features/inventory-transfers/types/inventory-transfer-search-params'
import { posSearchParamsSchema } from '@/features/points-of-sale/types/point-of-sale-search-params'
import PointsOfSaleListPage from '@/pages/points-of-sale/PointsOfSaleList'
import { cashierShiftSearchParamsSchema } from '@/features/points-of-sale/cashier-shifts/types/cashier-shift-search-params'
import PointOfSaleShiftsPage from '@/pages/points-of-sale/PointOfSaleShifts'
import CashRegisterPage from '@/pages/CashRegister'
import { cashRegisterSearchParams } from '@/features/cash-register/types/cash-register-search-params'
import CustomersPage from '@/pages/Customers'
import { findAllCustomerSchema } from '@/features/customers/types/find-all-customer-schema'
import ProductVariantsPage from '@/pages/ProductVariants'
import { variantsSearchParamsSchema } from '@/features/products/variants/types/findAll-variants-search-params'
import { Settings } from '@/pages/Settings'
import FinancialTransactionsPage from '@/pages/FinancialTransactions'
import { financialTransactionsSearchParams } from '@/features/financial-transactions/types/financial-transactions-search-params'
import OrdersPage from '@/pages/Orders'
import { findAllCashRegisterOrderSeachParamsSchema } from '@/features/cash-register/types/findAll-cash-register-order-search-params-schema'
import RefundsPage from '@/pages/Refunds'
import { findAllRefundSchema } from '@/features/refunds/types/findAll-refund-schema'

interface RouteContext {
    user?: AccessTokenData
}

function beforeLoadRole(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any,
    requiredRole: ('ADMIN' | 'CASHIER' | 'ECOMMERCE_MANAGER')[]
) {
    const contextUser: AccessTokenData = context.user

    if (!requiredRole.includes(contextUser.role)) {
        throw redirect({
            to: '/',
        })
    }

    setContextUser(context)
}

const rootRoute = createRootRouteWithContext<RouteContext>()({
    beforeLoad: async ({ location, context }) => {
        const contextUser: AccessTokenData | undefined = context.user

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

const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    component: AuthScreen,
    path: '/auth',
})

const logInRoute = createRoute({
    getParentRoute: () => authRoute,
    component: LogInPage,
    path: '/log-in',
})

const signUpRoute = createRoute({
    getParentRoute: () => authRoute,
    component: SignUpPage,
    path: '/sign-up',
})

const layout = createRoute({
    getParentRoute: () => rootRoute,
    component: Layout,
    id: 'layout',
})

const homeRoute = createRoute({
    getParentRoute: () => layout,
    component: HomePage,
    path: '/',
})

export const employeesRoute = createRoute({
    getParentRoute: () => layout,
    component: EmployeesPage,
    path: '/employees',
    validateSearch: (search) => employeesSearchParamsSchema.parse(search),
    beforeLoad: ({ context }) => beforeLoadRole(context, ['ADMIN']),
})

export const suppliersRoute = createRoute({
    getParentRoute: () => layout,
    component: SuppliersPage,
    path: '/suppliers',
    validateSearch: (search) => suppliersSearchParamsSchema.parse(search),
})

export const warehousesRoute = createRoute({
    getParentRoute: () => layout,
    component: WarehousesPage,
    path: '/warehouses',
    validateSearch: (search) => warehousesSearchParamsSchema.parse(search),
    beforeLoad: ({ context }) => beforeLoadRole(context, ['ADMIN']),
})

export const categoryGroupsRoute = createRoute({
    getParentRoute: () => layout,
    component: CategoryGroupsPage,
    path: '/category-groups',
    validateSearch: (search) => findAllCategoryGroupsSchema.parse(search),
    beforeLoad: ({ context }) => beforeLoadRole(context, ['ADMIN']),
})

export const categoriesRoute = createRoute({
    getParentRoute: () => layout,
    component: CategoriesPage,
    path: '/categories',
    validateSearch: (search) => findAllCategorySchema.parse(search),
    beforeLoad: ({ context }) => beforeLoadRole(context, ['ADMIN']),
})

export const productsRoute = createRoute({
    getParentRoute: () => layout,
    component: ProductsPage,
    path: '/products',
    validateSearch: (search) => productsSearchParamsSchema.parse(search),
    beforeLoad: ({ context }) => beforeLoadRole(context, ['ADMIN']),
})

export const createProductRoute = createRoute({
    getParentRoute: () => layout,
    component: CreateProductPage,
    path: '/products/create',
    beforeLoad: ({ context }) => beforeLoadRole(context, ['ADMIN']),
})

export const editProductRoute = createRoute({
    getParentRoute: () => layout,
    component: EditProductPage,
    path: '/products/$productId/edit',
    beforeLoad: ({ context }) => beforeLoadRole(context, ['ADMIN']),
})

export const inventoryAdjustmentsRoute = createRoute({
    getParentRoute: () => layout,
    component: InventoryAdjustmentsPage,
    path: '/inventory-adjustments',
    validateSearch: (search) =>
        inventoryAdjustmentsSearchParamsSchema.parse(search),
    beforeLoad: ({ context }) => beforeLoadRole(context, ['ADMIN']),
})

export const goodsReceiptsRoute = createRoute({
    getParentRoute: () => layout,
    component: GoodsReceiptsPage,
    path: '/goods-receipts',
    validateSearch: (search) => goodsReceiptsSearchParamsSchema.parse(search),
    beforeLoad: ({ context }) => beforeLoadRole(context, ['ADMIN']),
})

export const createGoodsReceiptRoute = createRoute({
    getParentRoute: () => layout,
    component: CreateGoodsReceiptPage,
    path: '/goods-receipts/create',
})

export const editGoodsReceiptRoute = createRoute({
    getParentRoute: () => layout,
    component: EditGoodsReceiptPage,
    path: '/goods-receipts/$goodsReceiptId/edit',
    beforeLoad: ({ context }) => beforeLoadRole(context, ['ADMIN']),
})

export const inventoryTransfersRoute = createRoute({
    getParentRoute: () => layout,
    component: InventoryTransfersPage,
    path: '/inventory-transfers',
    validateSearch: (search) =>
        inventoryTransfersSearchParamsSchema.parse(search),
    beforeLoad: ({ context }) => beforeLoadRole(context, ['ADMIN']),
})

export const pointsOfSaleRoute = createRoute({
    getParentRoute: () => layout,
    component: PointsOfSaleListPage,
    path: '/points-of-sale',
    validateSearch: (search) => posSearchParamsSchema.parse(search),
})

export const pointOfSaleRoute = createRoute({
    getParentRoute: () => layout,
    component: PointOfSaleShiftsPage,
    path: '/points-of-sale/$pointOfSaleId/shifts',
    validateSearch: (search) => cashierShiftSearchParamsSchema.parse(search),
    beforeLoad: ({ context }) => beforeLoadRole(context, ['ADMIN']),
})

export const cashRegisterRoute = createRoute({
    getParentRoute: () => rootRoute,
    component: CashRegisterPage,
    path: '/cash-register',
    validateSearch: (search) => cashRegisterSearchParams.parse(search),
    beforeLoad: ({ context }) => beforeLoadRole(context, ['ADMIN', 'CASHIER']),
})

export const customerRoute = createRoute({
    getParentRoute: () => layout,
    component: CustomersPage,
    path: '/customers',
    validateSearch: (search) => findAllCustomerSchema.parse(search),
    beforeLoad: ({ context }) => beforeLoadRole(context, ['ADMIN']),
})

export const productVariantsRoute = createRoute({
    getParentRoute: () => layout,
    component: ProductVariantsPage,
    path: '/product-variants',
    validateSearch: (search) => variantsSearchParamsSchema.parse(search),
    beforeLoad: ({ context }) =>
        beforeLoadRole(context, ['ADMIN', 'CASHIER', 'ECOMMERCE_MANAGER']),
})

export const settingsRoute = createRoute({
    getParentRoute: () => layout,
    component: Settings,
    path: '/settings',
})

export const financialTransactionsRoute = createRoute({
    getParentRoute: () => layout,
    component: FinancialTransactionsPage,
    path: '/financial-transactions',
    validateSearch: (search) => financialTransactionsSearchParams.parse(search),
    beforeLoad: ({ context }) => beforeLoadRole(context, ['ADMIN']),
})

export const ordersRoute = createRoute({
    getParentRoute: () => layout,
    component: OrdersPage,
    path: '/orders',
    validateSearch: (search) =>
        findAllCashRegisterOrderSeachParamsSchema.parse(search),
    beforeLoad: ({ context }) => beforeLoadRole(context, ['ADMIN']),
})

export const refundsRoute = createRoute({
    getParentRoute: () => layout,
    component: RefundsPage,
    path: '/refunds',
    validateSearch: (search) => findAllRefundSchema.parse(search),
    beforeLoad: ({ context }) => beforeLoadRole(context, ['ADMIN']),
})

export const routeTree = rootRoute.addChildren([
    layout.addChildren([
        homeRoute,
        employeesRoute,
        suppliersRoute,
        warehousesRoute,
        goodsReceiptsRoute,
        createGoodsReceiptRoute,
        productsRoute,
        createProductRoute,
        categoryGroupsRoute,
        categoriesRoute,
        editProductRoute,
        editGoodsReceiptRoute,
        inventoryAdjustmentsRoute,
        inventoryTransfersRoute,
        pointsOfSaleRoute,
        pointOfSaleRoute,
        cashRegisterRoute,
        customerRoute,
        productVariantsRoute,
        settingsRoute,
        financialTransactionsRoute,
        ordersRoute,
        refundsRoute,
    ]),
    authRoute.addChildren([logInRoute, signUpRoute]),
])
