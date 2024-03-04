import { Characteristic } from '@/types/entities/Characteristic'
import { useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import CrudComboboxMultiple from '@/components/forms/CrudComboboxMultiple'
import ProductTags, { ProductTagsFindAll } from '@/api/services/ProductTags'
import CreateProductTagDialog from '../actions/create/CreateProductTagDialog'
import RemoveProductTagAlertDialog from '../actions/remove/RemoveProductTagAlertDialog'
import EditProductTagDialog from '../actions/edit/EditProductTagDialog'
import { ProductTag } from '@/types/entities/ProductTag'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'tags'>
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
  } = ProductTags.useFindAll({ query })

  const selectedValues = field.value as Characteristic[]
  const setSelectedValues = (newValues: Characteristic[]) => {
    form.setValue('tags', newValues)
  }

  function onSuccess(id: string) {
    form.setValue(
      'tags',
      selectedValues.filter((obj) => obj.id !== id)
    )
  }

  return (
    <CrudComboboxMultiple<ProductTag, ProductTagsFindAll>
      placeholder='Выберите теги'
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
      CreateDialog={CreateProductTagDialog}
      DeleteAlertDialog={RemoveProductTagAlertDialog}
      EditDialog={EditProductTagDialog}
      selectedValues={selectedValues}
      setSelectedValues={setSelectedValues}
      onSuccess={onSuccess}
    />
  )
}
