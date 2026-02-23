'use client'
import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableHeadComponent from '../Includes/TableHead'
import TableRowComponent from '../Includes/TableRow'

import ShellCost from './Includes/ShellCost'
import PotentialDmg from './Includes/PotentialDmg'

export default function Miscellaneous() {
   const {
      tankCost,
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { shells, vehicleGun, vehicleEngine },
      },
      modifiersReducer: {
         modifiers: { shells: shellsModifiers },
      },
   } = useContext(VehicleContext)

   const armorDamage = Array.isArray(shells[selectedModuleNames.shells]?.damage.armor)
      ? (shells[selectedModuleNames.shells]?.damage.armor as number[])[0]
      : (shells[selectedModuleNames.shells]?.damage.armor as number)

   return (
      <Table
         size='small'
         aria-label='Miscellaneous table with engine fire chance, ammo capacity, shell cost and tank cost'
      >
         <TableHeadComponent
            headTitle='Miscellaneous'
            className='bg-yellow-900'
            iconSrc='/icons/details/miscellaneous.png'
         />
         <TableBody>
            {vehicleEngine[selectedModuleNames.vehicleEngine]?.fireStartingChance && (
               <TableRowComponent
                  iconSrc='/icons/miscellaneous/vehicleFireChance.png'
                  titleText='Engine Fire Chance'
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
            <PotentialDmg armorDamage={armorDamage} />
            <TableRowComponent
               iconSrc='/icons/money_silver.webp'
               titleText='Shell Cost'
               valueText={shells[selectedModuleNames.shells]?.price}
               unit='credits'
               modifiers={[
                  {
                     difference: shellsModifiers?.price?.difference ?? 0,
                     improved: shellsModifiers?.price?.improved || false,
                  },
               ]}
            />
            <ShellCost armorDamage={armorDamage} />
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
                  valueText={tankCost.gold?.toLocaleString() || 0}
                  unit='gold'
               />
            )}
         </TableBody>
      </Table>
   )
}
