import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

import applyModifiersOnVehicleDetails from '@/utils/ApplyModifiers'

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

   const engineFireChance = vehicleEngine[selectedModuleNames.vehicleEngine].fireStartingChance * 100
   const { fireChance } = useMemo(
      () =>
         applyModifiersOnVehicleDetails(
            {
               fireChance: engineFireChance,
            },
            appliedDevicesModifiers,
         ),
      [appliedDevicesModifiers, engineFireChance],
   )

   return (
      <TableRowComponent
         iconSrc='/icons/miscellaneous/vehicleFireChance.png'
         titleText='Engine Fire Chance'
         valueText={fireChance}
         unit='%'
         modifiers={[
            {
               difference: fireChance - engineFireChance,
               improved: true,
            },
         ]}
      />
   )
}
