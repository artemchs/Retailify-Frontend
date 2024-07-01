import { ImportSourceSchema } from '@/features/import/sources/types/create-import-source.schema'

export type ImportSource = {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    schema: ImportSourceSchema
}
