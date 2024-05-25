import CrudComboboxSingle from '@/components/forms/CrudComboboxSingle'
import { useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import CustomFinancialOperations from '@/api/services/CustomFinancialOperations'
import { CustomFinancialOperation } from '@/types/entities/CustomFinancialOperation'
import CreateCustomOperationDialog from '../actions/create/CreateCustomOperationDialog'
import EditCustomFinancialOperationDialog from '../actions/edit/EditCustomOperationDialog'
import RemoveCustomOperationAlertDialog from '../actions/remove/RemoveCustomOperationAlertDialog'

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<any, 'customOperationId'>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any, any, undefined>
}

export default function CustomOperationsCombobox({ field, form }: Props) {
    const [query, setQuery] = useState('')
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = CustomFinancialOperations.useFindAll({ query })

    const selectedValue = field.value as string
    function setSelectedValue(id?: string) {
        form.setValue('customOperationId', id)
    }

    const selectedBrand = CustomFinancialOperations.useFindOne({
        id: selectedValue,
    })

    return (
        <CrudComboboxSingle<
            CustomFinancialOperation,
            { items: CustomFinancialOperation[]; nextCursor?: string }
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
            placeholder='Выберите пользовательскую операцию'
            selectedEntity={selectedBrand}
            CreateDialog={() => (
                <CreateCustomOperationDialog
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                />
            )}
            EditDialog={EditCustomFinancialOperationDialog}
            DeleteAlertDialog={RemoveCustomOperationAlertDialog}
        />
    )
}
