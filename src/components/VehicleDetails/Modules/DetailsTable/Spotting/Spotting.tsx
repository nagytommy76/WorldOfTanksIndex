'use client'
import { useContext, useState, useEffect } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/VehicleContext/DevicesContext/DeviceContext'

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
   const { appliedDevicesModifiers } = useContext(DeviceContext)
   const [viewRange, setViewRange] = useState(
      vehicleTurret[selectedModuleNames.vehicleTurret]?.viewRange || 0,
   )

   useEffect(() => {
      const viewRangeBase = vehicleTurret[selectedModuleNames.vehicleTurret]?.viewRange
      if (!viewRangeBase) return
      if (!appliedDevicesModifiers || !appliedDevicesModifiers['coatedOptics']) {
         setViewRange(viewRangeBase || 0)
      } else {
         const modifiersForCoatedOptics = appliedDevicesModifiers['coatedOptics']
         const visionRadiusModifier = modifiersForCoatedOptics.find(
            (modifier) => modifier.name === 'vehicleCircularVisionRadius',
         )
         if (visionRadiusModifier) {
            setViewRange((viewRangeBase || 0) * visionRadiusModifier.value)
         }
      }
   }, [appliedDevicesModifiers, vehicleTurret, selectedModuleNames.vehicleTurret])

   function returnAppliedModifierForViewRange() {
      if (!appliedDevicesModifiers || !appliedDevicesModifiers['coatedOptics']) return null
      let array = []

      array = appliedDevicesModifiers['coatedOptics'].map((modifier) => {
         const difference = Number(
            (
               modifier.value * vehicleTurret[selectedModuleNames.vehicleTurret]?.viewRange -
               vehicleTurret[selectedModuleNames.vehicleTurret]?.viewRange
            ).toFixed(2),
         )
         return {
            difference: difference,
            improved: modifier.value > 0,
         }
      })
      return array
   }

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
               modifiers={returnAppliedModifierForViewRange()}
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
