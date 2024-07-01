import Import from '@/api/services/Import'
import { Form } from '../types'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { Input } from '@/components/ui/input'
import { Loader } from 'lucide-react'

type Props = {
    form: Form
}

const ACCEPTED_FILE_TYPES = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv',
]

export default function UploadImportFile({ form }: Props) {
    const { mutate, isPending } = Import.useUploadImportFile({
        onSuccess: (id) => {
            form.setValue('fileKey', id)
        },
        setErrorMessage: () => {
            form.setError('fileKey', {
                message: 'При загрузке вашего файла произошла ошибка',
            })
        },
    })

    function validateFile(file: File) {
        return ACCEPTED_FILE_TYPES.includes(file.type)
    }

    function handleFileUpload(file: File) {
        if (validateFile(file)) {
            mutate(file)
        }
    }

    return (
        <FormField
            control={form.control}
            name='fileKey'
            render={() => (
                <FormItem>
                    <FormLabelForRequiredFields text='Файл импорта' />
                    <FormControl>
                        <Input
                            type='file'
                            accept={ACCEPTED_FILE_TYPES.join(', ')}
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    handleFileUpload(file)
                                }
                            }}
                        />
                    </FormControl>
                    {isPending && (
                        <FormDescription>
                            <div className='flex items-center gap-1'>
                                <Loader className='h-4 w-4 animate-spin' />
                                Загрузка...
                            </div>
                        </FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
