import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

import applyModifiersOnVehicleDetails from '@/utils/ApplyModifiers'

import TableRowComponent from '../../Includes/TableRow'

export default function MaxHealth() {
   const {
      deviceReducer: { appliedDevicesModifiers },
   } = useContext(DeviceContext)
   const {
      vehicleReducer: {
         selectedModuleNames,

         moduleGroup: { vehicleTurret },
      },
   } = useContext(VehicleContext)

   const vehicleBaseMaxHealth = vehicleTurret[selectedModuleNames.vehicleTurret].hp

   const { maxHealth } = useMemo(
      () =>
         applyModifiersOnVehicleDetails(
            {
               maxHealth: vehicleBaseMaxHealth,
            },
            appliedDevicesModifiers,
         ),
      [appliedDevicesModifiers, vehicleBaseMaxHealth],
   )

   return (
      <TableRowComponent
         iconSrc='/icons/survivability/maxHealth.png'
         titleText='Health'
         valueText={maxHealth}
         unit='hp'
         modifiers={[
            {
               difference: parseFloat((maxHealth - vehicleBaseMaxHealth).toFixed(4)),
               improved: true,
            },
         ]}
      />
   )
}
