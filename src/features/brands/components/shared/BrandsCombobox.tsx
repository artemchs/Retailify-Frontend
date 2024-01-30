import Brands from '@/api/services/Brands'
import CrudComboboxSingle from '@/components/forms/CrudComboboxSingle'
import { Brand } from '@/types/entities/Brand'
import { useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import CreateBrandDialog from '../actions/create/CreateBrandDialog'
import EditBrandDialog from '../actions/edit/EditBrandDialog'
import RemoveBrandAlertDialog from '../actions/remove/RemoveBrandAlertDialog'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'brandId'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export default function BrandsCombobox({ field, form }: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = Brands.useFindAll({ query })

  const selectedValue = field.value as string
  function setSelectedValue(id?: string) {
    form.setValue('brandId', id)
  }

  const selectedBrand = Brands.useFindOne({ id: selectedValue })

  return (
    <CrudComboboxSingle<Brand, { items: Brand[]; nextCursor?: string }>
      data={data}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      isFetchingNextPage={isFetchingNextPage}
      status={status}
      setSelectedValue={setSelectedValue}
      selectedValue={selectedValue}
      itemsField='items'
      nameField='name'
      idField='id'
      setQuery={setQuery}
      placeholder='Выберите брренд'
      selectedEntity={selectedBrand}
      CreateDialog={CreateBrandDialog}
      EditDialog={EditBrandDialog}
      DeleteAlertDialog={RemoveBrandAlertDialog}
    />
  )
}
