'use client'

import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'

import Firepower from './Includes/Firepower'
import Mobility from './Mobility/Mobility'

export default function DetailsTable() {
   return (
      <section className='w-full'>
         <Typography variant='h5'>Tank specifications</Typography>
         <TableContainer className='w-2/5' component={Paper}>
            <Firepower />
            <Mobility />
         </TableContainer>
      </section>
   )
}
