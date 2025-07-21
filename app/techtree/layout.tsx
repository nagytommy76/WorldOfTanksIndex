import { Metadata } from 'next'
import FlagLinks from '@/componentsTechtree/Header/FlagLinks'
import HeaderTitle from '@/componentsTechtree/Header/HeaderTitle'

export const metadata: Metadata = {
   keywords:
      "world of tanks tech tree, world of tanks premium vehicles, world of tanks collector's vehicles, world of tanks equipment, world of tanks crews, world of tanks crew, world of tanks field modifications",
}

export default async function layout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <section className={'h-screen'}>
         <HeaderTitle />
         <FlagLinks />
         {children}
      </section>
   )
}
