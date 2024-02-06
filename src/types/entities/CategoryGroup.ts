export type CategoryGroup = {
  _count?: {
    categories: number
  }
} & {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  isArchived: boolean
}
