import Characteristics, {
  CharacteristicsFindAll,
} from '@/api/services/Characteristics'
import CrudComboboxMultipleSelect from '@/components/forms/CrudComboboxMultipleSelect'
import { Characteristic } from '@/types/entities/Characteristic'
import { useState } from 'react'
import CreateCharacteristicDialog from '../actions/create/CreateCharacteristicDialog'
import DeleteCharacteristicAlertDialog from '../actions/delete/DeleteCharacteristicAlert'
import EditCharacteristicDialog from '../actions/edit/EditCharacteristicDialog'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'characteristics'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export default function CharacteristicsCombobox({ field, form }: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = Characteristics.useFindAll({ query })

  const selectedValues = field.value as Characteristic[]
  const setSelectedValues = (newValues: Characteristic[]) => {
    form.setValue('characteristics', newValues)
  }

  function onSuccess(id: string) {
    form.setValue(
      'characteristics',
      selectedValues.filter((obj) => obj.id !== id)
    )
  }

  return (
    <CrudComboboxMultipleSelect<Characteristic, CharacteristicsFindAll>
      placeholder='Выберите характеристики'
      data={data}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      isFetchingNextPage={isFetchingNextPage}
      status={status}
      setQuery={setQuery}
      idField='id'
      nameField='name'
      itemsField='items'
      CreateDialog={CreateCharacteristicDialog}
      DeleteAlertDialog={DeleteCharacteristicAlertDialog}
      EditDialog={EditCharacteristicDialog}
      selectedValues={selectedValues}
      setSelectedValues={setSelectedValues}
      onSuccess={onSuccess}
    />
  )
}
