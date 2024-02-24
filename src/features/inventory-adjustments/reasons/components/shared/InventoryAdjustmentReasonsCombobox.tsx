import InventoryAdjustments from '@/api/services/InventoryAdjustments'
import CrudComboboxSingle from '@/components/forms/CrudComboboxSingle'
import { InventoryAdjustmentReason } from '@/types/entities/InventoryAdjustment'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import CreateInventoryAdjustmentReasonDialog from '../actions/create/CreateInventoryAdjustmentReasonDialog'
import EditInventoryAdjustmentReasonDialog from '../actions/edit/EditInventoryAdjustmentReasonDialog'
import RemoveInventoryAdjustmentReasonDialog from '../actions/remove/RemoveInventoryAdjustmentReasonDialog'
import { useState } from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'reasonId'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export default function InventoryAdjustmentReasonsCombobox({
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
  } = InventoryAdjustments.useFindAllReasons({ query })

  const selectedValue = field.value as string
  function setSelectedValue(id?: string) {
    form.setValue('reasonId', id)
  }

  const selectedReason = InventoryAdjustments.useFindOneReason({
    id: selectedValue,
  })

  return (
    <CrudComboboxSingle<
      InventoryAdjustmentReason,
      { items: InventoryAdjustmentReason[]; nextCursor?: string }
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
      CreateDialog={CreateInventoryAdjustmentReasonDialog}
      EditDialog={EditInventoryAdjustmentReasonDialog}
      DeleteAlertDialog={RemoveInventoryAdjustmentReasonDialog}
    />
  )
}
