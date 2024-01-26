export type SupplierInvoicePaymentOption =
  | 'PRIVATE_FUNDS'
  | 'CURRENT_ACCOUNT'
  | 'CASH_REGISTER'
export type SupplierInvoicePaymentTerm =
  | 'CASH_ON_DELIVERY'
  | 'PAYMENT_IN_ADVANCE'
  | 'PAYMENT_ON_REALIZATION'

export const supplierInvoicePaymentOptionsTranslation = {
  PRIVATE_FUNDS: 'Личные средства',
  CURRENT_ACCOUNT: 'Расчетный счет',
  CASH_REGISTER: 'Касса',
}
export const supplierInvoicePaymentTermsTranslation = {
  CASH_ON_DELIVERY: 'При приходе',
  PAYMENT_IN_ADVANCE: 'На перед',
  PAYMENT_ON_REALIZATION: 'На реализацию',
}

export type GoodsReceipt = {
  id: string
  createdAt: Date
  updatedAt: Date
  supplierId: string | null
  warehouseId: string | null
  name: string
  goodsReceiptDate: Date
  supplierInvoice: {
    paymentOption: SupplierInvoicePaymentOption
    paymentTerm: SupplierInvoicePaymentTerm
    accountsPayable: string
  } | null
}
