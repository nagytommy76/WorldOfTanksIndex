'use client'
import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'
import { CrewContext } from '@/CrewContext/CrewContext'

import applyStatPipeline from '@/utils/applyStatPipeline'
import { createDeviceTransformer } from '@/utils/ApplyModifiers'
import { createDeviceBoostersTransformer } from '@/src/utils/ApplyDeviceBooster'
import { createConcealmentSkillTransformer } from '@/utils/ApplyCrewSkillModifier'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableHeadComponent from '../Includes/TableHead'
import TableRowComponent from '../Includes/TableRow'
import { calculateCamoValues } from '../../Helpers/calculate'

/**
 *
 * A Camoflage NEt nél van deluxe és sima vehicleStillCamouflageDeluxe és vehicleStillCamouflage
 * ami külön adódik hozzá a contexhez!!!! MEGOLDANI!!!
 */

export default function Concealment() {
   const {
      camo,
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleGun },
      },
   } = useContext(VehicleContext)
   const {
      deviceReducer: { appliedDevicesModifiers, appliedBattleBoosterModifiers },
   } = useContext(DeviceContext)
   const {
      crewReducer: { commander, crewMembers },
      hasAppliedCrewBooster,
   } = useContext(CrewContext)

   const vehicleStillCamoflageBase = useMemo(() => calculateCamoValues(camo.stationary), [camo])
   const vehicleMovingCamoflageBase = useMemo(() => calculateCamoValues(camo.moving), [camo])

   const { camouflageMoving, camouflageStill } = useMemo(
      () =>
         applyStatPipeline(
            {
               camouflageStill: vehicleStillCamoflageBase,
               camouflageMoving: vehicleMovingCamoflageBase,
            },
            [
               createConcealmentSkillTransformer(commander),
               createDeviceTransformer(appliedDevicesModifiers),
               createDeviceBoostersTransformer(appliedBattleBoosterModifiers),
            ],
         ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
         appliedDevicesModifiers,
         appliedBattleBoosterModifiers,
         vehicleMovingCamoflageBase,
         vehicleStillCamoflageBase,
         commander,
         crewMembers,
         hasAppliedCrewBooster,
      ],
   )

   const vehicleStillCamoflageAfterFire = useMemo(() => {
      return camouflageStill * vehicleGun[selectedModuleNames.vehicleGun].invisibilityFactorAtShot
   }, [vehicleGun, camouflageStill, selectedModuleNames.vehicleGun])

   const vehicleMovingCamoflageAfterFire = useMemo(() => {
      return camouflageMoving * vehicleGun[selectedModuleNames.vehicleGun].invisibilityFactorAtShot
   }, [vehicleGun, camouflageMoving, selectedModuleNames.vehicleGun])

   return (
      <Table size='small' aria-label='Concealment table with camouflage values (moving, stationary)'>
         <TableHeadComponent
            headTitle='Concealment'
            className='bg-yellow-900'
            iconSrc='/icons/details/concealment.png'
         />
         <TableBody>
            <TableRowComponent
               iconSrc='/icons/concealment/invisibilityStillFactor.png'
               titleText='Stationary / After Fire'
               valueText={[camouflageStill, vehicleStillCamoflageAfterFire]}
               toFixed={2}
               unit='%'
               modifiers={[
                  {
                     difference: parseFloat((camouflageStill - vehicleStillCamoflageBase).toFixed(2)),
                     improved: true,
                  },
               ]}
            />
            <TableRowComponent
               iconSrc='/icons/concealment/invisibilityMovingFactor.png'
               titleText='Moving / After Fire'
               valueText={[camouflageMoving, vehicleMovingCamoflageAfterFire]}
               toFixed={2}
               unit='%'
               modifiers={[
                  {
                     difference: parseFloat((camouflageMoving - vehicleMovingCamoflageBase).toFixed(2)),
                     improved: true,
                  },
               ]}
            />
         </TableBody>
      </Table>
   )
}
