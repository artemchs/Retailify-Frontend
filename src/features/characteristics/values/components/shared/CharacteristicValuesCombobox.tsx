import Characteristics, {
  CharacteristicValuesFindAll,
} from '@/api/services/Characteristics'
import { CharacteristicValue } from '@/types/entities/Characteristic'
import { useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import CrudComboboxMultiple from '@/components/forms/CrudComboboxMultiple'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'characteristicValues'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  characteristicId: string
}

export default function CharacteristicValueCombobox({
  field,
  form,
  characteristicId,
}: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = Characteristics.useFindAllValues(characteristicId, { query })

  const selectedValues = field.value as CharacteristicValue[]
  const setSelectedValues = (newValues: CharacteristicValue[]) => {
    form.setValue('characteristicValues', newValues)
  }

  return (
    <CrudComboboxMultiple<CharacteristicValue, CharacteristicValuesFindAll>
      placeholder='Выберите значения'
      data={data}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      isFetchingNextPage={isFetchingNextPage}
      status={status}
      setQuery={setQuery}
      idField='id'
      nameField='value'
      itemsField='items'
      selectedValues={selectedValues}
      setSelectedValues={setSelectedValues}
    />
  )
}
