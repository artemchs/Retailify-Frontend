type Characteristic = {
  id: string
  characteristicId: string | null
  value: string
  characteristic: { id: string; name: string } | null
}

export default function transformCharacteristicValues(
  characteristicValues: Characteristic[]
) {
  const characteristics = []

  // Create a map to group values by characteristic
  const characteristicMap = new Map()

  // Iterate over the input array
  for (const { id, characteristic, value } of characteristicValues) {
    if (characteristic) {
      const { id: characteristicId } = characteristic
      const values = characteristicMap.get(characteristicId) || []
      values.push({ id, value })
      characteristicMap.set(characteristicId, values)
    }
  }

  // Create the desired format
  for (const [characteristicId, values] of characteristicMap) {
    const characteristic = characteristicValues.find(
      (cv) => cv.characteristicId === characteristicId && cv.characteristic
    )?.characteristic

    if (characteristic) {
      characteristics.push({
        id: characteristic.id,
        name: characteristic.name,
        values,
      })
    }
  }

  return characteristics
}
