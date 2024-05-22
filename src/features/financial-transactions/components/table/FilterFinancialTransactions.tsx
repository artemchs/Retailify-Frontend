import ComboboxSubItemForArrayValues from '@/components/filters/ComboboxSubItemForArrayValues'
import DropdownFilter from '@/components/filters/DropdownFilter'
import { DatePickerWithRange } from '@/components/ui/date-picker'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { financialTransactionsRoute } from '@/lib/router/routeTree'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { DateRange } from 'react-day-picker'
import {
    financialTransactionDirections,
    financialTransactionTypes,
} from '../shared/constants'
import SelectEmployeesForFiltering from '@/features/employees/components/SelectEmployeesForFiltering'

export default function FilterFinancialTransactions() {
    const { directions, types, systemUserIds, createdAt } = useSearch({
        from: financialTransactionsRoute.id,
    })
    const navigate = useNavigate()

    function numOfApplied() {
        let number = 0

        for (const arr of [directions, types, systemUserIds]) {
            if (arr && arr.length >= 1) {
                number += 1
            }
        }

        if (createdAt) number += 1

        return number
    }

    function setDirections(values: string[]) {
        navigate({
            search: (prev) => ({ ...prev, directions: values }),
        })
    }

    function setTypes(values: string[]) {
        navigate({
            search: (prev) => ({ ...prev, types: values }),
        })
    }

    function setSystemUserIds(values: string[]) {
        navigate({
            search: (prev) => ({ ...prev, systemUserIds: values }),
        })
    }

    function setCreatedAt(value?: DateRange) {
        navigate({
            search: (prev) => ({ ...prev, createdAt: value }),
        })
    }

    function resetFilters() {
        navigate({
            search: (prev) => ({
                ...prev,
                directions: undefined,
                types: undefined,
                systemUserIds: undefined,
                createdAt: undefined,
            }),
        })
    }

    return (
        <DropdownFilter
            numOfApplied={numOfApplied()}
            resetFilters={resetFilters}
        >
            <div className='p-2'>
                <DatePickerWithRange
                    date={{
                        from: createdAt?.from,
                        to: createdAt?.to,
                    }}
                    setDate={setCreatedAt}
                />
            </div>
            <DropdownMenuSeparator />
            <ComboboxSubItemForArrayValues
                title='Направления'
                options={financialTransactionDirections}
                values={directions ?? []}
                setValues={setDirections}
            />
            <ComboboxSubItemForArrayValues
                title='Тип транзакций'
                options={financialTransactionTypes}
                values={types ?? []}
                setValues={setTypes}
            />
            <SelectEmployeesForFiltering
                ids={systemUserIds ?? []}
                setIds={setSystemUserIds}
                title='Кассиры'
            />
        </DropdownFilter>
    )
}
