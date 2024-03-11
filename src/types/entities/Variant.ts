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
        id: string
        createdAt: Date
        updatedAt: Date
        variantId: string | null
        warehouseId: string | null
        warehouse: {
          name: string
        } | null
        warehouseQuantity: number
      }[]
    | null
  product: {
    title: string
    sku: string
  } | null
}

export interface VariantWithProduct extends Variant {
  product: ProductFindAll
}
