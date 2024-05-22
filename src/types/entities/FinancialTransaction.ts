export const financialTransactionType = [
    'CASH_REGISTER_WITHDRAWAL',
    'ORDER_PAYMENT',
    'ORDER_REFUND',
    'SUPPLIER_PAYMENT',
    'SALARY_PAYMENT',
    'CASH_REGISTER_DEPOSIT',
] as const

export const financialTransactionDirection = ['DEBIT', 'CREDIT'] as const

export type FinancialTransaction = {
    id: string
    createdAt: Date
    updatedAt: Date
    amount: string
    type: (typeof financialTransactionType)[number]
    direction: (typeof financialTransactionDirection)[number]
    shiftId: string | null
    orderInvoiceId: string | null
    refundId: string | null
}

export type FinancialTransactionFindAll = {
    orderInvoice: {
        id: string
        createdAt: Date
        updatedAt: Date
        totalCashAmount: string
        totalCardAmount: string
        paymentMethod: 'CARD' | 'CASH' | 'MIXED'
    } | null
    refund: {
        id: string
        createdAt: Date
        updatedAt: Date
        name: string
        shiftId: string | null
        orderId: string | null
        amount: string
    } | null
    shift: {
        id: string
        createdAt: Date
        closedAt: Date | null
        updatedAt: Date
        name: string
        cashierId: string | null
        pointOfSaleId: string | null
        startingCashBalance: string
        isOpened: boolean
    } | null
    id: string
    createdAt: Date
    updatedAt: Date
    amount: string
    type:
        | 'CASH_REGISTER_WITHDRAWAL'
        | 'ORDER_PAYMENT'
        | 'ORDER_REFUND'
        | 'SUPPLIER_PAYMENT'
        | 'SALARY_PAYMENT'
        | 'CASH_REGISTER_DEPOSIT'
    direction: 'DEBIT' | 'CREDIT'
    shiftId: string | null
    orderInvoiceId: string | null
    refundId: string | null
}
