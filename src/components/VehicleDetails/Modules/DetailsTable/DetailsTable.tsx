'use client'

import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'

import Firepower from './Firepower/Firepower'
import Mobility from './Mobility/Mobility'
import Survivability from './Survivability/Survivability'
import Other from './Other/Other'

export default function DetailsTable() {
   return (
      <section className='w-full'>
         <Typography variant='h5'>Tank specifications</Typography>
         <TableContainer component={Paper} className='min-h-1/2 grid grid-cols-2 grid-rows-2 gap-4'>
            <Firepower />
            <Mobility />
            <Survivability />
            <Other />
         </TableContainer>
      </section>
   )
}
