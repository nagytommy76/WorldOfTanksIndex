'use client'
import { usePathname } from 'next/navigation'
import Typography from '@mui/material/Typography'

export default function HeaderTitle() {
   const pathname = usePathname()

   const title: Record<string, { title: string }> = {
      germany: { title: 'Germany' },
      ussr: { title: 'U.S.S.R.' },
      usa: { title: 'U.S.A.' },
      france: { title: 'France' },
      uk: { title: 'U.K.' },
      china: { title: 'China' },
      japan: { title: 'Japan' },
      czech: { title: 'Czechoslovakia' },
      poland: { title: 'Poland' },
      sweden: { title: 'Sweden' },
      italy: { title: 'Italy' },
   }

   return (
      <Typography variant='h2' className={'my-8 text-center text-amber-200 '}>
         Tech tree for {pathname && title[pathname.replace('/techtree/', '')].title}
      </Typography>
   )
}
