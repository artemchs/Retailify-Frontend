import VariantAdditionalAttributes, {
  VariantAdditionalAttributesFindAll,
} from '@/api/services/VariantAdditionalAttributes'
import CrudComboboxSingle from '@/components/forms/CrudComboboxSingle'
import { VariantAdditionalAttribute } from '@/types/entities/VariantAdditionalAttribute'
import { useState } from 'react'

type Props = {
  selectedValue?: string
  setSelectedValue(id?: string): void
}

export default function SelectVariantAdditionalAttribute({
  selectedValue,
  setSelectedValue,
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
      placeholder='Выберите дополнительный атрибут варианта'
      selectedEntity={selectedAttribute}
    />
  )
}
