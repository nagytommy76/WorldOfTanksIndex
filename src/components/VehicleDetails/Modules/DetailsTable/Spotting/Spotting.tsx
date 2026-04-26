'use client'
import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableHeadComponent from '../Includes/TableHead'
import TableRowComponent from '../Includes/TableRow'
import applyModifiersOnVehicleDetails from '@/src/utils/ApplyModifiers'

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

   const viewRangeBase = vehicleTurret[selectedModuleNames.vehicleTurret].viewRange
   const viewRangeStillBase = vehicleTurret[selectedModuleNames.vehicleTurret].viewRange

   const { enemySpottingTime, ownSpottingTime, viewRange, stillViewRange } = useMemo(
      () =>
         applyModifiersOnVehicleDetails(
            {
               enemySpottingTime: SPOTTED_TIME,
               ownSpottingTime: SPOTTED_TIME,
               viewRange: viewRangeBase,
               stillViewRange: viewRangeStillBase,
            },
            appliedDevicesModifiers,
         ),
      [viewRangeBase, viewRangeStillBase, appliedDevicesModifiers],
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
               valueText={vehicleRadio[selectedModuleNames.vehicleRadio]?.distance}
               unit='m'
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
