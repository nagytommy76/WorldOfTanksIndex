import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

import applyModifiersOnVehicleDetails from '@/utils/ApplyModifiers'

import TableRowComponent from '../../Includes/TableRow'

export default function VehicleChassisStrength() {
   const {
      vehicleReducer: {
         selectedModuleNames,

         moduleGroup: { vehicleChassis },
      },
   } = useContext(VehicleContext)
   const {
      deviceReducer: { appliedDevicesModifiers },
   } = useContext(DeviceContext)

   const maxVehicleHealthBase = vehicleChassis[selectedModuleNames.vehicleChassis].maxHealth
   const maxVehicleRegenHealthBase = vehicleChassis[selectedModuleNames.vehicleChassis].maxRegenHealth

   const { chassisHealth, chassisRegenHealth } = useMemo(
      () =>
         applyModifiersOnVehicleDetails(
            {
               chassisHealth: maxVehicleHealthBase,
               chassisRegenHealth: maxVehicleRegenHealthBase,
            },
            appliedDevicesModifiers,
         ),
      [appliedDevicesModifiers, maxVehicleHealthBase, maxVehicleRegenHealthBase],
   )

   return (
      <TableRowComponent
         iconSrc='/icons/survivability/vehicleChassisStrength.png'
         titleText='Track HP / Repaired'
         valueText={[chassisHealth, chassisRegenHealth]}
         unit='hp'
         modifiers={[
            {
               difference: parseFloat((chassisHealth - maxVehicleHealthBase).toFixed(4)),
               improved: true,
            },
         ]}
      />
   )
}
