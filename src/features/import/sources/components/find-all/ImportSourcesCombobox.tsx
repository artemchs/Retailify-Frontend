import ImportSource from '@/api/services/ImportSource'
import CrudComboboxSingle from '@/components/forms/CrudComboboxSingle'
import { ImportSource as ImportSourceType } from '@/types/entities/ImportSource'
import { useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import CreateImportSourceDialog from '../create/CreateImportSourceDialog'
import EditImportSourceDialog from '../edit/EditImportSourceDialog'
import RemoveImportSourceAlertDialog from '../remove/RemoveImportSourceAlertDialog'

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<any, 'importSourceId'>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any, any, undefined>
}

export default function ImportSourcesCombobox({ field, form }: Props) {
    const [query, setQuery] = useState('')
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = ImportSource.useFindAll({ query })

    const selectedValue = field.value as string
    function setSelectedValue(id?: string) {
        form.setValue('importSourceId', id)
    }

    const selectedImportSource = ImportSource.useFindOne({ id: selectedValue })

    return (
        <CrudComboboxSingle<
            ImportSourceType,
            { items: ImportSourceType[]; nextCursor?: string }
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
            placeholder='Выберите источник импорта'
            selectedEntity={selectedImportSource}
            CreateDialog={() => (
                <CreateImportSourceDialog
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                />
            )}
            EditDialog={EditImportSourceDialog}
            DeleteAlertDialog={RemoveImportSourceAlertDialog}
        />
    )
}
