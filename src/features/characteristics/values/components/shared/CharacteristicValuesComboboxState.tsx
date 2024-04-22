import Characteristics, {
  CharacteristicValuesFindAll,
} from '@/api/services/Characteristics'
import CrudComboboxMultiple from '@/components/forms/CrudComboboxMultiple'
import { CharacteristicValue } from '@/types/entities/Characteristic'
import { useState } from 'react'
import CreateCharacteristicValueDialog from '../actions/create/CreateCharacteristicValueDialog'
import EditCharacteristicValueDialog from '../actions/edit/EditCharacteristicValueDialog'
import DeleteCharacteristicValueAlertDialog from '../actions/remove/RemoveCharacteristicValueAlertDialog'

type Props = {
  characteristicId: string
  selectedValues: CharacteristicValue[]
  setSelectedValues: (newValues?: CharacteristicValue[]) => void
}

export default function CharacteristicValuesComboboxState({
  characteristicId,
  selectedValues,
  setSelectedValues,
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
      itemsField='items'
      nameField='value'
      selectedValues={selectedValues}
      setSelectedValues={setSelectedValues}
      CreateDialog={() => (
        <CreateCharacteristicValueDialog
          characteristicId={characteristicId}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      )}
      EditDialog={(props) => (
        <EditCharacteristicValueDialog
          {...props}
          characteristicId={characteristicId}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      )}
      DeleteAlertDialog={(props) => (
        <DeleteCharacteristicValueAlertDialog
          {...props}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          characteristicId={characteristicId}
        />
      )}
    />
  )
}
