import { ColumnDef } from '@tanstack/react-table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getNameShorthand } from '@/utils/getNameShorthand'
import { Badge } from '@/components/ui/badge'
import roleNames from '@/utils/roleNames'
import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { Employee } from '@/types/entities/Employee'
import EmployeesActions from './EmployeesActions'

export const columns: ColumnDef<Employee>[] = [
  {
    id: 'Пользователь',
    accessorKey: 'fullName',
    header: () => (
      <SortableDataTableHeader
        label='Пользователь'
        orderByProperty='fullName'
        routeId='/layout/employees'
      />
    ),
    cell: ({ row }) => {
      const { fullName } = row.original

      return (
        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage src='' />
            <AvatarFallback>{getNameShorthand(fullName)}</AvatarFallback>
          </Avatar>
          <span className='font-medium'>{fullName}</span>
        </div>
      )
    },
  },
  {
    id: 'Адрес електронной почты',
    accessorKey: 'email',
    header: () => (
      <SortableDataTableHeader
        label='Адрес електронной почты'
        orderByProperty='email'
        routeId='/layout/employees'
      />
    ),
  },
  {
    header: 'Роль',
    cell: ({ row }) => {
      const data = row.original
      const userRole = data.role as keyof typeof roleNames

      return <Badge variant='outline'>{roleNames[userRole]}</Badge>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original

      return <EmployeesActions id={id} />
    },
    enableSorting: false,
    enableHiding: false,
  },
]
