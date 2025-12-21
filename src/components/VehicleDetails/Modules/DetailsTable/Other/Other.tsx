'use client'
import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableHeadComponent from '../Includes/TableHead'
import TableRowComponent from '../Includes/TableRow'

export default function Other() {
   const {
      tankCost,
      camo,
      vehicleReducer: {
         selectedModuleNames,

         moduleGroup: { shells, vehicleTurret, vehicleGun, vehicleEngine, vehicleRadio },
      },
   } = useContext(VehicleContext)

   function calculateCamoValues(camoValue: number, firePenalty: number = 1) {
      const calculatedCamo = camoValue * 0.57 * 100
      return calculatedCamo * firePenalty
   }

   return (
      <Table size='small' aria-label='Other table with concealment, potential damage etc...'>
         <TableHeadComponent headTitle='Other' className='bg-yellow-700' />
         <TableBody>
            <TableRowComponent
               titleText='View range'
               valueText={vehicleTurret[selectedModuleNames.vehicleTurret]?.viewRange}
               unit='m'
            />
            <TableRowComponent
               titleText='Signal range'
               valueText={vehicleRadio[selectedModuleNames.vehicleRadio]?.distance}
               unit='m'
            />
            <TableRowComponent
               titleText='Concealment stationary vehicle / after fire'
               valueText={`
                  ${calculateCamoValues(camo.stationary).toFixed(2)} / 
                  ${calculateCamoValues(camo.stationary, 0.209).toFixed(2)}
               `}
               unit='%'
            />
            <TableRowComponent
               titleText='Concealment moving vehicle / after fire'
               valueText={`
                  ${calculateCamoValues(camo.moving).toFixed(2)} / 
                  ${calculateCamoValues(camo.moving, camo.firePenalty).toFixed(2)}
               `}
               unit='%'
            />
            <TableRowComponent
               titleText='Fire chance'
               valueText={vehicleEngine[selectedModuleNames.vehicleEngine]?.fireStartingChance * 100 || 0}
               unit='%'
            />
            <TableRowComponent
               titleText='Ammo Capacity'
               valueText={vehicleGun[selectedModuleNames.vehicleGun]?.maxAmmo}
               unit='shells'
            />
            {vehicleGun[selectedModuleNames.vehicleGun]?.maxAmmo &&
               shells[selectedModuleNames.shells]?.damage.armor && (
                  <TableRowComponent
                     titleText='Potential Damage'
                     valueText={
                        vehicleGun[selectedModuleNames.vehicleGun]?.maxAmmo *
                        shells[selectedModuleNames.shells]?.damage.armor
                     }
                     unit='HP'
                  />
               )}
            <TableRowComponent
               titleText='Shell Cost per 1000 HP'
               valueText={(
                  (1000 / shells[selectedModuleNames.shells]?.damage.armor) *
                  shells[selectedModuleNames.shells]?.price
               ).toFixed(0)}
               unit='Credits'
            />
            {typeof tankCost === 'number' ? (
               <TableRowComponent
                  titleText='Tank Cost'
                  valueText={tankCost.toLocaleString()}
                  unit='Credits'
               />
            ) : (
               <TableRowComponent
                  titleText='Tank Cost'
                  valueText={tankCost.gold.toLocaleString()}
                  unit='gold'
               />
            )}
         </TableBody>
      </Table>
   )
}
