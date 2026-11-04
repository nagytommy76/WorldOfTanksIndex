import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'
import { FieldModificationContext } from '@/VehicleContext/FieldModificationContext/FieldModificationContext'

import applyStatPipeline from '@/utils/applyStatPipeline'
import { createDeviceTransformer } from '@/utils/ApplyModifiers'
import createBaseFieldModTransformer from '@/utils/FieldModifications/ApplyFieldModifications'

import TableRowComponent from '../../Includes/TableRow'

export default function MaxHealth() {
   const {
      deviceReducer: { appliedDevicesModifiers },
   } = useContext(DeviceContext)
   const {
      fieldModReducer: { appliedBaseModifications },
   } = useContext(FieldModificationContext)
   const {
      vehicleReducer: {
         selectedModuleNames,

         moduleGroup: { vehicleTurret },
      },
   } = useContext(VehicleContext)

   const vehicleBaseMaxHealth = vehicleTurret[selectedModuleNames.vehicleTurret].hp

   const { maxHealth } = useMemo(
      () =>
         applyStatPipeline(
            {
               maxHealth: vehicleBaseMaxHealth,
            },
            [
               createDeviceTransformer(appliedDevicesModifiers),
               createBaseFieldModTransformer(appliedBaseModifications),
            ],
         ),
      [appliedDevicesModifiers, vehicleBaseMaxHealth, appliedBaseModifications],
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
