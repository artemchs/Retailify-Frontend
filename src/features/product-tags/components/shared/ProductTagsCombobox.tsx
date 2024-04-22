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
  field: ControllerRenderProps<any, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  formFieldName?: string
}

export default function ProductTagsCombobox({
  field,
  form,
  formFieldName,
}: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = ProductTags.useFindAll({ query })

  const selectedValues = field.value as ProductTag[]
  const setSelectedValues = (newValues: ProductTag[]) => {
    form.setValue(formFieldName ?? 'tags', newValues)
  }

  function onSuccess(id: string) {
    form.setValue(
      formFieldName ?? 'tags',
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
      CreateDialog={() => (
        <CreateProductTagDialog
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      )}
      DeleteAlertDialog={({ id }) => (
        <RemoveProductTagAlertDialog
          id={id}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      )}
      EditDialog={({ id }) => (
        <EditProductTagDialog
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
