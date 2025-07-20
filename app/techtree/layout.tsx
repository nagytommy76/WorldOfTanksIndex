import FlagLinks from '@/componentsTechtree/Header/FlagLinks'
import HeaderTitle from '@/componentsTechtree/Header/HeaderTitle'

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
