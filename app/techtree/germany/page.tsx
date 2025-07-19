import Typography from '@mui/material/Typography'

import FlagLinks from '@/TechtreeFlagLinks'

export default function page() {
   return (
      <section className={'h-screen'}>
         <Typography variant='h2' className={'my-8 text-center text-amber-200 '}>
            Tech tree for Germany
         </Typography>
         <FlagLinks />
      </section>
   )
}
