import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    EditSoleProprietorInfoCurrentAccountSchema,
    editSoleProprietorInfoSchema,
} from './edit-sole-proprietor-info-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useState } from 'react'
import SoleProprietorInformation from '@/api/services/SoleProprietorInfo'
import { AlertDestructive } from '@/components/AlertDestructive'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import SaveButton from '@/components/forms/SaveButton'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { SoleProprietorInfo } from '@/types/entities/SoleProprietorInfo'

export default function SoleProprietorInfoSettingsForm() {
    const { data, isLoading, isError } = SoleProprietorInformation.useFindOne()

    return (
        <div className='flex flex-col gap-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Фізична особа-підприємець</CardTitle>
                    <CardDescription>
                        Редактировать данные о ФОПе.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        'загрузка...'
                    ) : isError ? (
                        'ошибка'
                    ) : (
                        <SoleProprietorForm data={data} />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

const SoleProprietorForm = ({ data }: { data?: SoleProprietorInfo }) => {
    const form = useForm<z.infer<typeof editSoleProprietorInfoSchema>>({
        resolver: zodResolver(editSoleProprietorInfoSchema),
        defaultValues: {
            currentAccounts: data?.currentAccounts.map((obj) => ({
                iban: obj.iban,
                id: obj.id,
                name: obj.name,
                uuid: uuidv4(),
            })),
            tin: data?.tin ?? undefined,
        },
    })

    function onSuccess() {
        toast('Данные о ФОПе успешно отредактированы.', {
            cancel: {
                label: 'Ок',
                onClick() {
                    toast.dismiss
                },
            },
        })
    }

    const [errorMessage, setErrorMessage] = useState('')
    const { mutate, isPending } = SoleProprietorInformation.useEdit({
        setErrorMessage,
        onSuccess,
    })

    function onSubmit(values: z.infer<typeof editSoleProprietorInfoSchema>) {
        mutate({
            body: {
                ...values,
                currentAccounts: values.currentAccounts?.map((obj) => ({
                    iban: obj.iban,
                    name: obj.name,
                    id: obj.id,
                })),
            },
        })
    }

    return (
        <div className='w-full flex flex-col gap-4'>
            {errorMessage && errorMessage.length >= 1 && (
                <AlertDestructive text={errorMessage} />
            )}
            <Form {...form}>
                <form className='flex flex-col gap-4'>
                    <FormField
                        control={form.control}
                        name='tin'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ИНН:</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Ваш идентификационный номер налогоплательщика'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='currentAccounts'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Расчетные счета:</FormLabel>
                                <FormControl>
                                    <CurrentAccountsTable
                                        currentAccounts={field.value ?? []}
                                        setCurrentAccounts={(newValues) =>
                                            form.setValue(
                                                'currentAccounts',
                                                newValues
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SaveButton
                        isPending={isPending}
                        form={form}
                        onSubmit={onSubmit}
                    />
                </form>
            </Form>
        </div>
    )
}

const CurrentAccountsTable = ({
    currentAccounts,
    setCurrentAccounts,
}: {
    currentAccounts: EditSoleProprietorInfoCurrentAccountSchema[]
    setCurrentAccounts: (
        newValues: EditSoleProprietorInfoCurrentAccountSchema[]
    ) => void
}) => {
    const handleInputChange = (
        index: number,
        field: keyof EditSoleProprietorInfoCurrentAccountSchema,
        value: string
    ) => {
        const newValues = [...currentAccounts]
        newValues[index] = { ...newValues[index], [field]: value }
        setCurrentAccounts(newValues)
    }

    const handleAddAccount = () => {
        if (
            !currentAccounts ||
            currentAccounts.length === 0 ||
            currentAccounts.at(-1)?.iban !== ''
        ) {
            const newValues = [
                ...currentAccounts,
                { iban: '', name: '', uuid: uuidv4() },
            ]
            setCurrentAccounts(newValues)
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>IBAN</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {currentAccounts?.map(({ iban, name, uuid }, i) => (
                    <TableRow key={uuid} className='hover:bg-background'>
                        <TableCell>
                            <Input
                                value={name}
                                onChange={(e) =>
                                    handleInputChange(i, 'name', e.target.value)
                                }
                            />
                        </TableCell>
                        <TableCell>
                            <Input
                                value={iban}
                                onChange={(e) =>
                                    handleInputChange(i, 'iban', e.target.value)
                                }
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>
                        <div className='flex justify-center items-center'>
                            <Button
                                variant='outline'
                                type='button'
                                size='sm'
                                onClick={handleAddAccount}
                            >
                                <Plus className='h-4 w-4 mr-2' />
                                Добавить расчетный счет
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
