import Categories from '@/api/services/Categories'
import { Button } from '@/components/ui/button'
import { LibraryBig, Loader2, X } from 'lucide-react'
import Characteristics from '@/api/services/Characteristics'
import { CharacteristicWithValues } from './CharacteristicsInput'

type Props = {
  setValues(newValues: CharacteristicWithValues[]): void
  categoryId: string
}

export default function SetDefaultCharacteristics({
  setValues,
  categoryId,
}: Props) {
  const { data, isLoading, isError } = Categories.useFindOne({ id: categoryId })

  return (
    <LoadCharacteristics
      categoryId={categoryId}
      setValues={setValues}
      groupId={data?.groupId ? data.groupId : undefined}
      categoryIsLoading={isLoading}
      categoryIsError={isError}
    />
  )
}

function LoadCharacteristics({
  categoryId,
  groupId,
  setValues,
  categoryIsError,
  categoryIsLoading,
}: Props & {
  groupId?: string
  categoryIsLoading: boolean
  categoryIsError: boolean
}) {
  const categoryCharacteristics = Characteristics.useFindAllForCategory({
    categoryId,
  })
  const groupCharacteristics = Characteristics.useFindAllForCategory({
    categoryGroupId: groupId,
  })

  const isError =
    categoryCharacteristics.isError || groupCharacteristics.isError
  const isLoading =
    categoryCharacteristics.isLoading || groupCharacteristics.isLoading

  let defaultCharacteristics: CharacteristicWithValues[] = []
  if (
    categoryCharacteristics.data &&
    categoryCharacteristics.data.length >= 1
  ) {
    defaultCharacteristics = [
      ...defaultCharacteristics,
      ...categoryCharacteristics.data.map((obj) => ({ ...obj, values: [] })),
    ]
  }
  if (groupCharacteristics.data && groupCharacteristics.data.length >= 1) {
    defaultCharacteristics = [
      ...defaultCharacteristics,
      ...groupCharacteristics.data.map((obj) => ({ ...obj, values: [] })),
    ]
  }

  return (
    <RenderButton
      isError={isError || categoryIsError}
      isLoading={isLoading || categoryIsLoading}
      defaultCharacteristics={defaultCharacteristics}
      setValues={setValues}
    />
  )
}

function RenderButton({
  isLoading,
  isError,
  defaultCharacteristics,
  setValues,
}: {
  isLoading: boolean
  isError: boolean
  defaultCharacteristics?: CharacteristicWithValues[]
  setValues(newValues: CharacteristicWithValues[]): void
}) {
  return (
    <Button
      size='sm'
      variant={isError ? 'destructive' : 'ghost'}
      type='button'
      className='lg:w-fit'
      disabled={isLoading || isError || !defaultCharacteristics}
      onClick={() => {
        if (defaultCharacteristics) {
          setValues(defaultCharacteristics)
        }
      }}
    >
      {isLoading ? (
        <Loader2 className='h-4 w-4 mr-2 animate-spin' />
      ) : isError ? (
        <X className='h-4 w-4 mr-2' />
      ) : (
        <LibraryBig className='h-4 w-4 mr-2' />
      )}
      Взять характеристики из группы и категории
    </Button>
  )
}
