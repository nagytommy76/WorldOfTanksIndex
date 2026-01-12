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
               iconSrc='/icons/survivability/maxHealth.png'
               titleText='Health'
               valueText={vehicleTurret[selectedModuleNames.vehicleTurret]?.hp}
               unit='hp'
            />
            {hull && (
               <TableRowComponent
                  iconSrc='/icons/survivability/hullArmor.png'
                  titleText='Hull Armor'
                  valueText={`
                     ${hull.armor[0]} / ${hull.armor[1]} / ${hull.armor[2]}
                     `}
                  unit='mm'
               />
            )}
            {vehicleTurret[selectedModuleNames.vehicleTurret]?.armor.length > 0 &&
               vehicleTurret[selectedModuleNames.vehicleTurret]?.armor[0] > 0 && (
                  <TableRowComponent
                     iconSrc='/icons/survivability/turretArmor.png'
                     titleText='Turret Armor'
                     valueText={`
                    ${vehicleTurret[selectedModuleNames.vehicleTurret]?.armor[0]} / ${
                        vehicleTurret[selectedModuleNames.vehicleTurret]?.armor[1]
                     } / ${vehicleTurret[selectedModuleNames.vehicleTurret]?.armor[2]}
                `}
                     unit='mm'
                  />
               )}
            {vehicleChassis[selectedModuleNames.vehicleChassis]?.armor && (
               <TableRowComponent
                  iconSrc='/icons/survivability/vehicleChassisFallDamage.png'
                  titleText='Track Armor'
                  valueText={vehicleChassis[selectedModuleNames.vehicleChassis]?.armor}
                  unit='mm'
               />
            )}
            <TableRowComponent
               iconSrc='/icons/survivability/vehicleChassisStrength.png'
               titleText='Track HP / Repaired'
               valueText={
                  vehicleChassis[selectedModuleNames.vehicleChassis]?.maxHealth +
                  ' / ' +
                  vehicleChassis[selectedModuleNames.vehicleChassis]?.maxRegenHealth
               }
               unit='hp'
            />
            <TableRowComponent
               iconSrc='/icons/survivability/vehicleChassisRepairSpeed.png'
               titleText='Track Repair Time'
               valueText={vehicleChassis[selectedModuleNames.vehicleChassis]?.repairTime.toFixed(2)}
               unit='s'
            />
            <TableRowComponent
               iconSrc='/icons/survivability/vehicleAmmoBayStrength.png'
               titleText='Ammo Rack HP / Repaired'
               valueText={hull.ammoRackHealth.maxHealth + ' / ' + hull.ammoRackHealth.maxRegenHealth}
               unit='hp'
            />
            <TableRowComponent
               iconSrc='/icons/survivability/fuelTankHP.png'
               titleText='Fuel Tank HP / Repaired'
               valueText={fuelTank[0].maxHealth + ' / ' + fuelTank[0].maxRegenHealth}
               unit='hp'
            />
            <TableRowComponent
               iconSrc='/icons/survivability/vehicleAmmoBayEngineFuelStrength.png'
               titleText='Engine HP / Repaired'
               valueText={
                  vehicleEngine[selectedModuleNames.vehicleEngine]?.maxHealth +
                  ' / ' +
                  vehicleEngine[selectedModuleNames.vehicleEngine]?.maxRegenHealth
               }
               unit='hp'
            />
            <TableRowComponent
               iconSrc='/icons/survivability/vehicleAmmoBayEngineFuelStrength.png'
               titleText='Turret Ring HP / Repaired'
               valueText={
                  vehicleTurret[selectedModuleNames.vehicleTurret]?.ringHealth.maxHealth +
                  ' / ' +
                  vehicleTurret[selectedModuleNames.vehicleTurret]?.ringHealth.maxRegenHealth
               }
               unit='hp'
            />
            <TableRowComponent
               titleText='Viewport HP / Repaired'
               valueText={
                  vehicleTurret[selectedModuleNames.vehicleTurret]?.viewportHealth.maxHealth +
                  ' / ' +
                  vehicleTurret[selectedModuleNames.vehicleTurret]?.viewportHealth.maxRegenHealth
               }
               unit='hp'
            />
         </TableBody>
      </Table>
   )
}
