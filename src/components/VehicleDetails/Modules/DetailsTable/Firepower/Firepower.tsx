'use client'
import { useContext, useMemo } from 'react'
import type { IClip, IDualAccuracy } from '@/types/VehicleDetails/Guns'

import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'
import { CrewContext } from '@/CrewContext/CrewContext'

import applyStatPipeline from '@/utils/applyStatPipeline'
import createCrewTransformer from '@/utils/ApplyCrewModifiers'
import { createDeviceTransformer } from '@/utils/ApplyModifiers'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableHeadComponent from '../Includes/TableHead'
import TableRowComponent from '../Includes/TableRow'

import Penetration from './Includes/Penetration'
import Damage from './Includes/Damage'
import Clip from './Includes/Clip'
import DualAccuracy from './Includes/DualAccuracy'
import AvgDpm from './Includes/AvgDpm'
import RoF from './Includes/RoF'
import Artilerry from './Includes/Artilerry'
import GunDispersions from './Includes/GunDispersions'
import ArmorSpalls from './Includes/ArmorSpalls'
import AutoCannon from './Includes/AutoCannon'

export default function Firepower() {
   const {
      vehicleName,
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleGun, shells },
      },
      modifiersReducer: {
         modifiers: { shells: shellsModifiers },
      },
   } = useContext(VehicleContext)
   const {
      deviceReducer: { appliedDevicesModifiers },
   } = useContext(DeviceContext)
   const {
      crewReducer: { crewMembers },
   } = useContext(CrewContext)

   const clipDamage =
      (vehicleGun[selectedModuleNames.vehicleGun].clip?.count as number) *
         (shells[selectedModuleNames.shells].damage.armor as number) || 0

   const reloadBetweenShells = 60 / (vehicleGun[selectedModuleNames.vehicleGun].clip?.rate as number) || 0

   // Reload: 7.8 * 0.875 / (0.00375 * 110 + 0.5) = 7.8 * 0.875 / 0.9125 ≈ 7.48s
   const vehicleReloadTime = vehicleGun[selectedModuleNames.vehicleGun].reloadTime
   //Italian autoloader line
   const totalReloadTime =
      ((vehicleGun[selectedModuleNames.vehicleGun].clip?.count as number) - 1) * reloadBetweenShells +
         vehicleReloadTime || 0

   const vehicleGunAutoReload = vehicleGun[selectedModuleNames.vehicleGun].autoreload
   const vehicleAimTime = vehicleGun[selectedModuleNames.vehicleGun].aimTime

   const { reloadTime, aimingTime } = useMemo(
      () =>
         applyStatPipeline({ reloadTime: vehicleReloadTime, aimingTime: vehicleAimTime }, [
            createDeviceTransformer(appliedDevicesModifiers),
            createCrewTransformer(crewMembers.gunner),
            createCrewTransformer(crewMembers.loader),
         ]),
      [vehicleAimTime, vehicleReloadTime, appliedDevicesModifiers, crewMembers],
   )

   return (
      <Table size='small' aria-label='Firepower table with average damage and penetration'>
         <TableHeadComponent headTitle='Firepower' iconSrc='/icons/details/firepower.png' />
         <TableBody>
            <Damage
               damage={shells[selectedModuleNames.shells]?.damage.armor}
               shellDamageDiff={shellsModifiers['damage.armor']}
            />
            <Penetration
               piercingPower={(shells[selectedModuleNames.shells]?.piercingPower as number[]) || [0, 0]}
               shellDamageDiff={shellsModifiers}
            />
            <RoF totalReloadTime={totalReloadTime} reloadTime={reloadTime} />
            <AvgDpm
               totalReloadTime={totalReloadTime}
               clipDamage={clipDamage}
               reloadBetweenShells={reloadBetweenShells}
               reloadTime={reloadTime}
            />
            <TableRowComponent
               iconSrc='/icons/firepower/reloadTimeSecs.png'
               titleText='Gun Loading'
               valueText={reloadTime}
               unit='s'
               modifiers={[
                  {
                     difference: parseFloat((reloadTime - vehicleReloadTime).toFixed(4)),
                     improved: true,
                  },
               ]}
            />
            {vehicleGunAutoReload && vehicleGunAutoReload.reloadTime && (
               <TableRowComponent
                  iconSrc='/icons/firepower/autoReloadTime.png'
                  titleText='Autoreloading One Shell'
                  valueText={[...vehicleGunAutoReload.reloadTime]}
                  unit='s'
               />
            )}
            <TableRowComponent
               iconSrc='/icons/firepower/aimingTime.png'
               titleText='Aiming Time'
               valueText={aimingTime}
               toFixed={2}
               unit='s'
               modifiers={[
                  {
                     difference: parseFloat((aimingTime - vehicleAimTime).toFixed(4)),
                     improved: true,
                  },
               ]}
            />
            {vehicleName === 'F136_AMX_67_Imbattable' && (
               <TableRowComponent
                  iconSrc='/icons/firepower/extraShotClipReloadTime.png'
                  titleText='Reload Penalty'
                  valueText={
                     (
                        vehicleGun[selectedModuleNames.vehicleGun]?.mechanics?.extraShotClip as {
                           extraReloadTime: number
                        }
                     )?.extraReloadTime || 0
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
                  <TableRowComponent
                     iconSrc='/icons/firepower/chargeableBurstReload.png'
                     titleText='Reload Between Shells'
                     valueText={60 / (vehicleGun[selectedModuleNames.vehicleGun]?.burst?.rate || 1)}
                     unit='s'
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
            {vehicleGun[selectedModuleNames.vehicleGun]?.autoShoot && (
               <AutoCannon reloadBetweenShells={reloadBetweenShells} />
            )}
            <GunDispersions />
            <Artilerry />
            <ArmorSpalls />
            {vehicleGun[selectedModuleNames.vehicleGun]?.dualAccuracy && (
               <DualAccuracy
                  dualAccuracy={vehicleGun[selectedModuleNames.vehicleGun]?.dualAccuracy as IDualAccuracy}
                  reloadTime={vehicleGun[selectedModuleNames.vehicleGun]?.reloadTime}
               />
            )}
            <TableRowComponent
               iconSrc='/icons/firepower/caliber.png'
               titleText='Caliber'
               valueText={shells[selectedModuleNames.shells]?.caliber}
               unit='mm'
            />
            {Array.isArray(shells[selectedModuleNames.shells]?.damage.devices) ? (
               <TableRowComponent
                  iconSrc='/icons/firepower/shellModuleDamage.png'
                  titleText='Module damage (50/500m)'
                  valueText={[
                     (shells[selectedModuleNames.shells]?.damage.devices as number[])[0],
                     (shells[selectedModuleNames.shells]?.damage.devices as number[])[1],
                  ]}
                  unit='hp'
               />
            ) : (
               <TableRowComponent
                  iconSrc='/icons/firepower/shellModuleDamage.png'
                  titleText='Module damage'
                  valueText={shells[selectedModuleNames.shells]?.damage.devices as number}
                  unit='hp'
               />
            )}
            <TableRowComponent
               iconSrc='/icons/firepower/shellVelocity.png'
               titleText='Shell velocity'
               valueText={shells[selectedModuleNames.shells]?.speed}
               modifiers={[
                  {
                     difference: shellsModifiers.speed?.difference ?? 0,
                     improved: shellsModifiers.speed?.improved || false,
                  },
               ]}
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
