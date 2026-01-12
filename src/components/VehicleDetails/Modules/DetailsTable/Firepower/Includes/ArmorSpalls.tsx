import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Typography from '@mui/material/Typography'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import TableRowComponent from '../../Includes/TableRow'

export default function ArmorSpalls() {
   const {
      vehicleReducer: {
         selectedModuleNames: { shells: selectedShell },
         moduleGroup: { shells },
      },
   } = useContext(VehicleContext)

   if (!shells[selectedShell]?.armorSpalls) return null

   const armorSpalls = shells[selectedShell]?.armorSpalls

   return (
      <>
         <TableRow className='bg-gray-700 h-[20px]'>
            <TableCell>
               <Typography variant='body1'>HE Explosion</Typography>
            </TableCell>
            <TableCell></TableCell>
         </TableRow>
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleHEShellDamageResistance.png'
            titleText='Explosion Radius'
            valueText={armorSpalls.impactRadius}
            unit='m'
            paddingLeft
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleRamOrExplosionDamageResistance.png'
            titleText='Damage to Armor'
            valueText={armorSpalls.damage.armor}
            unit='HP'
            paddingLeft
         />
         <TableRowComponent
            iconSrc='/icons/firepower/shellModuleDamage.png'
            titleText='Damage to Modules'
            valueText={armorSpalls.damage.devices}
            unit='HP'
            paddingLeft
         />
      </>
   )
}
