export type CashierShift = {
  id: string
  createdAt: Date
  closedAt: Date | null
  updatedAt: Date
  name: string
  cashierId: string | null
  pointOfSaleId: string | null
  startingCashBalance: string
  isOpened: boolean
}

export type FullCashierShift = {
  pointOfSale: {
    name: string
  } | null
} & {
  id: string
  createdAt: Date
  closedAt: Date | null
  updatedAt: Date
  name: string
}
