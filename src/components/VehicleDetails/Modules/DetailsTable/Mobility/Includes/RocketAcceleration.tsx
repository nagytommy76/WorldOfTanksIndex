import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Typography from '@mui/material/Typography'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import TableRowComponent from '../../Includes/TableRow'

export default function RocketAcceleration() {
   const { rocketAcceleration } = useContext(VehicleContext)

   if (!rocketAcceleration) return null

   return (
      <>
         <TableRow className='bg-amber-700 h-[20px]'>
            <TableCell>
               <Typography variant='body1'>Rocket Acceleration</Typography>
            </TableCell>
            <TableCell></TableCell>
         </TableRow>
         <TableRowComponent
            iconSrc='/icons/mobility/rocketAccelerationReuseAndDuration.png'
            titleText='Booster Amount'
            valueText={rocketAcceleration.reuseCount}
            unit='boosters'
            paddingLeft
         />
         <TableRowComponent
            iconSrc='/icons/mobility/rocketAccelerationEnginePower.png'
            titleText='Booster Duration / Reload Time'
            valueText={rocketAcceleration.duration + ' / ' + rocketAcceleration.reloadTime}
            unit='s'
            paddingLeft
         />
      </>
   )
}
