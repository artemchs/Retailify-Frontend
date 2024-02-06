export type Category = {
  _count?: {
    products: number
  }
} & {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  productName: string
  groupId: string | null
  isArchived: boolean
}
