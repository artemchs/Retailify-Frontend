export type InventoryAdjustment = {
  reason: {
    id: string
    name: string
  } | null
  warehouse: {
    id: string
    name: string
  } | null
  _count: {
    variants: number
  }
} & {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  date: Date
  reasonId: string | null
  warehouseId: string | null
  isArchived: boolean
}

export type FullInventoryAdjustment = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  date: Date
  reasonId: string | null
  warehouseId: string | null
  isArchived: boolean
  warehouse: {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    address: string
    isArchived: boolean
  } | null
  variants: ({
    variantToWarehouse: {
      warehouseQuantity: number
      variant: {
        product: {
          title: string
        } | null
        size: string
        id: string
      } | null
    } | null
  } & {
    id: string
    createdAt: Date
    updatedAt: Date
    variantToWarehouseId: string | null
    inventoryAdjustmentId: string | null
    quantityChange: number
  })[]
  reason: {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
  } | null
}

export type InventoryAdjustmentReason = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
}
