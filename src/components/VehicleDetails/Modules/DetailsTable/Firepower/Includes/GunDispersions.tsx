import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Typography from '@mui/material/Typography'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import TableRowComponent from '../../Includes/TableRow'

export default function GunDispersions() {
   const {
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleGun, vehicleChassis },
      },
   } = useContext(VehicleContext)

   return (
      <>
         <TableRow className='bg-gray-700 h-[20px]'>
            <TableCell>
               <Typography variant='body1'>Gun Dispersions</Typography>
            </TableCell>
            <TableCell></TableCell>
         </TableRow>
         <TableRowComponent
            iconSrc='/icons/firepower/shotDispersionAngle.png'
            titleText='Accuracy At 100 m'
            valueText={vehicleGun[selectedModuleNames.vehicleGun]?.accuracy}
            unit='m'
            paddingLeft
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionChassisMovement.png'
            titleText='Moving'
            valueText={vehicleChassis[selectedModuleNames.vehicleChassis]?.dispersion.vehicleMovement}
            unit='m'
            paddingLeft
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionChassisRotation.png'
            titleText='Tank traverse'
            valueText={'+ ' + vehicleChassis[selectedModuleNames.vehicleChassis]?.dispersion.vehicleRotation}
            unit='m'
            paddingLeft
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionTurretRotation.png'
            titleText='Turret traverse'
            valueText={'+ ' + vehicleGun[selectedModuleNames.vehicleGun]?.dispersion.turretRotation}
            unit='m'
            paddingLeft
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionAfterShot.png'
            titleText='After firing'
            valueText={'* ' + vehicleGun[selectedModuleNames.vehicleGun]?.dispersion.afterShot}
            unit=''
            paddingLeft
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionWhileGunDamaged.png'
            titleText='While damaged'
            valueText={'+ ' + vehicleGun[selectedModuleNames.vehicleGun]?.dispersion.whileDamaged}
            unit='m'
            paddingLeft
         />
      </>
   )
}
