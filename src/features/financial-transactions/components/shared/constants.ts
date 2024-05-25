export const financialTransactionTypes = [
    {
        label: 'Снятие денег из кассы',
        value: 'CASH_REGISTER_WITHDRAWAL',
        direction: 'CREDIT',
    },
    {
        label: 'Оплата заказа',
        value: 'ORDER_PAYMENT',
        direction: 'DEBIT',
    },
    {
        label: 'Возврат заказа',
        value: 'ORDER_REFUND',
        direction: 'CREDIT',
    },
    {
        label: 'Оплата поставщику',
        value: 'SUPPLIER_PAYMENT',
        direction: 'CREDIT',
    },
    {
        label: 'Выплата зарплаты',
        value: 'SALARY_PAYMENT',
        direction: 'CREDIT',
    },
    {
        label: 'Внесение денег в кассу',
        value: 'CASH_REGISTER_DEPOSIT',
        direction: 'DEBIT',
    },
    {
        label: 'Другое',
        value: 'OTHER',
        direction: 'CREDIT',
    },
]

export const financialTransactionDirections = [
    {
        label: 'Кредит',
        value: 'CREDIT',
    },
    {
        label: 'Дебет',
        value: 'DEBIT',
    },
]
