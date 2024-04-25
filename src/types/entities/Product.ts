import { Variant } from './Variant'

export type ProductSeason = 'WINTER' | 'SPRING_FALL' | 'SUMMER' | 'ALL_SEASON'
export type ProductGender = 'MALE' | 'FEMALE' | 'UNISEX'

export type Product = {
  id: string
  sku: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string | null
  categoryId: string | null
  brandId: string | null
  gender: ProductGender
  season: ProductSeason
  totalReceivedQuantity: number
  totalWarehouseQuantity: number
  packagingLength: number
  packagingWidth: number
  packagingHeight: number
  packagingWeight: number
  isArchived: boolean
  brand: {
    id: string
    name: string
  } | null
  category: {
    id: string
    name: string
  } | null
  tags:
    | {
        id: string
        name: string
      }[]
    | null
  colors:
    | {
        colorId: string
        index: number
        color: {
          name: string
          color: string
        } | null
      }[]
    | null
  media:
    | {
        id: string
        index: number
      }[]
    | null
  characteristicValues:
    | {
        id: string
        value: string
        characteristicId: string | null
        characteristic: {
          id: string
          name: string
        } | null
      }[]
    | null
  variants:
    | {
        id: string
        size: string
        price: number
        sale: number | null
        isArchived: boolean
      }[]
    | null
}

export type ProductFindAll = {
  id: string
  sku: string
  createdAt: Date
  updatedAt: Date
  title: string
  gender: ProductGender
  season: ProductSeason
  totalReceivedQuantity: number
  totalWarehouseQuantity: number
  packagingLength: number
  packagingWidth: number
  packagingHeight: number
  packagingWeight: number
  isArchived: boolean
  brand: {
    id: string
    name: string
  } | null
  category: {
    id: string
    name: string
  } | null
  tags:
    | {
        id: string
        name: string
      }[]
    | null
  colors:
    | {
        colorId: string
        index: number
        color: {
          name: string
          color: string
        }
      }[]
    | null
  media:
    | {
        id: string
        index: number
      }[]
    | null
  variants:
    | {
        id: string
        size: string
        price: number
        sale: number | null
        totalReceivedQuantity: number
        totalWarehouseQuantity: number
        warehouseStockEntries: {
          warehouseQuantity: number
          warehouse: {
            id: string
            name: string
          } | null
        }[]
      }[]
    | null
}

export interface ProductWithVariants extends Product {
  variants: Variant[]
}
