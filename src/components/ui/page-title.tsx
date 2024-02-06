export default function PageTitle({ title }: { title: string }) {
  return (
    <h1 className='scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl'>
      {title}
    </h1>
  )
}
