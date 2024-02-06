import { z } from 'zod'

export const findAllInfiniteListCategorySchema = z.object({
  query: z.string().optional(),
  cursor: z.string().optional(),
})

export type FindAllInfiniteListCategorySchema = z.infer<
  typeof findAllInfiniteListCategorySchema
>
