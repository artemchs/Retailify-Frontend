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
