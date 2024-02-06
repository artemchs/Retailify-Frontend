import { z } from 'zod'

export const findAllInfiniteListCategoryGroupsSchema = z.object({
  query: z.string().optional(),
  cursor: z.string().optional(),
})

export type FindAllInfiniteListCategoryGroupsSchema = z.infer<
  typeof findAllInfiniteListCategoryGroupsSchema
>
