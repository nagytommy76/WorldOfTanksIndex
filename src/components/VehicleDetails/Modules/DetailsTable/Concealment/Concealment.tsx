'use client'
import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'
import { CrewContext } from '@/CrewContext/CrewContext'
import { FieldModificationContext } from '@/FieldModificationContext/FieldModificationContext'

import applyStatPipeline from '@/utils/applyStatPipeline'
import createBaseFieldModTransformer from '@/utils/FieldModifications/ApplyFieldModifications'
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
      fieldModReducer: { appliedBaseModifications },
   } = useContext(FieldModificationContext)
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
               createBaseFieldModTransformer(appliedBaseModifications),
            ],
         ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
         appliedDevicesModifiers,
         appliedBattleBoosterModifiers,
         appliedBaseModifications,
         vehicleMovingCamoflageBase,
         vehicleStillCamoflageBase,
         commander,
         crewMembers,
         hasAppliedCrewBooster,
      ],
   )

   const vehicleStillCamoflageAfterFireBase = useMemo(() => {
      return camouflageStill * vehicleGun[selectedModuleNames.vehicleGun].invisibilityFactorAtShot
   }, [vehicleGun, camouflageStill, selectedModuleNames.vehicleGun])

   const vehicleMovingCamoflageAfterFireBase = useMemo(() => {
      return camouflageMoving * vehicleGun[selectedModuleNames.vehicleGun].invisibilityFactorAtShot
   }, [vehicleGun, camouflageMoving, selectedModuleNames.vehicleGun])

   const { vehicleStillCamoflageAfterFire, vehicleMovingCamoflageAfterFire } = useMemo(
      () =>
         applyStatPipeline(
            {
               vehicleStillCamoflageAfterFire: vehicleStillCamoflageAfterFireBase,
               vehicleMovingCamoflageAfterFire: vehicleMovingCamoflageAfterFireBase,
            },
            [createBaseFieldModTransformer(appliedBaseModifications)],
         ),
      [vehicleStillCamoflageAfterFireBase, vehicleMovingCamoflageAfterFireBase, appliedBaseModifications],
   )

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
                  {
                     difference: parseFloat(
                        (vehicleStillCamoflageAfterFire - vehicleStillCamoflageAfterFireBase).toFixed(2),
                     ),
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
                  {
                     difference: parseFloat(
                        (vehicleMovingCamoflageAfterFire - vehicleMovingCamoflageAfterFireBase).toFixed(2),
                     ),
                     improved: true,
                  },
               ]}
            />
         </TableBody>
      </Table>
   )
}
