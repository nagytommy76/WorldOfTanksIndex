import { Dispatch, SetStateAction, useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/VehicleContext/DevicesContext/DeviceContext'

import type { IDevice } from '@/types/Devices/Devices'
import type { OverlayTypes, DeviceTypes } from '../../Types'
import type { DeviceModifierKeys } from '@/VehicleContext/DevicesContext/Types'

export default function useSelectAndClose(
   foundDevices: Record<DeviceTypes, IDevice | undefined>,
   archeType: DeviceModifierKeys,
   setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>,
   setSelectedDevice: Dispatch<SetStateAction<IDevice | undefined>>,
   setSelectedDeviceTypeOverlay: Dispatch<SetStateAction<OverlayTypes>>,
) {
   const { vehicleType } = useContext(VehicleContext)
   const { deviceDispatch, addSelectedDevice } = useContext(DeviceContext)

   return function handleSelectAndClose(deviceType: DeviceTypes) {
      setAnchorEl(null)
      const device = foundDevices[deviceType]
      if (!device) return // guard: variant doesn't exist for this archeType

      setSelectedDevice(device)
      setSelectedDeviceTypeOverlay(deviceType)
      // Notify parent with the real device id so it can track the selection
      addSelectedDevice(archeType, device.id)
      if (device.incompatibleTags) {
         deviceDispatch({
            type: 'SET_INCOMPATIBLE_DEVICES',
            payload: device.incompatibleTags,
         })
      }
      if (device.modifiers) {
         device.modifiers.forEach((modifier) => {
            if (modifier.name === 'vehicleStillCircularVisionRadiusDeluxe') {
               deviceDispatch({
                  type: 'SET_DEVICE_MODIFIER',
                  payload: {
                     archeType,
                     name: 'vehicleStillCircularVisionRadius',
                     value: modifier.value,
                  },
               })
            } else {
               deviceDispatch({
                  type: 'SET_DEVICE_MODIFIER',
                  payload: {
                     archeType,
                     name: modifier.name,
                     value: modifier.value,
                  },
               })
            }
         })
      } else if (device.aggregateModifiers) {
         device.aggregateModifiers.forEach((aggregatedModifier) => {
            if (aggregatedModifier.vehicleTypes.includes(vehicleType)) {
               deviceDispatch({
                  type: 'SET_DEVICE_MODIFIER',
                  payload: {
                     archeType,
                     name: aggregatedModifier.name,
                     value: aggregatedModifier.value,
                  },
               })
            }
         })
      }
   }
}
