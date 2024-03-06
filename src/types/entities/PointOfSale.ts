export type PointOfSale = {
  cashiers: {
    id: string
    fullName: string
  }[]
  productTags: {
    id: string
    name: string
  }[]
  categoryGroups: {
    id: string
    name: string
  }[]
  categories: {
    id: string
    name: string
  }[]
  warehouse: {
    id: string
    name: string
  } | null
} & {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  address: string
  isArchived: boolean
}

export type FullPointOfSale =
  | ({
      cashiers: {
        id: string
        fullName: string
      }[]
      productTags: {
        id: string
        name: string
      }[]
      categoryGroups: {
        id: string
        name: string
      }[]
      categories: {
        id: string
        name: string
      }[]
      warehouse: {
        id: string
        name: string
      } | null
    } & {
      id: string
      createdAt: Date
      updatedAt: Date
      name: string
      address: string
      isArchived: boolean
    })
  | null
