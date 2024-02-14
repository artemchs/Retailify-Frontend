export type Variant = {
  id: string
  createdAt: Date
  updatedAt: Date
  productId: string | null
  totalReceivedQuantity: number
  totalWarehouseQuantity: number
  size: string
  barcode: string
  price: number
  sale: number | null
  isArchived: boolean
}
