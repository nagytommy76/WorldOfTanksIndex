'use client'
import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'
import { CrewContext } from '@/CrewContext/CrewContext'

import applyStatPipeline from '@/utils/applyStatPipeline'
import { createDeviceTransformer } from '@/utils/ApplyModifiers'
import createCrewSkillsTransformer from '@/utils/ApplyCrewSkillModifier'

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
      deviceReducer: { appliedDevicesModifiers },
   } = useContext(DeviceContext)
   const {
      crewReducer: { crewMembers },
   } = useContext(CrewContext)

   const vehicleStillCamoflageBase = useMemo(() => calculateCamoValues(camo.stationary), [camo])
   const vehicleStillCamoflageAfterFireBase = useMemo(
      () =>
         calculateCamoValues(
            camo.stationary,
            vehicleGun[selectedModuleNames.vehicleGun].invisibilityFactorAtShot,
         ),
      [camo, vehicleGun, selectedModuleNames.vehicleGun],
   )

   const vehicleMovingCamoflageBase = useMemo(() => calculateCamoValues(camo.moving), [camo])
   const vehicleMovingCamoflageAfterFireBase = useMemo(
      () =>
         calculateCamoValues(
            camo.moving,
            vehicleGun[selectedModuleNames.vehicleGun].invisibilityFactorAtShot,
         ),
      [camo, vehicleGun, selectedModuleNames.vehicleGun],
   )

   const { camouflageMoving, camouflageStill } = useMemo(
      () =>
         applyStatPipeline(
            { camouflageStill: vehicleStillCamoflageBase, camouflageMoving: vehicleMovingCamoflageBase },
            [
               createDeviceTransformer(appliedDevicesModifiers),
               createCrewSkillsTransformer(crewMembers.commander),
            ],
         ),
      [appliedDevicesModifiers, vehicleMovingCamoflageBase, vehicleStillCamoflageBase, crewMembers],
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
               valueText={[camouflageStill, vehicleStillCamoflageAfterFireBase]}
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
               valueText={[camouflageMoving, vehicleMovingCamoflageAfterFireBase]}
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
