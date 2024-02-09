import { Button } from '@/components/ui/button'
import { CharacteristicValue } from './CharacteristicsInput'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Minus } from 'lucide-react'
import Characteristics from '@/api/services/Characteristics'
import CharacteristicValueCombobox from '@/features/characteristics/values/components/shared/CharacteristicValuesCombobox'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'

type Props = {
  values: CharacteristicValue[]
  setValues(newValues: CharacteristicValue[]): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'characteristicValues'>
}

export default function DisplaySelectedCharacteristicValues({
  setValues,
  values,
  field,
  form,
}: Props) {
  return (
    <div className='border border-input rounded-md shadow-sm'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Характеристика</TableHead>
            <TableHead>Значение</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {values.length >= 1 ? (
            values.map((value) => (
              <TableRow key={value.characteristicId}>
                <TableCell>
                  <DisplayCharacteristicName
                    characteristicId={value.characteristicId}
                  />
                </TableCell>
                <TableCell>
                  <CharacteristicValueCombobox
                    characteristicId={value.characteristicId}
                    field={field}
                    form={form}
                  />
                </TableCell>
                <TableCell>
                  <div className='flex justify-end'>
                    <Button
                      size='icon'
                      variant='secondary'
                      onClick={() =>
                        setValues(
                          values.filter(
                            (obj) =>
                              obj.characteristicId !== value.characteristicId
                          )
                        )
                      }
                    >
                      <Minus className='h-4 w-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>
                <div className='flex w-full h-24 text-center justify-center items-center text-muted-foreground'>
                  Вы еще не выбрали характеристики
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function DisplayCharacteristicName({
  characteristicId,
}: {
  characteristicId: string
}) {
  const { data, isLoading, isError } = Characteristics.useFindOne({
    id: characteristicId,
  })

  if (isLoading) return <p>Загрузка...</p>
  if (isError) return <p>Ошибка</p>

  return <p>{data?.name}</p>
}
