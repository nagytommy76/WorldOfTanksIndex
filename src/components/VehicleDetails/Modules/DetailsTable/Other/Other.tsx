'use client'
import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableHeadComponent from '../Includes/TableHead'
import TableRowComponent from '../Includes/TableRow'

export default function Miscellaneous() {
   const {
      tankCost,
      vehicleReducer: {
         selectedModuleNames,

         moduleGroup: { shells, vehicleGun, vehicleEngine },
      },
   } = useContext(VehicleContext)

   return (
      <Table size='small' aria-label='Other table with concealment, potential damage etc...'>
         <TableHeadComponent
            headTitle='Miscellaneous'
            className='bg-yellow-900'
            iconSrc='/icons/details/miscellaneous.png'
         />
         <TableBody>
            {vehicleEngine[selectedModuleNames.vehicleEngine]?.fireStartingChance && (
               <TableRowComponent
                  iconSrc='/icons/miscellaneous/vehicleFireChance.png'
                  titleText='Engine fire chance'
                  valueText={vehicleEngine[selectedModuleNames.vehicleEngine]?.fireStartingChance * 100}
                  unit='%'
               />
            )}

            <TableRowComponent
               iconSrc='/icons/miscellaneous/continuousShotsPerMinute.png'
               titleText='Ammo Capacity'
               valueText={vehicleGun[selectedModuleNames.vehicleGun]?.maxAmmo}
               unit='shells'
            />
            {vehicleGun[selectedModuleNames.vehicleGun]?.maxAmmo &&
               shells[selectedModuleNames.shells]?.damage.armor && (
                  <TableRowComponent
                     iconSrc='/icons/miscellaneous/avgDamage.png'
                     titleText='Potential Damage'
                     valueText={
                        vehicleGun[selectedModuleNames.vehicleGun]?.maxAmmo *
                        shells[selectedModuleNames.shells]?.damage.armor
                     }
                     unit='HP'
                  />
               )}
            <TableRowComponent
               iconSrc='/icons/money_silver.webp'
               titleText='Shell cost'
               valueText={shells[selectedModuleNames.shells]?.price}
               unit='credits'
            />
            <TableRowComponent
               iconSrc='/icons/money_silver.webp'
               titleText='Shell Cost per 1000 HP'
               valueText={(
                  (1000 / shells[selectedModuleNames.shells]?.damage.armor) *
                  shells[selectedModuleNames.shells]?.price
               ).toFixed(0)}
               unit='Credits'
            />
            {typeof tankCost === 'number' ? (
               <TableRowComponent
                  iconSrc='/icons/money_silver.webp'
                  titleText='Tank Cost'
                  valueText={tankCost.toLocaleString()}
                  unit='Credits'
               />
            ) : (
               <TableRowComponent
                  iconSrc='/icons/money_gold.webp'
                  titleText='Tank Cost'
                  valueText={tankCost.gold.toLocaleString()}
                  unit='gold'
               />
            )}
         </TableBody>
      </Table>
   )
}
