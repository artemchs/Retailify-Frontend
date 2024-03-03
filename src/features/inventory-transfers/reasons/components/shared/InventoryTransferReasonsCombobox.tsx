import CrudComboboxSingle from '@/components/forms/CrudComboboxSingle'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import { useState } from 'react'
import InventoryTransfers from '@/api/services/InventoryTransfers'
import { InventoryTransferReason } from '@/types/entities/InventoryTransfer'
import CreateInventoryTransferReasonDialog from '../actions/create/CreateInventoryTransferReasonDialog'
import EditInventoryTransferReasonDialog from '../actions/edit/EditInventoryTransferReasonDialog'
import RemoveInventoryTransferReasonAlertDialog from '../actions/remove/RemoveInventoryTransferReasonAlertDialog'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'reasonId'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export default function InventoryTransferReasonsCombobox({
  field,
  form,
}: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = InventoryTransfers.useFindAllReasons({ query })

  const selectedValue = field.value as string
  function setSelectedValue(id?: string) {
    form.setValue('reasonId', id)
  }

  const selectedReason = InventoryTransfers.useFindOneReason({
    id: selectedValue,
  })

  return (
    <CrudComboboxSingle<
      InventoryTransferReason,
      { items: InventoryTransferReason[]; nextCursor?: string }
    >
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
      placeholder='Выберите причину'
      selectedEntity={selectedReason}
      CreateDialog={CreateInventoryTransferReasonDialog}
      EditDialog={EditInventoryTransferReasonDialog}
      DeleteAlertDialog={RemoveInventoryTransferReasonAlertDialog}
    />
  )
}
