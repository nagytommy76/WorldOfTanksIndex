import { Dispatch, SetStateAction, useContext, useEffect } from 'react'

import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/VehicleContext/DevicesContext/DeviceContext'

import type { DeviceTypes, OverlayTypes } from '../../Types'
import type { IDevice } from '@/types/Devices/Devices'
import type { DeviceModifierKeys } from '@/DevicesContext/Types'

export default function useCheckDevices(
   foundDevices: Record<DeviceTypes, IDevice | undefined>,
   archeType: DeviceModifierKeys,
   setSelectedDeviceTypeOverlay: Dispatch<SetStateAction<OverlayTypes>>,
) {
   const { supplySlotCategory } = useContext(VehicleContext)
   const {
      deviceReducer: { appliedDevicesModifiers },
      selectedDevices,
      selectedCount,
   } = useContext(DeviceContext)
   /**
    * @description
    * Check if @param foundDevices contains @param selectedDevices
    */
   useEffect(() => {
      if (foundDevices && selectedCount > 0) {
         for (const [type, device] of Object.entries(foundDevices)) {
            if (device && selectedDevices[device.archeType] === device.id) {
               setSelectedDeviceTypeOverlay(type as OverlayTypes)

               if (appliedDevicesModifiers && appliedDevicesModifiers[archeType]) {
                  appliedDevicesModifiers[archeType].forEach((appliedDevice) => {
                     if (appliedDevice.isSupplySlot) setSelectedDeviceTypeOverlay('supplySlotActive')
                  })
               }
            }
         }
      }
   }, [
      selectedDevices,
      foundDevices,
      selectedCount,
      supplySlotCategory,
      appliedDevicesModifiers,
      archeType,
      setSelectedDeviceTypeOverlay,
   ])
}
