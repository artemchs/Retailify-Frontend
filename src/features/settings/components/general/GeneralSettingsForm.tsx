import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

const GeneralSettingsForm = () => {
    return (
        <div className='flex flex-col gap-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Внешний вид</CardTitle>
                    <CardDescription>
                        Вы можете поменять внешний вид системы учета
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SelectColorModeRadioGroup />
                </CardContent>
            </Card>
        </div>
    )
}

const LightModePreview = ({ isSelected }: { isSelected: boolean }) => (
    <div
        className={cn(
            'justify-items-center h-40 w-full flex rounded-md border-2 border-muted p-1 cursor-pointer',
            isSelected && 'border-primary'
        )}
    >
        <div className='space-y-2 rounded-sm flex flex-col justify-center bg-[#ecedef] p-2 w-full'>
            <div className='space-y-2 rounded-md bg-white p-2 shadow-sm'>
                <div className='h-2 w-[60%] rounded-lg bg-[#ecedef]' />
                <div className='h-2 w-[80%] rounded-lg bg-[#ecedef]' />
            </div>
            <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
                <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
                <div className='h-2 w-[60%] rounded-lg bg-[#ecedef]' />
            </div>
            <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
                <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
                <div className='h-2 w-[50%] rounded-lg bg-[#ecedef]' />
            </div>
        </div>
    </div>
)

const DarkModePreview = ({ isSelected }: { isSelected: boolean }) => (
    <div
        className={cn(
            'justify-items-center h-40 w-full flex rounded-md border-2 border-muted p-1 cursor-pointer',
            isSelected && 'border-primary'
        )}
    >
        <div className='space-y-2 rounded-sm flex flex-col justify-center bg-slate-950 p-2 w-full'>
            <div className='space-y-2 rounded-md bg-slate-800 p-2 shadow-sm'>
                <div className='h-2 w-[60%] rounded-lg bg-slate-400' />
                <div className='h-2 w-[80%] rounded-lg bg-slate-400' />
            </div>
            <div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm'>
                <div className='h-4 w-4 rounded-full bg-slate-400' />
                <div className='h-2 w-[60%] rounded-lg bg-slate-400' />
            </div>
            <div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm'>
                <div className='h-4 w-4 rounded-full bg-slate-400' />
                <div className='h-2 w-[50%] rounded-lg bg-slate-400' />
            </div>
        </div>
    </div>
)

const AutoModePreview = ({ isSelected }: { isSelected: boolean }) => (
    <div
        className={cn(
            'justify-center items-center h-40 w-full flex rounded-md border-2 border-muted p-1 cursor-pointer',
            isSelected && 'border-primary'
        )}
    >
        <div className='relative flex w-full h-full'>
            <div className='space-y-2 rounded-sm flex flex-col justify-center bg-[#ecedef] p-2 w-full'>
                <div className='space-y-2 rounded-md bg-white p-2 shadow-sm'>
                    <div className='h-2 w-[60%] rounded-lg bg-[#ecedef]' />
                    <div className='h-2 w-[80%] rounded-lg bg-[#ecedef]' />
                </div>
                <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
                    <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
                    <div className='h-2 w-[60%] rounded-lg bg-[#ecedef]' />
                </div>
                <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
                    <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
                    <div className='h-2 w-[50%] rounded-lg bg-[#ecedef]' />
                </div>
            </div>
            <div className='absolute inset-0 clip-triangle space-y-2 rounded-sm flex flex-col justify-center bg-slate-950 p-2 w-full'>
                <div className='space-y-2 rounded-md bg-slate-800 p-2 shadow-sm'>
                    <div className='h-2 w-[60%] rounded-lg bg-slate-400' />
                    <div className='h-2 w-[80%] rounded-lg bg-slate-400' />
                </div>
                <div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm'>
                    <div className='h-4 w-4 rounded-full bg-slate-400' />
                    <div className='h-2 w-[60%] rounded-lg bg-slate-400' />
                </div>
                <div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm'>
                    <div className='h-4 w-4 rounded-full bg-slate-400' />
                    <div className='h-2 w-[50%] rounded-lg bg-slate-400' />
                </div>
            </div>
        </div>
    </div>
)

const SelectColorModeRadioGroup = () => {
    const { setTheme, theme } = useTheme()

    return (
        <RadioGroup
            defaultValue={theme}
            onValueChange={(value: 'dark' | 'light' | 'system') =>
                setTheme(value)
            }
            className='flex flex-col lg:flex-row gap-4'
        >
            <div className='flex items-center space-x-2 w-full'>
                <RadioGroupItem value='light' id='light' className='hidden' />
                <Label htmlFor='light' className='flex w-full'>
                    <div className='flex flex-col gap-2 items-center w-full'>
                        <LightModePreview isSelected={theme === 'light'} />
                        <span>Светлая</span>
                    </div>
                </Label>
            </div>
            <div className='flex items-center space-x-2 w-full'>
                <RadioGroupItem value='dark' id='dark' className='hidden' />
                <Label htmlFor='dark' className='flex w-full'>
                    <div className='flex flex-col gap-2 items-center w-full'>
                        <DarkModePreview isSelected={theme === 'dark'} />
                        <span>Темная</span>
                    </div>
                </Label>
            </div>
            <div className='flex items-center space-x-2 w-full'>
                <RadioGroupItem value='system' id='system' className='hidden' />
                <Label htmlFor='system' className='flex w-full'>
                    <div className='flex flex-col gap-2 items-center w-full'>
                        <AutoModePreview isSelected={theme === 'system'} />
                        <span>Системная</span>
                    </div>
                </Label>
            </div>
        </RadioGroup>
    )
}

export default GeneralSettingsForm
