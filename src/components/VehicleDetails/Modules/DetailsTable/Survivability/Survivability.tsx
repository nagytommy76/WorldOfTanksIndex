'use client'
import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableHeadComponent from '../Includes/TableHead'
import TableRowComponent from '../Includes/TableRow'

import MaxHealth from './Includes/MaxHealth'
import VehicleChassisStrength from './Includes/VehicleChassisStrength'
import VehicleChassisRepairSpeed from './Includes/VehicleChassisRepairSpeed'
import AmmoFuelEngineHealth from './Includes/AmmoFuelEngineHealth'

export default function Survivability() {
   const {
      hull,
      vehicleReducer: {
         selectedModuleNames,

         moduleGroup: { vehicleChassis, vehicleTurret },
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
            <MaxHealth />
            <TableRowComponent
               iconSrc='/icons/survivability/hullArmor.png'
               titleText='Hull Armor'
               valueText={[hull.armor[0], hull.armor[1], hull.armor[2]]}
               unit='mm'
            />
            {vehicleTurret[selectedModuleNames.vehicleTurret].armor.length > 0 &&
               vehicleTurret[selectedModuleNames.vehicleTurret].armor[0] > 0 && (
                  <TableRowComponent
                     iconSrc='/icons/survivability/turretArmor.png'
                     titleText='Turret Armor'
                     valueText={[
                        vehicleTurret[selectedModuleNames.vehicleTurret].armor[0],
                        vehicleTurret[selectedModuleNames.vehicleTurret].armor[1],
                        vehicleTurret[selectedModuleNames.vehicleTurret].armor[2],
                     ]}
                     unit='mm'
                  />
               )}
            <TableRowComponent
               iconSrc='/icons/survivability/vehicleChassisFallDamage.png'
               titleText='Track Armor'
               valueText={vehicleChassis[selectedModuleNames.vehicleChassis].armor}
               unit='mm'
            />
            <VehicleChassisStrength />
            <VehicleChassisRepairSpeed />
            <AmmoFuelEngineHealth />
            <TableRowComponent
               iconSrc='/icons/survivability/vehicleAmmoBayEngineFuelStrength.png'
               titleText='Turret Ring HP / Repaired'
               valueText={[
                  vehicleTurret[selectedModuleNames.vehicleTurret].ringHealth.maxHealth,
                  vehicleTurret[selectedModuleNames.vehicleTurret].ringHealth.maxRegenHealth,
               ]}
               unit='hp'
            />
            <TableRowComponent
               titleText='Viewport HP / Repaired'
               valueText={[
                  vehicleTurret[selectedModuleNames.vehicleTurret].viewportHealth.maxHealth,
                  vehicleTurret[selectedModuleNames.vehicleTurret].viewportHealth.maxRegenHealth,
               ]}
               iconSrc='/icons/spot/circularVisionRadius.png'
               unit='hp'
            />
         </TableBody>
      </Table>
   )
}
