import VariantAdditionalAttributes, {
  VariantAdditionalAttributesFindAll,
} from '@/api/services/VariantAdditionalAttributes'
import CrudComboboxSingle from '@/components/forms/CrudComboboxSingle'
import { VariantAdditionalAttribute } from '@/types/entities/VariantAdditionalAttribute'
import { useState } from 'react'
import CreateVariantAdditionalAttributeDialog from '../actions/create/CreateVariantAdditionalAttributeDialog'
import EditVariantAdditionalAttributeDialog from '../actions/edit/EditVariantAdditionalAttributeDialog'
import RemoveVariantAdditionalAttributeAlertDialog from '../actions/remove/RemoveVariantAdditionalAttributeAlertDialog'

type Props = {
  selectedValue?: string
  setSelectedValue(id?: string): void
  sm?: boolean
}

export default function SelectVariantAdditionalAttribute({
  selectedValue,
  setSelectedValue,
  sm,
}: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = VariantAdditionalAttributes().useFindAll({ query })

  const selectedAttribute = VariantAdditionalAttributes().useFindOne({
    id: selectedValue,
  })

  return (
    <CrudComboboxSingle<
      VariantAdditionalAttribute,
      VariantAdditionalAttributesFindAll
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
      placeholder='Выберите атрибут'
      selectedEntity={selectedAttribute}
      CreateDialog={() => (
        <CreateVariantAdditionalAttributeDialog
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      )}
      EditDialog={({ id }) => <EditVariantAdditionalAttributeDialog id={id} />}
      DeleteAlertDialog={({ id }) => (
        <RemoveVariantAdditionalAttributeAlertDialog
          id={id}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      )}
      sm={sm}
    />
  )
}
