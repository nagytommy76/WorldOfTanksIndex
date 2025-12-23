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
      <Table size='small' aria-label='Other table with concealment, potential damage etc...'>
         <TableHeadComponent
            headTitle='Concealment'
            className='bg-yellow-900'
            iconSrc='/icons/details/concealment.png'
         />
         <TableBody>
            <TableRowComponent
               iconSrc='/icons/concealment/invisibilityStillFactor.png'
               titleText='stationary / after fire'
               valueText={`
                ${calculateCamoValues(camo.stationary).toFixed(2)} / 
                ${calculateCamoValues(
                   camo.stationary,
                   vehicleGun[selectedModuleNames.vehicleGun]?.invisibilityFactorAtShot
                ).toFixed(2)}
            `}
               unit='%'
            />
            <TableRowComponent
               iconSrc='/icons/concealment/invisibilityMovingFactor.png'
               titleText='moving / after fire'
               valueText={`
                    ${calculateCamoValues(camo.moving).toFixed(2)} / 
                    ${calculateCamoValues(
                       camo.moving,
                       vehicleGun[selectedModuleNames.vehicleGun]?.invisibilityFactorAtShot
                    ).toFixed(2)}
                `}
               unit='%'
            />
         </TableBody>
      </Table>
   )
}
