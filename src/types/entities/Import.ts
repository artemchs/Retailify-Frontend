export type Import = {
    id: string
    createdAt: Date
    importSourceId: string | null
    status: 'PENDING' | 'ERROR' | 'IDLE' | 'SUCCESS'
    comment: string | null
    type: 'PRODUCTS'
}
