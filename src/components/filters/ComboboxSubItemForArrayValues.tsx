import { CheckIcon } from 'lucide-react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../ui/command'
import {
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '../ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { FilterOptions } from '@/types/FilterOptions'

type Props = {
    title: string
    options: FilterOptions
    values: string[]
    setValues(values: string[]): void
}

export default function ComboboxSubItemForArrayValues({
    title,
    options,
    values,
    setValues,
}: Props) {
    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>{title}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className='p-0 w-36 lg:w-auto'>
                <Command>
                    <CommandInput
                        placeholder={title}
                        autoFocus={true}
                        className='h-9'
                    />
                    <CommandList>
                        <CommandEmpty>Нет результатов.</CommandEmpty>
                        <CommandGroup>
                            {options.map(({ label }) => {
                                const value = options.find(
                                    (obj) => obj.label === label
                                )?.value as string

                                return (
                                    <CommandItem
                                        key={value}
                                        value={value}
                                        onSelect={(value) => {
                                            if (
                                                values.includes(
                                                    value.toUpperCase()
                                                )
                                            ) {
                                                setValues(
                                                    values.filter(
                                                        (val) =>
                                                            val !==
                                                            value.toUpperCase()
                                                    )
                                                )
                                            } else {
                                                setValues([
                                                    ...values,
                                                    value.toUpperCase(),
                                                ])
                                            }
                                        }}
                                    >
                                        {label}
                                        <CheckIcon
                                            className={cn(
                                                'ml-auto h-4 w-4 shrink-0',
                                                values.includes(value)
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    )
}
