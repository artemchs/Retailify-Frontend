import { ProductFindAll } from './Product'

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
        warehouseId: string
        warehouseQuantity: number
      }[]
    | null
  product: {
    id: string
    title: string
    sku: string
    media:
      | {
          id: string
          index: number
        }[]
      | null
  } | null
}

export interface VariantWithProduct extends Variant {
  product: ProductFindAll
}
