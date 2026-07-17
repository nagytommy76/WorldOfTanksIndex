import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'
import { CrewContext } from '@/CrewContext/CrewContext'

import applyStatPipeline from '@/utils/applyStatPipeline'
import createCrewSkillsTransformer from '@/utils/ApplyCrewSkillModifier'
import { createDeviceTransformer } from '@/utils/ApplyModifiers'

import TableRowComponent from '../../Includes/TableRow'

export default function FireChance() {
   const {
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleEngine },
      },
   } = useContext(VehicleContext)
   const {
      deviceReducer: { appliedDevicesModifiers },
   } = useContext(DeviceContext)
   const {
      crewReducer: { crewMembers, commander },
   } = useContext(CrewContext)

   const engineFireChance = vehicleEngine[selectedModuleNames.vehicleEngine].fireStartingChance * 100
   const { fireChance } = useMemo(
      () =>
         applyStatPipeline(
            {
               fireChance: engineFireChance,
            },
            [
               createDeviceTransformer(appliedDevicesModifiers),
               createCrewSkillsTransformer(commander, crewMembers),
            ],
         ),
      [appliedDevicesModifiers, engineFireChance, crewMembers, commander],
   )

   return (
      <TableRowComponent
         iconSrc='/icons/miscellaneous/vehicleFireChance.png'
         titleText='Engine Fire Chance'
         valueText={fireChance}
         unit='%'
         modifiers={[
            {
               difference: parseFloat((fireChance - engineFireChance).toFixed(2)),
               improved: true,
            },
         ]}
      />
   )
}
