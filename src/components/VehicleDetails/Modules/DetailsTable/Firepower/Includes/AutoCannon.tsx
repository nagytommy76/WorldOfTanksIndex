import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Typography from '@mui/material/Typography'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import TableRowComponent from '../../Includes/TableRow'

export default function AutoCannon({ reloadBetweenShells }: { reloadBetweenShells: number }) {
   const {
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { shells },
      },
   } = useContext(VehicleContext)
   const armorDamage = (shells[selectedModuleNames.shells]?.damage.armor as number) || 0

   return (
      <>
         <TableRow className='bg-gray-700 h-[20px]'>
            <TableCell>
               <Typography variant='body1'>Auto Cannon</Typography>
            </TableCell>
            <TableCell></TableCell>
         </TableRow>
         <TableRowComponent
            iconSrc='/icons/firepower/avgDamagePerMinute.png'
            titleText='Damage per Second'
            valueText={((1 / reloadBetweenShells) * armorDamage).toFixed(0)}
            unit='HP'
            paddingLeft
         />
      </>
   )
}
