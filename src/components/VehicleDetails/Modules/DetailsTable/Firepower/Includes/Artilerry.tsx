import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Typography from '@mui/material/Typography'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import TableRowComponent from '../../Includes/TableRow'

export default function Artilerry() {
   const {
      vehicleReducer: {
         selectedModuleNames: { shells: selectedShell },
         moduleGroup: { shells },
      },
   } = useContext(VehicleContext)

   if (!shells[selectedShell]?.hasStun) return null
   const stunDuration = shells[selectedShell].stunDuration as number
   const guaranteedStunDuration = shells[selectedShell].guaranteedStunDuration as number

   return (
      <>
         <TableRow className='bg-gray-700 h-[20px]'>
            <TableCell>
               <Typography variant='body1'>Artillery</Typography>
            </TableCell>
            <TableCell></TableCell>
         </TableRow>
         <TableRowComponent
            iconSrc='/icons/firepower/stunMinDuration.png'
            titleText='Minimum Stun Duration'
            valueText={(stunDuration * guaranteedStunDuration).toFixed(2)}
            unit='s'
            paddingLeft
         />
         <TableRowComponent
            iconSrc='/icons/firepower/stunMaxDuration.png'
            titleText='Maximum Stun Duration'
            valueText={stunDuration}
            unit='s'
            paddingLeft
         />
      </>
   )
}
