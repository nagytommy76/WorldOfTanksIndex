import { Metadata } from 'next'

import FlagLinks from '@/componentsTechtree/Header/FlagLinks'
import HeaderTitle from '@/componentsTechtree/Header/HeaderTitle'
import TierList from '@/componentsTechtree/Header/TierList'

export const metadata: Metadata = {
   keywords: [
      'world of tanks tech tree',
      'world of tanks premium vehicles',
      "world of tanks collector's vehicles",
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
         <TierList />
         {children}
      </section>
   )
}
