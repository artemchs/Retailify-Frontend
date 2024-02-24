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

export type InventoryAdjustmentReason = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
}
