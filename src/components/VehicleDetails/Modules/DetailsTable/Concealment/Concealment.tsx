'use client'
import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableHeadComponent from '../Includes/TableHead'
import TableRowComponent from '../Includes/TableRow'
import { calculateCamoValues } from '../../Helpers/calculate'

export default function Concealment() {
   const {
      camo,
      vehicleReducer: {
         selectedModuleNames,

         moduleGroup: { vehicleGun },
      },
   } = useContext(VehicleContext)

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
                ${calculateCamoValues(camo.stationary).toFixed(2)} / 
                ${calculateCamoValues(
                   camo.stationary,
                   vehicleGun[selectedModuleNames.vehicleGun]?.invisibilityFactorAtShot,
                ).toFixed(2)}
            `}
               unit='%'
            />
            <TableRowComponent
               iconSrc='/icons/concealment/invisibilityMovingFactor.png'
               titleText='Moving / After Fire'
               valueText={`
                    ${calculateCamoValues(camo.moving).toFixed(2)} / 
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
