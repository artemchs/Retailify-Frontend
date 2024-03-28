export type Refund = {
  order: {
    invoice: {
      paymentMethod: 'CARD' | 'CASH' | 'MIXED'
    } | null
    customer: {
      id: string
      firstName: string
      lastName: string
    } | null
  } | null
  shift: {
    select: {
      cashier: {
        select: {
          id: true
          fullName: true
        }
      }
      pointOfSale: {
        select: {
          id: true
          name: true
        }
      }
    }
  }
} & {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  shiftId: string | null
  orderId: string | null
  amount: string
}
