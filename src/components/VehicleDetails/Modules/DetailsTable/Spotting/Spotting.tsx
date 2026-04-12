'use client'
import { useContext, useState, useEffect } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

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
      returnAppliedModifierDiplayValue,
      setAppliedDeviceModifier,
   } = useContext(DeviceContext)

   const viewRangeBase = vehicleTurret[selectedModuleNames.vehicleTurret].viewRange

   const [viewRange, setViewRange] = useState(vehicleTurret[selectedModuleNames.vehicleTurret].viewRange)
   const [timeBeingSpotted, setTimeBeingSpotted] = useState(SPOTTED_TIME)
   const [timeEnemySpotted, setTimeEnemySpotted] = useState(SPOTTED_TIME)

   useEffect(() => {
      setAppliedDeviceModifier(viewRangeBase, 'coatedOptics', 'vehicleCircularVisionRadius', setViewRange)
   }, [selectedModuleNames, vehicleTurret, viewRangeBase, appliedDevicesModifiers, setAppliedDeviceModifier])

   useEffect(() => {
      if (!appliedDevicesModifiers || !appliedDevicesModifiers['improvedRadioCommunication']) {
         setTimeBeingSpotted(SPOTTED_TIME)
         setTimeEnemySpotted(SPOTTED_TIME)
         return
      }
      setTimeBeingSpotted(SPOTTED_TIME - appliedDevicesModifiers['improvedRadioCommunication'][0].value)
      setTimeEnemySpotted(SPOTTED_TIME + appliedDevicesModifiers['improvedRadioCommunication'][0].value)
   }, [appliedDevicesModifiers])

   return (
      <Table size='small' aria-label='Spotting table with view range and signal range'>
         <TableHeadComponent
            headTitle='Spotting'
            className='bg-lime-950'
            iconSrc='/icons/details/stealth.png'
         />
         <TableBody>
            <TableRowComponent
               iconSrc='/icons/spot/circularVisionRadius.png'
               titleText='View range'
               valueText={parseFloat(viewRange.toFixed(2))}
               unit='m'
               modifiers={returnAppliedModifierDiplayValue(
                  'coatedOptics',
                  vehicleTurret[selectedModuleNames.vehicleTurret]?.viewRange,
               )}
            />
            <TableRowComponent
               iconSrc='/icons/spot/radioDistance.png'
               titleText='Signal range'
               valueText={vehicleRadio[selectedModuleNames.vehicleRadio]?.distance}
               unit='m'
            />
            <TableRowComponent
               iconSrc='/icons/spot/vehicleOwnSpottingTime.png'
               titleText='Time being spotted'
               valueText={timeBeingSpotted}
               unit='seconds'
               modifiers={[
                  {
                     difference: timeBeingSpotted - SPOTTED_TIME,
                     improved: true,
                  },
               ]}
            />
            <TableRowComponent
               iconSrc='/icons/spot/vehicleEnemySpottingTime.png'
               titleText='Time enemy remains spotted'
               valueText={timeEnemySpotted}
               unit='seconds'
               modifiers={[
                  {
                     difference: timeEnemySpotted - SPOTTED_TIME,
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
