'use client'
import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

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

   return (
      <Table size='small' aria-label='Other table with concealment, potential damage etc...'>
         <TableHeadComponent
            headTitle='Spotting'
            className='bg-lime-950'
            iconSrc='/icons/details/spotting.png'
         />
         <TableBody>
            <TableRowComponent
               iconSrc='/icons/spot/circularVisionRadius.png'
               titleText='View range'
               valueText={vehicleTurret[selectedModuleNames.vehicleTurret]?.viewRange}
               unit='m'
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
