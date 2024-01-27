import { z } from 'zod'
import { createCollectionFormSchema } from './create-collection-form-schema'

export const editCollectionFormSchema = createCollectionFormSchema

export type EditCollectionFormSchema = z.infer<typeof editCollectionFormSchema>
