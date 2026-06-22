'use client'
import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'
import { CrewContext } from '@/CrewContext/CrewContext'

import applyStatPipeline from '@/utils/applyStatPipeline'
import createCrewTransformer from '@/utils/ApplyCrewModifiers'
import createCrewSkillsTransformer from '@/utils/ApplyCrewSkillModifier'
import { createDeviceTransformer } from '@/utils/ApplyModifiers'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableHeadComponent from '../Includes/TableHead'
import TableRowComponent from '../Includes/TableRow'

const SPOTTED_TIME = 10
export default function Spotting() {
   const {
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleTurret, vehicleRadio },
      },
   } = useContext(VehicleContext)
   const {
      deviceReducer: { appliedDevicesModifiers },
   } = useContext(DeviceContext)
   const {
      crewReducer: { crewMembers, commander },
   } = useContext(CrewContext)

   const viewRangeBase = vehicleTurret[selectedModuleNames.vehicleTurret].viewRange
   const viewRangeStillBase = vehicleTurret[selectedModuleNames.vehicleTurret].viewRange
   const radioRangeBase = vehicleRadio[selectedModuleNames.vehicleRadio].distance

   const { enemySpottingTime, ownSpottingTime, viewRange, radioRange, stillViewRange } = useMemo(
      () =>
         applyStatPipeline(
            {
               enemySpottingTime: SPOTTED_TIME,
               ownSpottingTime: SPOTTED_TIME,
               viewRange: viewRangeBase,
               stillViewRange: viewRangeStillBase,
               radioRange: radioRangeBase,
            },
            [
               createDeviceTransformer(appliedDevicesModifiers),
               createCrewTransformer(commander),
               createCrewTransformer(crewMembers.radioman),
               createCrewTransformer(crewMembers.loader),
               createCrewSkillsTransformer(commander),
            ],
         ),
      [viewRangeBase, viewRangeStillBase, radioRangeBase, appliedDevicesModifiers, crewMembers, commander],
   )

   return (
      <Table size='small' aria-label='Spotting table with view range and signal range'>
         <TableHeadComponent
            headTitle='Spotting'
            className='bg-lime-950'
            iconSrc='/icons/details/stealth.png'
         />
         <TableBody>
            {appliedDevicesModifiers && appliedDevicesModifiers['stereoscope'] ? (
               <TableRowComponent
                  iconSrc='/icons/spot/circularVisionRadius.png'
                  titleText='View range'
                  valueText={stillViewRange}
                  unit='m'
                  modifiers={[
                     {
                        difference: parseFloat((stillViewRange - viewRangeStillBase).toFixed(2)),
                        improved: true,
                     },
                  ]}
               />
            ) : (
               <TableRowComponent
                  iconSrc='/icons/spot/circularVisionRadius.png'
                  titleText='View range'
                  valueText={viewRange}
                  unit='m'
                  modifiers={[
                     {
                        difference: parseFloat((viewRange - viewRangeBase).toFixed(2)),
                        improved: true,
                     },
                  ]}
               />
            )}
            <TableRowComponent
               iconSrc='/icons/spot/radioDistance.png'
               titleText='Signal range'
               valueText={radioRange}
               unit='m'
               modifiers={[
                  {
                     difference: parseFloat((radioRange - radioRangeBase).toFixed(2)),
                     improved: true,
                  },
               ]}
            />
            <TableRowComponent
               iconSrc='/icons/spot/vehicleOwnSpottingTime.png'
               titleText='Time being spotted'
               valueText={ownSpottingTime}
               unit='seconds'
               modifiers={[
                  {
                     difference: ownSpottingTime - SPOTTED_TIME,
                     improved: true,
                  },
               ]}
            />
            <TableRowComponent
               iconSrc='/icons/spot/vehicleEnemySpottingTime.png'
               titleText='Time enemy remains spotted'
               valueText={enemySpottingTime}
               unit='seconds'
               modifiers={[
                  {
                     difference: enemySpottingTime - SPOTTED_TIME,
                     improved: true,
                  },
               ]}
            />
            {appliedDevicesModifiers && appliedDevicesModifiers['commandersView'] && (
               <>
                  <TableRowComponent
                     iconSrc='/icons/spot/demaskFoliageFactor.png'
                     titleText='Concealment of enemy vehicles behind foliage'
                     valueText={parseFloat(
                        ((appliedDevicesModifiers['commandersView'][0].value - 1) * 100).toFixed(2),
                     )}
                     unit='%'
                  />
                  <TableRowComponent
                     iconSrc='/icons/spot/demaskMovingFactor.png'
                     titleText='Concealment of moving enemy vehicles'
                     valueText={parseFloat(
                        ((appliedDevicesModifiers['commandersView'][1].value - 1) * 100).toFixed(2),
                     )}
                     unit='%'
                  />
               </>
            )}
         </TableBody>
      </Table>
   )
}
