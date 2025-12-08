import { Metadata } from 'next'
import HeaderTitle from '@/componentsVehiclesTable/Includes/HeaderTitle'
import FlagLinks from '@/componentsVehiclesTable/Includes/FlagLinks'

export const metadata: Metadata = {
   keywords: [
      'world of tanks tech tree',
      'world of tanks equipment',
      'world of tanks crews',
      'world of tanks crew',
      'world of tanks field modifications',
      'WoT Index page',
   ],
}

export default async function layout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <section className={'min-h-screen'}>
         <HeaderTitle />
         <FlagLinks />
         {children}
      </section>
   )
}
