export const paymentOptions = {
  PRIVATE_FUNDS: 'Личные средства',
  CURRENT_ACCOUNT: 'Расчетный счет',
  CASH_REGISTER: 'Касса',
}

export const paymentTerms = {
  ON_DELIVERY: 'При приходе',
  IN_ADVANCE: 'На перед',
  ON_REALIZATION: 'На реализацию',
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
    paymentTerm: keyof typeof paymentTerms
    accountsPayable: string
  } | null
}
