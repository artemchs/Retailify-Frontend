import { z } from 'zod'
import { createCharacteristicValueFormSchema } from './create-characteristic-value-form-schema'

export const editCharacteristicValueFormSchema =
  createCharacteristicValueFormSchema

export type EditCharacteristicValueFormSchema = z.infer<
  typeof editCharacteristicValueFormSchema
>
