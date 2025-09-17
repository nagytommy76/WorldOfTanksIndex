import { useContext } from 'react'
import { TomatoContext } from '@/TomatoContext/TomatoContext'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableHeadComponent from '../Includes/TableHead'
import TableRowComponent from '../Includes/TableRow'

export default function Other() {
   const {
      tankCost,
      tomatoReducer: {
         selectedModuleNames,

         moduleGroup: { shells, vehicleTurret, vehicleGun },
      },
   } = useContext(TomatoContext)
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
               titleText='Ammo Capacity'
               valueText={vehicleGun[selectedModuleNames.vehicleGun]?.maxAmmo}
               unit='shells'
            />
            <TableRowComponent
               titleText='Potential Damage'
               valueText={
                  vehicleGun[selectedModuleNames.vehicleGun]?.maxAmmo *
                  shells[selectedModuleNames.shells]?.damage.armor
               }
               unit='HP'
            />
            <TableRowComponent
               titleText='Shell Cost per 1000 HP'
               valueText={(
                  (1000 / shells[selectedModuleNames.shells]?.damage.armor) *
                  shells[selectedModuleNames.shells]?.price
               ).toFixed(0)}
               unit='HP'
            />
            <TableRowComponent titleText='Tank Cost' valueText={tankCost.toLocaleString()} unit='credits' />
         </TableBody>
      </Table>
   )
}
