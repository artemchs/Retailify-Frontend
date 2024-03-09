export function CurrencyFormatter({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const formattedValue = new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

  return <span className={className}>{formattedValue}</span>
}

export function DateFormatter({
  date,
  className,
  withPreciseTime,
}: {
  date: Date
  className?: string
  withPreciseTime?: boolean
}) {
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: withPreciseTime ? 'numeric' : undefined,
    minute: withPreciseTime ? 'numeric' : undefined,
  }).format(new Date(date))

  return <span className={className}>{formattedDate}</span>
}
