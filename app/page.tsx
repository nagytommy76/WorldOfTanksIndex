import HeaderSection from '@/componentsMainPage/HeaderSection'
import PopularTanks from '@/componentsMainPage/PopularTanks'

import Typography from '@mui/material/Typography'

import FlagLinks from '@/componentsVehiclesTable/Includes/FlagLinks'

function HeaderText({ children }: { children: React.ReactNode }) {
   return (
      <Typography variant='h4' className='font-semibold text-center my-10 xl:text-5xl text-2xl'>
         {children}
      </Typography>
   )
}

export default function Home() {
   return (
      <section className='min-h-screen'>
         <HeaderSection />
         <PopularTanks />
         <section className='xl:min-h-[400px]'>
            <HeaderText>Explore more Tech Tree vehicles</HeaderText>
            <FlagLinks opacity={100} vehicleTypeProp={'techtree'} flagSize={85} />
            <HeaderText>
               Explore more <span className='text-amber-500'>Premium</span> Tanks!
            </HeaderText>
            <FlagLinks opacity={100} vehicleTypeProp={'premium'} flagSize={85} />
         </section>
      </section>
   )
}
