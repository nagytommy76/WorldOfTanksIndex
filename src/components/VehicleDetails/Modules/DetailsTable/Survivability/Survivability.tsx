'use client'
import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableHeadComponent from '../Includes/TableHead'
import TableRowComponent from '../Includes/TableRow'

export default function Survivability() {
   const {
      hull,
      fuelTank,
      vehicleReducer: {
         selectedModuleNames,

         moduleGroup: { vehicleChassis, vehicleEngine, vehicleTurret },
      },
   } = useContext(VehicleContext)

   return (
      <Table size='small' aria-label='Survivability table with hit points'>
         <TableHeadComponent
            headTitle='Survivability'
            className='bg-blue-950'
            iconSrc='/icons/details/survivability.png'
         />
         <TableBody>
            <TableRowComponent
               titleText='Health'
               valueText={vehicleTurret[selectedModuleNames.vehicleTurret]?.hp}
               unit='hp'
            />
            {hull && (
               <TableRowComponent
                  titleText='Hull armor'
                  valueText={`
                     ${hull.armor[0]} / ${hull.armor[1]} / ${hull.armor[2]}
                     `}
                  unit='mm'
               />
            )}
            {vehicleTurret[selectedModuleNames.vehicleTurret]?.armor.length > 0 && (
               <TableRowComponent
                  titleText='Turret armor'
                  valueText={`
                    ${vehicleTurret[selectedModuleNames.vehicleTurret]?.armor[0]} / ${
                     vehicleTurret[selectedModuleNames.vehicleTurret]?.armor[1]
                  } / ${vehicleTurret[selectedModuleNames.vehicleTurret]?.armor[2]}
                `}
                  unit='mm'
               />
            )}
            <TableRowComponent
               titleText='Track armor'
               valueText={vehicleChassis[selectedModuleNames.vehicleChassis]?.armor}
               unit='mm'
            />
            <TableRowComponent
               titleText='Track health'
               valueText={vehicleChassis[selectedModuleNames.vehicleChassis]?.maxHealth}
               unit='hp'
            />
            <TableRowComponent
               titleText='Track health (Repaired)'
               valueText={vehicleChassis[selectedModuleNames.vehicleChassis]?.maxRegenHealth}
               unit='hp'
            />
            <TableRowComponent
               titleText='Track Repair time'
               valueText={vehicleChassis[selectedModuleNames.vehicleChassis]?.repairTime.toFixed(2)}
               unit='s'
            />
            <TableRowComponent
               titleText='Ammo rack health'
               valueText={hull.ammoRackHealth.maxHealth}
               unit='hp'
            />
            <TableRowComponent
               titleText='Ammo rack health (Repaired)'
               valueText={hull.ammoRackHealth.maxRegenHealth}
               unit='hp'
            />
            <TableRowComponent titleText='Fuel tank health' valueText={fuelTank[0].maxHealth} unit='hp' />
            <TableRowComponent
               titleText='Fuel tank health (Repaired)'
               valueText={fuelTank[0].maxRegenHealth}
               unit='hp'
            />
            {vehicleEngine[selectedModuleNames.vehicleEngine]?.fireStartingChance && (
               <TableRowComponent
                  titleText='Engine fire chance'
                  valueText={vehicleEngine[selectedModuleNames.vehicleEngine]?.fireStartingChance * 100}
                  unit='%'
               />
            )}
            <TableRowComponent
               titleText='Engine health'
               valueText={vehicleEngine[selectedModuleNames.vehicleEngine]?.maxHealth}
               unit='hp'
            />
            <TableRowComponent
               titleText='Engine health (Repaired)'
               valueText={vehicleEngine[selectedModuleNames.vehicleEngine]?.maxRegenHealth}
               unit='hp'
            />
            <TableRowComponent
               titleText='Turret ring health'
               valueText={vehicleTurret[selectedModuleNames.vehicleTurret]?.ringHealth.maxHealth}
               unit='hp'
            />
            <TableRowComponent
               titleText='Turret ring health (Repaired)'
               valueText={vehicleTurret[selectedModuleNames.vehicleTurret]?.ringHealth.maxRegenHealth}
               unit='hp'
            />
            <TableRowComponent
               titleText='Viewport health'
               valueText={vehicleTurret[selectedModuleNames.vehicleTurret]?.viewportHealth.maxHealth}
               unit='hp'
            />
            <TableRowComponent
               titleText='Viewport health (Repaired)'
               valueText={vehicleTurret[selectedModuleNames.vehicleTurret]?.viewportHealth.maxRegenHealth}
               unit='hp'
            />
         </TableBody>
      </Table>
   )
}
