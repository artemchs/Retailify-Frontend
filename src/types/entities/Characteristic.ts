export type Characteristic = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
}

export type CharacteristicValue = {
  id: string
  createdAt: Date
  updatedAt: Date
  value: string
  characteristicId: string | null
}
