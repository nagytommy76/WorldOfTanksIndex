'use client'
import { useContext, useState, useEffect } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableHeadComponent from '../Includes/TableHead'
import TableRowComponent from '../Includes/TableRow'
import { calculateCamoValues } from '../../Helpers/calculate'
import ReturnPercentValue from '@/helpers/returnPercentValue'

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
      // returnAppliedModifierDiplayValue,
   } = useContext(DeviceContext)
   const [stationaryCamoValue, setStationaryCamoValue] = useState(0)
   const [movingCamoValue, setMovingCamoValue] = useState(0)

   useEffect(() => {
      const baseCamoValue = calculateCamoValues(camo.stationary)
      if (!appliedDevicesModifiers || !appliedDevicesModifiers['additionalInvisibilityDevice']) {
         setStationaryCamoValue(baseCamoValue)
      } else {
         const modifiersForInvisibilityDevice = appliedDevicesModifiers['additionalInvisibilityDevice']
         const percentValue = ReturnPercentValue(modifiersForInvisibilityDevice[0].value)
         setStationaryCamoValue(baseCamoValue + percentValue)
      }
   }, [camo.stationary, vehicleGun, selectedModuleNames.vehicleGun, appliedDevicesModifiers])

   useEffect(() => {
      const camoValue = camo.moving
      setMovingCamoValue(calculateCamoValues(camoValue))
   }, [camo.moving, vehicleGun, selectedModuleNames.vehicleGun])

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
               valueText={`
                ${stationaryCamoValue.toFixed(2)} / 
                ${calculateCamoValues(
                   camo.stationary,
                   vehicleGun[selectedModuleNames.vehicleGun]?.invisibilityFactorAtShot,
                ).toFixed(2)}
            `}
               unit='%'
               modifiers={
                  appliedDevicesModifiers && [
                     {
                        // ez a kiszámolt érték
                        difference: ReturnPercentValue(
                           appliedDevicesModifiers['additionalInvisibilityDevice'][0].value || 1,
                        ),
                        improved: true,
                     },
                  ]
               }
            />
            <TableRowComponent
               iconSrc='/icons/concealment/invisibilityMovingFactor.png'
               titleText='Moving / After Fire'
               valueText={`
                    ${movingCamoValue.toFixed(2)} / 
                    ${calculateCamoValues(
                       camo.moving,
                       vehicleGun[selectedModuleNames.vehicleGun]?.invisibilityFactorAtShot,
                    ).toFixed(2)}
                `}
               unit='%'
            />
         </TableBody>
      </Table>
   )
}
