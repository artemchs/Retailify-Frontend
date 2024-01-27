import { z } from 'zod'
import { createCharacteristicFormSchema } from './create-characteristic-form-schema'

export const editCharacteristicFormSchema = createCharacteristicFormSchema

export type EditCharacteristicFormSchema = z.infer<
  typeof editCharacteristicFormSchema
>
