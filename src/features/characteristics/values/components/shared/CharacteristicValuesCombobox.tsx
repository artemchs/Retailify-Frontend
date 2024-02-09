import Characteristics from '@/api/services/Characteristics'
import CrudComboboxSingle from '@/components/forms/CrudComboboxSingle'
import { CharacteristicValue } from '@/types/entities/Characteristic'
import { useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import CreateCharacteristicValueDialog from '../actions/create/CreateCharacteristicValueDialog'
import EditCharacteristicValueDialog from '../actions/edit/EditCharacteristicValueDialog'
import DeleteCharacteristicValueAlertDialog from '../actions/remove/RemoveCharacteristicValueAlertDialog'

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

  const selectedValues = field.value as {
    id?: string
    characteristicId: string
  }[]
  const selectedValueId = selectedValues.find(
    (obj) => obj.characteristicId === characteristicId
  )?.id
  function setSelectedValue(id?: string) {
    if (id) {
      const newArray = selectedValues
      const index =
        newArray.findIndex(
          (obj) => obj.characteristicId === characteristicId
        ) ?? selectedValues.length
      newArray[index] = {
        id,
        characteristicId,
      }
      form.setValue('characteristicValues', newArray)
    } else {
      const newArray = selectedValues
      const index =
        newArray.findIndex(
          (obj) => obj.characteristicId === characteristicId
        ) ?? selectedValues.length
      newArray[index] = {
        id: undefined,
        characteristicId,
      }
      form.setValue('characteristicValues', newArray)
    }
  }

  const selectedValue = Characteristics.useFindOneValue({
    id: selectedValueId,
    characteristicId,
  })

  return (
    <CrudComboboxSingle<
      CharacteristicValue,
      { items: CharacteristicValue[]; nextCursor?: string }
    >
      data={data}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      isFetchingNextPage={isFetchingNextPage}
      status={status}
      setSelectedValue={setSelectedValue}
      selectedValue={selectedValueId}
      itemsField='items'
      nameField='value'
      idField='id'
      setQuery={setQuery}
      placeholder='Выберите значение характеристики'
      selectedEntity={selectedValue}
      CreateDialog={() => (
        <CreateCharacteristicValueDialog characteristicId={characteristicId} />
      )}
      EditDialog={(props) => (
        <EditCharacteristicValueDialog
          {...props}
          characteristicId={characteristicId}
        />
      )}
      DeleteAlertDialog={(props) => (
        <DeleteCharacteristicValueAlertDialog
          {...props}
          selectedValue={selectedValueId}
          setSelectedValue={setSelectedValue}
          characteristicId={characteristicId}
        />
      )}
    />
  )
}
