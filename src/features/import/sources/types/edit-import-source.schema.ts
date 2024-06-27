import { z } from 'zod'
import { createImportSourceSchema } from './create-import-source.schema'

export const editImportSourceSchema = createImportSourceSchema

export type EditImportSourceSchema = z.infer<typeof editImportSourceSchema>
