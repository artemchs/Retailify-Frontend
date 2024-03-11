import Customers from '@/api/services/Customers'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import CreateCustomerDialog from '@/features/customers/components/actions/create/CreateCustomerDialog'
import { columns } from '@/features/customers/components/table/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { customerRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

export default function CustomersPage() {
  const searchParams = useSearch({
    from: customerRoute.id,
  })

  const { data, isLoading, isError } = Customers.useFindAll(searchParams)

  return (
    <CrudLayout
      data={data}
      isLoading={isLoading}
      isError={isError}
      routeId='/layout/customers'
      title='Клиенты'
      columns={columns}
      topBarElements={
        <>
          <CreateCustomerDialog
            trigger={
              <DialogTrigger asChild>
                <Button>
                  <Plus className='h-4 w-4 mr-2' />
                  Добавить
                </Button>
              </DialogTrigger>
            }
          />
        </>
      }
    />
  )
}
