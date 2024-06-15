import DropdownFilter from '@/components/filters/DropdownFilter'
import IsArchivedSwitch from '@/components/filters/IsArchivedSwitch'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import SelectWarehousesForFiltering from '@/features/warehouses/components/shared/SelectWarehousesForFiltering'
import { productVariantsRoute } from '@/lib/router/routeTree'
import { useNavigate, useSearch } from '@tanstack/react-router'

export default function FilterVariants() {
    const { isArchived, warehouseIds } = useSearch({
        from: productVariantsRoute.id,
    })
    const navigate = useNavigate()

    function numOfApplied() {
        let number = 0

        if (isArchived) {
            number += 1
        }

        for (const arr of [warehouseIds]) {
            if (arr && arr.length >= 1) {
                number += 1
            }
        }

        return number
    }

    function setIsArchived(value: number) {
        navigate({
            search: (prev) => ({ ...prev, isArchived: value }),
        })
    }

    function setWarehouseIds(values: string[]) {
        navigate({
            search: (prev) => ({ ...prev, warehouseIds: values }),
        })
    }

    function resetFilters() {
        navigate({
            search: (prev) => ({
                ...prev,
                isArchived: 0,
                warehouseIds: undefined,
            }),
        })
    }

    return (
        <DropdownFilter
            numOfApplied={numOfApplied()}
            resetFilters={resetFilters}
        >
            <SelectWarehousesForFiltering
                ids={warehouseIds ?? []}
                setIds={setWarehouseIds}
            />
            <DropdownMenuSeparator />
            <IsArchivedSwitch
                setIsArchived={setIsArchived}
                isArchived={isArchived ? Boolean(isArchived) : false}
            />
        </DropdownFilter>
    )
}
