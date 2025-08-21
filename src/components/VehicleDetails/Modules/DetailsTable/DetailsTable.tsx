'use client'
import { useContext } from 'react'
import { DetailsContext } from '@/DetailsContext/DetailsContext'

import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export default function DetailsTable() {
   const {
      vehicleProfileReducer: { vehicleProfile },
   } = useContext(DetailsContext)
   if (!vehicleProfile) return null

   return (
      <section className='w-full'>
         <Typography variant='h5'>Tank specifications</Typography>
         <TableContainer className='w-1/2' component={Paper}>
            <Table aria-label='simple table'>
               <TableHead>
                  <TableRow>
                     <TableCell>Firepower</TableCell>
                     <TableCell align='right'>icon</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  <TableRow key={'s'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                     <TableCell component='th' scope='row'>
                        <Typography variant='caption'>Average Damage</Typography>
                     </TableCell>
                     <TableCell align='right'>
                        <Typography variant='caption'>{vehicleProfile.ammo[0]?.damage[1]} HP</Typography>
                     </TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </TableContainer>
      </section>
   )
}
