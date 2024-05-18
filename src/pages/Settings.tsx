import PageTitle from '@/components/ui/page-title'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import GeneralSettingsForm from '@/features/settings/components/general/GeneralSettingsForm'
import { useRouteContext } from '@tanstack/react-router'
import { ReactElement } from 'react'

const tabs: {
    name: string
    label: string
    onlyAdmin: boolean
    component: ReactElement
}[] = [
    {
        name: 'general',
        label: 'Общие',
        onlyAdmin: false,
        component: GeneralSettingsForm(),
    },
    {
        name: 'account',
        label: 'Аккаунт',
        onlyAdmin: false,
        component: <></>,
    },
    {
        name: 'password',
        label: 'Пароль',
        onlyAdmin: true,
        component: <></>,
    },
    {
        name: 'sole-proprietor-info',
        label: 'ФОП',
        onlyAdmin: true,
        component: <></>,
    },
]

export const Settings = () => {
    const { user } = useRouteContext({ from: '/layout/settings' })

    return (
        <>
            <PageTitle title='Настройки' />
            <Tabs defaultValue={tabs[0].name} className='w-full flex flex-col'>
                <TabsList className='flex w-full'>
                    {tabs.map(
                        ({ label, name, onlyAdmin }) =>
                            ((onlyAdmin && user?.role === 'ADMIN') ||
                                !onlyAdmin) && (
                                <TabsTrigger
                                    value={name}
                                    className='flex w-full'
                                >
                                    {label}
                                </TabsTrigger>
                            )
                    )}
                </TabsList>
                {tabs.map(
                    ({ name, onlyAdmin, component }) =>
                        ((onlyAdmin && user?.role === 'ADMIN') ||
                            !onlyAdmin) && (
                            <TabsContent value={name}>{component}</TabsContent>
                        )
                )}
            </Tabs>
        </>
    )
}
