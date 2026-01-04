'use client'
import type { IClip, IDualAccuracy } from '@/types/VehicleDetails/Guns'
import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import returnDPM from './Includes/helper'

import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import TableHeadComponent from '../Includes/TableHead'
import TableRowComponent from '../Includes/TableRow'

import Penetration from './Includes/Penetration'
import Damage from './Includes/Damage'
import Clip from './Includes/Clip'
import DualAccuracy from './Includes/DualAccuracy'

export default function Firepower() {
   const {
      vehicleName,
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleChassis, vehicleGun, shells },
      },
   } = useContext(VehicleContext)
   const gunDepression = -vehicleGun[selectedModuleNames.vehicleGun]?.elevationLimits.depression[1] || 0
   const gunElevation = -vehicleGun[selectedModuleNames.vehicleGun]?.elevationLimits.elevation[1] || 0

   const clipDamage =
      (vehicleGun[selectedModuleNames.vehicleGun]?.clip?.count as number) *
         shells[selectedModuleNames.shells]?.damage.armor || 0

   const reloadBetweenShells = 60 / (vehicleGun[selectedModuleNames.vehicleGun]?.clip?.rate as number) || 0

   const totalReloadTime =
      ((vehicleGun[selectedModuleNames.vehicleGun]?.clip?.count as number) - 1) * reloadBetweenShells +
         vehicleGun[selectedModuleNames.vehicleGun]?.reloadTime || 0

   return (
      <Table size='small' aria-label='Firepower table with average damage and penetration'>
         <TableHeadComponent headTitle='Firepower' iconSrc='/icons/details/firepower.png' />
         <TableBody>
            <Damage damage={shells[selectedModuleNames.shells]?.damage.armor as number} />
            <Penetration
               piercingPower={(shells[selectedModuleNames.shells]?.piercingPower as number[]) || [0, 0]}
            />
            {vehicleGun[selectedModuleNames.vehicleGun]?.clip ? (
               <TableRowComponent
                  iconSrc='/icons/firepower/reloadTime.png'
                  titleText='Rate of Fire'
                  valueText={(
                     (60 / totalReloadTime) *
                     (vehicleGun[selectedModuleNames.vehicleGun]?.clip?.count as number)
                  ).toFixed(2)}
                  unit='rounds/min'
               />
            ) : (
               <TableRowComponent
                  iconSrc='/icons/firepower/reloadTime.png'
                  titleText='Rate of Fire'
                  valueText={(60 / vehicleGun[selectedModuleNames.vehicleGun]?.reloadTime).toFixed(2)}
                  unit='rounds/min'
               />
            )}

            <TableRowComponent
               iconSrc='/icons/firepower/avgDamagePerMinute.png'
               titleText='Average Damage per Minute'
               valueText={
                  returnDPM(
                     vehicleGun[selectedModuleNames.vehicleGun]?.reloadTime,
                     shells[selectedModuleNames.shells]?.damage.armor,
                     vehicleGun[selectedModuleNames.vehicleGun]?.clip,
                     reloadBetweenShells,
                     clipDamage,
                     vehicleGun[selectedModuleNames.vehicleGun]?.autoreload?.reloadTime || []
                  ).toFixed(0) || 0
               }
               unit='HP/min'
            />
            <TableRowComponent
               iconSrc='/icons/firepower/reloadTimeSecs.png'
               titleText='Gun Loading'
               valueText={vehicleGun[selectedModuleNames.vehicleGun]?.reloadTime}
               unit='s'
            />
            {vehicleGun[selectedModuleNames.vehicleGun]?.autoreload?.reloadTime && (
               <TableRowComponent
                  iconSrc='/icons/firepower/autoReloadTime.png'
                  titleText='Autoreloading One Shell'
                  valueText={`
                     ${vehicleGun[selectedModuleNames.vehicleGun].autoreload?.reloadTime[2]} /
                     ${vehicleGun[selectedModuleNames.vehicleGun].autoreload?.reloadTime[1]} /
                     ${vehicleGun[selectedModuleNames.vehicleGun].autoreload?.reloadTime[0]}

                  `}
                  unit='s'
               />
            )}
            <TableRowComponent
               iconSrc='/icons/firepower/aimingTime.png'
               titleText='Aiming Time'
               valueText={vehicleGun[selectedModuleNames.vehicleGun]?.aimTime.toFixed(2)}
               unit='s'
            />
            {vehicleName === 'F136_AMX_67_Imbattable' && (
               <TableRowComponent
                  iconSrc='/icons/firepower/extraShotClipReloadTime.png'
                  titleText='Reload Penalty'
                  valueText={
                     vehicleGun[selectedModuleNames.vehicleGun]?.mechanics?.extraShotClip?.extraReloadTime ||
                     0
                  }
                  unit='s'
               />
            )}
            {vehicleGun[selectedModuleNames.vehicleGun]?.burst && (
               <>
                  <TableRowComponent
                     iconSrc='/icons/firepower/chargeableBurstSize.png'
                     titleText='Shells in the Burst'
                     valueText={vehicleGun[selectedModuleNames.vehicleGun]?.burst?.count || 0}
                     unit='rounds'
                  />
               </>
            )}
            {vehicleGun[selectedModuleNames.vehicleGun]?.clip && (
               <Clip
                  reloadBetweenShells={reloadBetweenShells}
                  clipDamage={clipDamage}
                  clip={vehicleGun[selectedModuleNames.vehicleGun]?.clip as IClip}
               />
            )}
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
            {vehicleGun[selectedModuleNames.vehicleGun]?.dualAccuracy && (
               <DualAccuracy
                  dualAccuracy={vehicleGun[selectedModuleNames.vehicleGun]?.dualAccuracy as IDualAccuracy}
                  reloadTime={vehicleGun[selectedModuleNames.vehicleGun]?.reloadTime}
               />
            )}
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
               iconSrc='/icons/firepower/caliber.png'
               titleText='Caliber'
               valueText={shells[selectedModuleNames.shells]?.caliber}
               unit='mm'
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
