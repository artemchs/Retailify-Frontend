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
        cashier: {
            id: string
            fullName: string
        } | null
        pointOfSale: {
            id: string
            name: string
        } | null
    } | null
    admin: {
        id: string
        fullName: string
    } | null
} & {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    shiftId: string | null
    orderId: string | null
    amount: string
    adminId: string | null
}
