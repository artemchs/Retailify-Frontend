export const financialTransactionType = [
    'CASH_REGISTER_WITHDRAWAL',
    'ORDER_PAYMENT',
    'ORDER_REFUND',
    'SUPPLIER_PAYMENT',
    'SALARY_PAYMENT',
    'CASH_REGISTER_DEPOSIT',
    'OTHER',
] as const

export const financialTransactionDirection = ['DEBIT', 'CREDIT'] as const

export type FinancialTransaction = {
    id: string
    createdAt: Date
    updatedAt: Date
    date: Date
    amount: string
    type: (typeof financialTransactionType)[number]
    direction: (typeof financialTransactionDirection)[number]
    comment: string | null
    shiftId: string | null
    orderInvoiceId: string | null
    refundId: string | null
    customOperationId: string | null
    supplierId: string | null
}

export interface FinancialTransactionFindAll extends FinancialTransaction {
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
    customOperation: {
        id: string
        createdAt: Date
        updatedAt: Date
        name: string
    } | null
}
