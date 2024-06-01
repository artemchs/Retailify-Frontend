import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import CharacteristicsCombobox from '@/features/characteristics/components/shared/CharacteristicsCombobox'
import CharacteristicValuesComboboxState from '@/features/characteristics/values/components/shared/CharacteristicValuesComboboxState'
import {
    Characteristic,
    CharacteristicValue,
} from '@/types/entities/Characteristic'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import {
    Control,
    ControllerRenderProps,
    UseFormReturn,
    useWatch,
} from 'react-hook-form'
import SetDefaultCharacteristics from './SetDefaultCharacteristics'

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any, any, undefined>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any, any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<any, 'characteristics'>
    withCategory?: boolean
}

export interface CharacteristicWithValues extends Characteristic {
    values: CharacteristicValue[]
}

export default function CharacteristicsInput({
    control,
    field,
    form,
    withCategory,
}: Props) {
    const categoryId = useWatch({
        control,
        name: 'categoryId',
    })

    const characteristics = field.value as CharacteristicWithValues[]
    const setCharacteristics = (values: CharacteristicWithValues[]) => {
        form.setValue('characteristics', values)
    }

    useEffect(() => {
        if (categoryId) {
            form.setValue('characteristics', [])
        }
    }, [categoryId, form])

    if (!categoryId && withCategory !== false)
        return (
            <p className='text-muted-foreground'>
                Вам надо сначала выбрать категорию, что-бы выбрать
                характеристики.
            </p>
        )

    return (
        <div className='flex flex-col gap-2'>
            <CharacteristicsCombobox field={field} form={form} />
            <SelectedCharacteristicsTable
                characteristics={characteristics}
                setCharacteristics={setCharacteristics}
            />
            {(withCategory || categoryId) && (
                <SetDefaultCharacteristics
                    categoryId={categoryId}
                    setValues={setCharacteristics}
                />
            )}
        </div>
    )
}

function SelectedCharacteristicsTable({
    characteristics,
    setCharacteristics,
}: {
    characteristics: CharacteristicWithValues[]
    setCharacteristics: (values: CharacteristicWithValues[]) => void
}) {
    return (
        <div className='rounded-md border border-input'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-72'>Характеристика</TableHead>
                        <TableHead>Значения</TableHead>
                        <TableHead className='text-right'>
                            Убрать из списка
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {characteristics?.map((characteristic) => (
                        <SelectedCharacteristic
                            key={characteristic.id}
                            characteristic={characteristic}
                            setCharacteristics={setCharacteristics}
                            characteristics={characteristics}
                        />
                    ))}
                    {(!characteristics || characteristics.length === 0) && (
                        <TableRow>
                            <TableCell colSpan={3}>
                                <div className='flex items-center justify-center h-24'>
                                    <p className='text-muted-foreground'>
                                        Тут пока-что ничего нет...
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

function SelectedCharacteristic({
    characteristic,
    setCharacteristics,
    characteristics,
}: {
    characteristics: CharacteristicWithValues[]
    characteristic: CharacteristicWithValues
    setCharacteristics: (values: CharacteristicWithValues[]) => void
}) {
    const setSelectedValues = (newValues?: CharacteristicValue[]) => {
        const index = characteristics.findIndex(
            (obj) => obj.id === characteristic.id
        )
        const newArray = characteristics
        newArray[index].values = newValues ?? []
        setCharacteristics(newArray)
    }

    return (
        <TableRow>
            <TableCell>
                <span className='font-medium'>{characteristic.name}</span>
            </TableCell>
            <TableCell className='lg:w-96'>
                <CharacteristicValuesComboboxState
                    characteristicId={characteristic.id}
                    selectedValues={characteristic.values ?? []}
                    setSelectedValues={setSelectedValues}
                />
            </TableCell>
            <TableCell className='flex justify-end'>
                <div className='w-10'>
                    <RemoveCharacteristic
                        setCharacteristics={setCharacteristics}
                        id={characteristic.id}
                        characteristics={characteristics}
                    />
                </div>
            </TableCell>
        </TableRow>
    )
}

function RemoveCharacteristic({
    setCharacteristics,
    characteristics,
    id,
}: {
    id: string
    characteristics: CharacteristicWithValues[]
    setCharacteristics: (values: CharacteristicWithValues[]) => void
}) {
    const handleRemove = () => {
        setCharacteristics(characteristics.filter((obj) => obj.id !== id))
    }

    return (
        <Button
            size='icon'
            variant='destructive'
            type='button'
            onClick={handleRemove}
        >
            <X className='h-4 w-4' />
        </Button>
    )
}
