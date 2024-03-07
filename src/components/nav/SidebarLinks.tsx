import { cn } from '@/lib/utils'
import { Link, useRouteContext } from '@tanstack/react-router'
import {
  BookText,
  Factory,
  GitCompareArrows,
  Home,
  LibraryBig,
  PackagePlus,
  Store,
  Tags,
  Users,
  Warehouse,
} from 'lucide-react'
import React from 'react'

type Props = {
  isCollapsed?: boolean
}

export default function SidebarLinks({ isCollapsed }: Props) {
  return (
    <div>
      <Section>
        <SidebarLink
          Icon={Home}
          to='/'
          cashier={true}
          ecommerceManager={true}
          text='Главная'
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          Icon={Users}
          to='/employees'
          cashier={false}
          ecommerceManager={false}
          text='Сотрудники'
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          Icon={Store}
          to='/points-of-sale'
          cashier={false}
          ecommerceManager={false}
          text='Точки продаж'
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          Icon={Factory}
          to='/suppliers'
          cashier={true}
          ecommerceManager={true}
          text='Поставщики'
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          Icon={Warehouse}
          to='/warehouses'
          cashier={false}
          ecommerceManager={false}
          text='Склады'
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          Icon={PackagePlus}
          to='/goods-receipts'
          cashier={false}
          ecommerceManager={false}
          text='Приход товара'
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          Icon={LibraryBig}
          to='/categories'
          cashier={false}
          ecommerceManager={false}
          text='Категории товара'
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          Icon={LibraryBig}
          to='/category-groups'
          cashier={false}
          ecommerceManager={false}
          text='Группы категорий товара'
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          Icon={Tags}
          to='/products'
          cashier={false}
          ecommerceManager={false}
          text='Модели товара'
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          Icon={BookText}
          to='/inventory-adjustments'
          cashier={false}
          ecommerceManager={false}
          text='Инвентаризация'
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          Icon={GitCompareArrows}
          to='/inventory-transfers'
          cashier={false}
          ecommerceManager={false}
          text='Перемещение товара'
          isCollapsed={isCollapsed}
        />
      </Section>
    </div>
  )
}

function SidebarLink({
  text,
  Icon,
  to,
  cashier,
  ecommerceManager,
  isCollapsed,
}: {
  text: string
  Icon: React.ComponentType<{ className?: string }>
  to: string
  cashier: boolean
  ecommerceManager: boolean
  isCollapsed?: boolean
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
        className={cn(
          'flex gap-2 items-center rounded-lg transition-colors',
          isCollapsed ? 'h-9 w-9 justify-center' : 'px-3 py-2'
        )}
        onClick={handleClose}
      >
        <Icon className='h-4 w-4 shrink-0' />
        {!isCollapsed && <span>{text}</span>}
      </Link>
    )
  } else {
    return null
  }
}

function Section({ children }: { children: React.ReactNode }) {
  return <div className='p-3 flex flex-col gap-3'>{children}</div>
}
