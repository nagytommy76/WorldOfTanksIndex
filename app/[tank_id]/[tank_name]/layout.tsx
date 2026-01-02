import Header from '@/VehicleDetails/Header/Header'
import TabsProvider from '@/Providers/TabsProvider'

export default async function layout({
   children,
   params,
}: Readonly<{
   children: React.ReactNode
   params: Promise<{ tank_id: string; tank_name: string }>
}>) {
   const { tank_id, tank_name } = await params
   return (
      <section className='min-h-screen max-w-[1650px] mx-auto px-3 xl:px-5 my-10'>
         <Header tank_name={tank_name} tank_id={tank_id} />
         <TabsProvider baseHref={`/${tank_id}/${tank_name}`} />
         {children}
      </section>
   )
}
