'use client'
import { useContext, useState, useEffect } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableHeadComponent from '../Includes/TableHead'
import TableRowComponent from '../Includes/TableRow'

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

   const [viewRange, setViewRange] = useState(
      vehicleTurret[selectedModuleNames.vehicleTurret]?.viewRange || 0,
   )

   useEffect(() => {
      const viewRangeBase = vehicleTurret[selectedModuleNames.vehicleTurret]?.viewRange
      if (!viewRangeBase) return
      setAppliedDeviceModifier(viewRangeBase, 'coatedOptics', 'vehicleCircularVisionRadius', setViewRange)
   }, [selectedModuleNames, vehicleTurret, appliedDevicesModifiers, setAppliedDeviceModifier])

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
         </TableBody>
      </Table>
   )
}
