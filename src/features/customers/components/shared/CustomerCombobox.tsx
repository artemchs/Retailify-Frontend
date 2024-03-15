import Customers from '@/api/services/Customers'
import CrudComboboxSingle from '@/components/forms/CrudComboboxSingle'
import { Customer } from '@/types/entities/Customer'
import { useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import CreateCustomerDialog from '../actions/create/CreateCustomerDialog'
import { DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Edit, Plus, Trash2 } from 'lucide-react'
import EditCustomerDialog from '../actions/edit/EditCustomerDialog'
import RemoveCustomerAlertDialog from '../actions/remove/RemoveCustomerAlertDialog'
import { AlertDialogTrigger } from '@/components/ui/alert-dialog'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'customerId'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export default function CustomerCombobox({ field, form }: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = Customers.useFindAllInfiniteList({ query })

  const selectedValue = field.value as string
  function setSelectedValue(id?: string) {
    form.setValue('customerId', id)
  }

  const selectedEntity = Customers.useFindOne({ id: selectedValue })

  return (
    <CrudComboboxSingle<Customer, { items: Customer[]; nextCursor?: string }>
      data={data}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      isFetchingNextPage={isFetchingNextPage}
      status={status}
      setSelectedValue={setSelectedValue}
      selectedValue={selectedValue}
      itemsField='items'
      nameField='phoneNumber'
      idField='id'
      setQuery={setQuery}
      placeholder='Выберите клиента'
      selectedEntity={selectedEntity}
      selectedEntityName={
        selectedEntity.data
          ? `${selectedEntity.data.firstName} ${selectedEntity.data.lastName}`
          : ''
      }
      CreateDialog={() => (
        <CreateCustomerDialog
          trigger={
            <DialogTrigger asChild>
              <Button size='sm' variant='secondary' className='w-full'>
                <Plus className='h-4 w-4 mr-2' />
                Добавить клиента
              </Button>
            </DialogTrigger>
          }
        />
      )}
      EditDialog={({ id }) => (
        <EditCustomerDialog
          id={id}
          trigger={
            <DialogTrigger asChild>
              <button>
                <Edit className='h-4 w-4' />
              </button>
            </DialogTrigger>
          }
        />
      )}
      DeleteAlertDialog={({ id }) => (
        <RemoveCustomerAlertDialog
          id={id}
          trigger={
            <AlertDialogTrigger asChild>
              <button className='text-destructive'>
                <Trash2 className='h-4 w-4' />
              </button>
            </AlertDialogTrigger>
          }
          setSelectedValue={setSelectedValue}
          selectedValue={selectedValue}
        />
      )}
    />
  )
}
