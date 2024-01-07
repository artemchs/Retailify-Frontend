export type AccessTokenData = {
  sub: string
  role: 'ADMIN' | 'CASHIER' | 'ECOMMERCE_MANAGER'
  iat: string
  exp: string
}
