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
  warehouseStockEntries:
    | {
        id: string
        warehouseId: string
        warehouseQuantity: number
      }[]
    | null
  product: {
    id: string
    title: string
    sku: string
    supplierSku?: string
    media:
      | {
          id: string
          index: number
        }[]
      | null
  } | null
}
