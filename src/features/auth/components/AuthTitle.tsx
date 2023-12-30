import Logo from '@/components/Logo'

export default function AuthTitle({ title }: { title: string }) {
  return (
    <div className='flex flex-col space-y-2 items-center'>
      <Logo color='foreground' />
      <h1 className='text-2xl font-semibold tracking-tight'>{title}</h1>
    </div>
  )
}
