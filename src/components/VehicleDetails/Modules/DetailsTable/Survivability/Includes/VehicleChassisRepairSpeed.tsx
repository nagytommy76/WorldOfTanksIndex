import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

import applyModifiersOnVehicleDetails from '@/utils/ApplyModifiers'

import TableRowComponent from '../../Includes/TableRow'

export default function VehicleChassisRepairSpeed() {
   const {
      vehicleReducer: {
         selectedModuleNames,

         moduleGroup: { vehicleChassis },
      },
   } = useContext(VehicleContext)
   const {
      deviceReducer: { appliedDevicesModifiers },
   } = useContext(DeviceContext)

   const baseRepariTime = vehicleChassis[selectedModuleNames.vehicleChassis].repairTime

   const { chassisRepairSpeed } = useMemo(
      () =>
         applyModifiersOnVehicleDetails(
            {
               chassisRepairSpeed: baseRepariTime,
            },
            appliedDevicesModifiers,
         ),
      [appliedDevicesModifiers, baseRepariTime],
   )

   return (
      <TableRowComponent
         iconSrc='/icons/survivability/vehicleChassisRepairSpeed.png'
         titleText='Track Repair Time'
         valueText={chassisRepairSpeed}
         toFixed={2}
         unit='s'
         modifiers={[
            {
               difference: parseFloat((chassisRepairSpeed - baseRepariTime).toFixed(2)),
               improved: true,
            },
         ]}
      />
   )
}
