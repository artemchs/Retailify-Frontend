import { useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import CrudComboboxMultiple from '@/components/forms/CrudComboboxMultiple'
import Colors, { ColorsFindAll } from '@/api/services/Colors'
import CreateColorDialog from '../actions/create/CreateColorDialog'
import DeleteColorAlertDialog from '../actions/remove/RemoveColorAlertDialog'
import EditColorDialog from '../actions/edit/EditColorDialog'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'colors'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export type ColorsComboboxColor = {
  id: string
  index: number
  name: string
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

  const selectedValues = field.value as ColorsComboboxColor[]
  const setSelectedValues = (newValues: ColorsComboboxColor[]) => {
    form.setValue(
      'colors',
      newValues.map((v, i) => ({ ...v, index: i }))
    )
  }

  function onSuccess(id: string) {
    form.setValue(
      'colors',
      selectedValues.filter((obj) => obj.id !== id)
    )
  }

  return (
    <CrudComboboxMultiple<ColorsComboboxColor, ColorsFindAll>
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
      CreateDialog={() => (
        <CreateColorDialog
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      )}
      DeleteAlertDialog={({ id }) => (
        <DeleteColorAlertDialog
          id={id}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      )}
      EditDialog={({ id }) => (
        <EditColorDialog
          id={id}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      )}
      selectedValues={selectedValues}
      setSelectedValues={setSelectedValues}
      onSuccess={onSuccess}
    />
  )
}
