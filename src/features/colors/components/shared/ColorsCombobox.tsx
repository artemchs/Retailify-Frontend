import { useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import CrudComboboxMultiple from '@/components/forms/CrudComboboxMultiple'
import Colors, { ColorsFindAll } from '@/api/services/Colors'
import { Color } from '@/types/entities/Color'
import CreateColorDialog from '../actions/create/CreateColorDialog'
import DeleteColorAlertDialog from '../actions/remove/RemoveColorAlertDialog'
import EditColorDialog from '../actions/edit/EditColorDialog'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'colors'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export default function ColorsCombobox({ field, form }: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = Colors.useFindAll({ query })

  const selectedValues = field.value as Color[]
  const setSelectedValues = (newValues: Color[]) => {
    form.setValue('colors', newValues)
  }

  function onSuccess(id: string) {
    form.setValue(
      'colors',
      selectedValues.filter((obj) => obj.id !== id)
    )
  }

  return (
    <CrudComboboxMultiple<Color, ColorsFindAll>
      placeholder='Выберите цвета'
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
      CreateDialog={CreateColorDialog}
      DeleteAlertDialog={DeleteColorAlertDialog}
      EditDialog={EditColorDialog}
      selectedValues={selectedValues}
      setSelectedValues={setSelectedValues}
      onSuccess={onSuccess}
    />
  )
}
