export type InventoryTransfer = {
  reason: {
    id: string
    name: string
  } | null
  sourceWarehouse: {
    id: string
    name: string
  } | null
  destinationWarehouse: {
    id: string
    name: string
  } | null
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  date: Date
  reasonId: string | null
  sourceWarehouseId: string | null
  destinationWarehouseId: string | null
  isArchived: boolean
}

export type FullInventoryTransfer = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  date: Date
  reasonId: string | null
  sourceWarehouseId: string | null
  destinationWarehouseId: string | null
  isArchived: boolean
  transferItems: ({
    variant: {
      product: {
        title: string
      } | null
      size: string
      warehouseStockEntries: {
        warehouseQuantity: number
      }[]
    } | null
  } & {
    id: string
    createdAt: Date
    updatedAt: Date
    inventoryTransferId: string | null
    variantId: string | null
    quantity: number
  })[]
}

export type InventoryTransferReason = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
}
