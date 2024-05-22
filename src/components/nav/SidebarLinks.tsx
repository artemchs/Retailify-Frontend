import { Link, useRouteContext } from '@tanstack/react-router'
import {
    BookText,
    Factory,
    GitCompareArrows,
    Home,
    Landmark,
    LayoutList,
    List,
    PackagePlus,
    Settings,
    Shapes,
    Store,
    Triangle,
    User,
    Users,
    Warehouse,
} from 'lucide-react'
import React from 'react'

export default function SidebarLinks() {
    return (
        <div>
            <Section>
                <SidebarLink
                    Icon={Home}
                    to='/'
                    cashier={true}
                    ecommerceManager={true}
                    text='Главная'
                />
            </Section>
            <Section>
                <SidebarLink
                    Icon={LayoutList}
                    to='/products'
                    cashier={false}
                    ecommerceManager={false}
                    text='Справочник товаров'
                />
                <SidebarLink
                    Icon={List}
                    to='/product-variants'
                    cashier={false}
                    ecommerceManager={false}
                    text='Список товаров'
                />
                <SidebarLink
                    Icon={Shapes}
                    to='/category-groups'
                    cashier={false}
                    ecommerceManager={false}
                    text='Группы категорий товара'
                />
                <SidebarLink
                    Icon={Triangle}
                    to='/categories'
                    cashier={false}
                    ecommerceManager={false}
                    text='Категории товара'
                />
            </Section>
            <Section>
                <SidebarLink
                    Icon={Factory}
                    to='/suppliers'
                    cashier={true}
                    ecommerceManager={true}
                    text='Поставщики'
                />
                <SidebarLink
                    Icon={Warehouse}
                    to='/warehouses'
                    cashier={false}
                    ecommerceManager={false}
                    text='Склады'
                />
                <SidebarLink
                    Icon={PackagePlus}
                    to='/goods-receipts'
                    cashier={false}
                    ecommerceManager={false}
                    text='Приход товара'
                />
                <SidebarLink
                    Icon={GitCompareArrows}
                    to='/inventory-transfers'
                    cashier={false}
                    ecommerceManager={false}
                    text='Перемещение товара'
                />
                <SidebarLink
                    Icon={BookText}
                    to='/inventory-adjustments'
                    cashier={false}
                    ecommerceManager={false}
                    text='Инвентаризация'
                />
            </Section>
            <Section>
                <SidebarLink
                    Icon={Landmark}
                    to='/financial-transactions'
                    cashier={false}
                    ecommerceManager={false}
                    text='Финансовые операции'
                />
                <SidebarLink
                    Icon={Store}
                    to='/points-of-sale'
                    cashier={false}
                    ecommerceManager={false}
                    text='Кассы'
                />
                <SidebarLink
                    Icon={Users}
                    to='/employees'
                    cashier={false}
                    ecommerceManager={false}
                    text='Сотрудники'
                />
            </Section>
            <Section>
                <SidebarLink
                    Icon={User}
                    to='/customers'
                    cashier={false}
                    ecommerceManager={false}
                    text='Клиенты'
                />
            </Section>
            <Section>
                <SidebarLink
                    Icon={Settings}
                    to='/settings'
                    cashier={true}
                    ecommerceManager={true}
                    text='Настройки'
                />
            </Section>
            <div className='h-20' />
        </div>
    )
}

function SidebarLink({
    text,
    Icon,
    to,
    cashier,
    ecommerceManager,
}: {
    text: string
    Icon: React.ComponentType<{ className?: string }>
    to: string
    cashier: boolean
    ecommerceManager: boolean
}) {
    const { user } = useRouteContext({ from: '/layout' })
    const handleClose = () => {
        const button = document.getElementById('sheet-close-button')
        if (button) {
            button.click()
        }
    }

    function canDisplay() {
        if (user?.role === 'ADMIN') {
            return true
        } else if (user?.role === 'CASHIER' && cashier) {
            return true
        } else if (user?.role === 'ECOMMERCE_MANAGER' && ecommerceManager) {
            return true
        } else {
            return false
        }
    }

    if (canDisplay()) {
        return (
            <Link
                to={to}
                activeProps={{
                    className: 'bg-primary text-white',
                }}
                inactiveProps={{
                    className: 'hover:bg-secondary',
                }}
                className='flex px-4 py-2 gap-2 items-center rounded-md transition-colors group-data-[state=closed]:w-10 group-data-[state=closed]:p-0 group-data-[state=closed]:h-10 group-data-[state=closed]:justify-center'
                onClick={handleClose}
            >
                <Icon className='h-4 w-4 shrink-0' />
                <span className='group-data-[state=closed]:hidden'>{text}</span>
            </Link>
        )
    } else {
        return null
    }
}

function Section({ children }: { children: React.ReactNode }) {
    return (
        <div className='p-2 flex flex-col gap-2 border-b border-input'>
            {children}
        </div>
    )
}
