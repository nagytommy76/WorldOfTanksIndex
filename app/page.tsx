import HeaderSection from '@/componentsMainPage/HeaderSection'
import PopularTanks from '@/componentsMainPage/PopularTanks'

import Typography from '@mui/material/Typography'

export default function Home() {
   return (
      <section className='min-h-screen'>
         <HeaderSection />
         <PopularTanks />
         <Typography variant='h4' className='font-semibold text-center mt-10'>
            Explore more vehicles
         </Typography>
      </section>
   )
}
