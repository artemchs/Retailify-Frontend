export type Product = {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  collectionId: string | null
  brandId: string | null
  totalReceivedQuantity: number
  totalWarehouseQuantity: number
  packagingLength: number
  packagingWidth: number
  packagingHeight: number
  packagingWeight: number
  isArchived: boolean
}
