import { z } from 'zod'

export const findAllImportSourceSchema = z.object({
    query: z.string().optional(),
    nextCursor: z.string().optional(),
})

export type FindAllImportSourceSchema = z.infer<
    typeof findAllImportSourceSchema
>
