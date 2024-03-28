export type Order = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  shiftId: string | null
  customerId: string | null
  orderInvoiceId: string | null
  customBulkDiscount: string | null
  itemDiscountTotal: string | null
  customer: {
    id: string
    firstName: string
    lastName: string
  } | null
  invoice: {
    paymentMethod: 'CASH' | 'CARD' | 'MIXED'
    totalCashAmount: string | null
    totalCardAmount: string | null
  } | null
  shift: {
    cashier: {
      id: string
      fullName: string
    } | null
    pointOfSale: {
      id: string
      name: string
    } | null
  } | null
}

export type FullOrder = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  shiftId: string | null
  customerId: string | null
  orderInvoiceId: string | null
  customBulkDiscount: string | null
  customer: {
    id: string
    firstName: string
    lastName: string
    phoneNumber: string
  } | null
  invoice: {
    totalCashAmount: string
    totalCardAmount: string
    paymentMethod: 'CASH' | 'CARD' | 'MIXED'
  } | null
  shift: {
    cashier: {
      id: string
      fullName: string
    } | null
    pointOfSale: {
      id: string
      name: string
    } | null
  } | null
  items: {
    vtw: {
      variant: {
        size: string
        product: {
          title: string
        } | null
      } | null
    } | null
    id: string
    quantity: number
    pricePerItemWithDiscount: string
    customDiscount: string | null
  }[]
}
