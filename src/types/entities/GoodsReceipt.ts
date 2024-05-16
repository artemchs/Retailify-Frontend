export const paymentOptions = {
  PRIVATE_FUNDS: 'Личные средства',
  CURRENT_ACCOUNT: 'Расчетный счет',
  CASH_REGISTER: 'Касса',
}

export type GoodsReceipt = {
  id: string
  createdAt: Date
  updatedAt: Date
  supplierId: string | null
  warehouseId: string | null
  supplier: {
    id: string
    name: string
  } | null
  warehouse: {
    id: string
    name: string
  } | null
  name: string
  goodsReceiptDate: Date
  supplierInvoice: {
    paymentOption: keyof typeof paymentOptions
    accountsPayable: string
    oustandingBalance: string
    amountPaid: string
  } | null
  productVariants:
    | {
        variant: {
          id: string
          size: string
          price: string
          product: {
            id: string
            title: string
            sku: string
            media: {
              id: string
            }[] | null
          } | null
        } | null
        receivedQuantity: number
        supplierPrice: string
      }[]
    | null
  isArchived: boolean
}
