export type Collection = {
  _count: {
    characteristics: number
    products: number
  }
} & {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  parentId: string | null
  numOfProducts: number
  isArchived: boolean
}
