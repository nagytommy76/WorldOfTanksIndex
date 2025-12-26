'use client'
import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import TableHeadComponent from '../Includes/TableHead'
import TableRowComponent from '../Includes/TableRow'

export default function Firepower() {
   const {
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleChassis, vehicleGun, shells },
      },
   } = useContext(VehicleContext)
   const gunDepression = -vehicleGun[selectedModuleNames.vehicleGun]?.elevationLimits.depression[1] || 0
   const gunElevation = -vehicleGun[selectedModuleNames.vehicleGun]?.elevationLimits.elevation[1] || 0

   return (
      <Table size='small' aria-label='Firepower table with average damage and penetration'>
         <TableHeadComponent headTitle='Firepower' iconSrc='/icons/details/firepower.png' />
         <TableBody>
            <TableRowComponent
               iconSrc='/icons/firepower/avgDamage.png'
               titleText='Average Damage'
               valueText={shells[selectedModuleNames.shells]?.damage.armor}
               unit='HP'
            />
            <TableRowComponent
               iconSrc='/icons/firepower/avgPiercingPower.png'
               titleText='Average Penetration (at 50/500 m)'
               valueText={`
                  ${shells[selectedModuleNames.shells]?.piercingPower[0]} /
                  ${shells[selectedModuleNames.shells]?.piercingPower[1]}
               `}
               unit='mm'
            />
            <TableRowComponent
               iconSrc='/icons/firepower/reloadTime.png'
               titleText='Rate of Fire'
               valueText={(60 / vehicleGun[selectedModuleNames.vehicleGun]?.reloadTime).toFixed(2)}
               unit='rounds/min'
            />
            <TableRowComponent
               iconSrc='/icons/firepower/avgDamagePerMinute.png'
               titleText='Average Damage per Minute'
               valueText={(
                  (60 / vehicleGun[selectedModuleNames.vehicleGun]?.reloadTime) *
                  shells[selectedModuleNames.shells]?.damage.armor
               ).toFixed(0)}
               unit='HP/min'
            />
            <TableRowComponent
               iconSrc='/icons/firepower/reloadTimeSecs.png'
               titleText='Gun Loading'
               valueText={vehicleGun[selectedModuleNames.vehicleGun]?.reloadTime}
               unit='s'
            />
            <TableRowComponent
               iconSrc='/icons/firepower/aimingTime.png'
               titleText='Aiming Time'
               valueText={vehicleGun[selectedModuleNames.vehicleGun]?.aimTime.toFixed(2)}
               unit='s'
            />
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
               valueText={
                  '+ ' + vehicleChassis[selectedModuleNames.vehicleChassis]?.dispersion.vehicleRotation
               }
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
            <TableRowComponent
               iconSrc='/icons/firepower/pitchLimits.png'
               titleText='Gun depression'
               valueText={gunDepression}
               unit='°'
            />
            <TableRowComponent
               iconSrc='/icons/firepower/pitchLimits.png'
               titleText='Gun elevation'
               valueText={gunElevation}
               unit='°'
            />
            <TableRowComponent
               iconSrc='/icons/firepower/shellModuleDamage.png'
               titleText='Module damage'
               valueText={shells[selectedModuleNames.shells]?.damage.devices}
               unit='hp'
            />
            <TableRowComponent
               iconSrc='/icons/firepower/shellVelocity.png'
               titleText='Shell velocity'
               valueText={shells[selectedModuleNames.shells]?.speed}
               unit='m/s'
            />
            <TableRowComponent
               iconSrc='/icons/firepower/maxRange.png'
               titleText='Max range'
               valueText={shells[selectedModuleNames.shells]?.maxDistance}
               unit='m'
            />
         </TableBody>
      </Table>
   )
}
