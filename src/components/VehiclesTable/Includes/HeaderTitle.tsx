'use client'
import { usePathname } from 'next/navigation'
import Typography from '@mui/material/Typography'

function TypeText({ children }: { children: React.ReactNode }) {
   return (
      <Typography variant='h2' className={'my-8 text-center text-amber-200 '}>
         {children}
      </Typography>
   )
}

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
   const vehicleType = pathname && pathname.split('/')[2]
   switch (vehicleType) {
      case 'techtree':
         return (
            <TypeText>
               Tech tree for {pathname && title[pathname.replace(`/vehicles/${vehicleType}/`, '')].title}
            </TypeText>
         )
      case 'premium':
         return (
            <TypeText>
               Premium vehicles of{' '}
               {pathname && title[pathname.replace(`/vehicles/${vehicleType}/`, '')].title}
            </TypeText>
         )
      case 'collectors':
         return (
            <TypeText>
               Collector vehicles of{' '}
               {pathname && title[pathname.replace(`/vehicles/${vehicleType}/`, '')].title}
            </TypeText>
         )
      case 'other':
         return (
            <TypeText>
               Supertest vehicles of{' '}
               {pathname && title[pathname.replace(`/vehicles/${vehicleType}/`, '')].title}
            </TypeText>
         )
      default:
         return null
   }
}
