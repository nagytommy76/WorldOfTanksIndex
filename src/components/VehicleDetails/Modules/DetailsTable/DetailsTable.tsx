'use client'

import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'

import Firepower from './Includes/Firepower'

export default function DetailsTable() {
   return (
      <section className='w-full'>
         <Typography variant='h5'>Tank specifications</Typography>
         <TableContainer className='w-1/2' component={Paper}>
            <Firepower />
         </TableContainer>
      </section>
   )
}
