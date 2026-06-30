import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'
import { CrewContext } from '@/CrewContext/CrewContext'

import applyStatPipeline from '@/utils/applyStatPipeline'
import createCrewSkillsTransformer from '@/utils/ApplyCrewSkillModifier'
import { createDeviceTransformer } from '@/utils/ApplyModifiers'

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
   const {
      crewReducer: { crewMembers },
   } = useContext(CrewContext)

   const maxVehicleHealthBase = vehicleChassis[selectedModuleNames.vehicleChassis].maxHealth
   const maxVehicleRegenHealthBase = vehicleChassis[selectedModuleNames.vehicleChassis].maxRegenHealth

   const { chassisHealth, chassisRegenHealth } = useMemo(
      () =>
         applyStatPipeline(
            {
               chassisHealth: maxVehicleHealthBase,
               chassisRegenHealth: maxVehicleRegenHealthBase,
            },
            [
               createDeviceTransformer(appliedDevicesModifiers),
               createCrewSkillsTransformer(crewMembers.driver),
            ],
         ),
      [appliedDevicesModifiers, maxVehicleHealthBase, maxVehicleRegenHealthBase, crewMembers],
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
