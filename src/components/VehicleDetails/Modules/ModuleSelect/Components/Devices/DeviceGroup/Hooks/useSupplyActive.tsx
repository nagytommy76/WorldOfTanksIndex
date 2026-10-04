import { Dispatch, SetStateAction, useContext } from 'react'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

import type { IDevice } from '@/types/Devices/Devices'
import type { OverlayTypes, DeviceTypes } from '../../Types'
import type { DeviceModifierKeys } from '@/VehicleContext/DevicesContext/Types'
import type { VehicleTypes } from '@/types/VehicleDetails/Other'

/**
 * @description
 * Called ONLY when SUPPLY SLOT (scouting etc) is selected
 */
export default function useSupplyActive(
   vehicleType: VehicleTypes,
   foundDevices: Record<DeviceTypes, IDevice | undefined>,
   archeType: DeviceModifierKeys,
   setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>,
   setSelectedDevice: Dispatch<SetStateAction<IDevice | undefined>>,
   setSelectedDeviceTypeOverlay: Dispatch<SetStateAction<OverlayTypes>>,
) {
   const { deviceDispatch, addSelectedDevice } = useContext(DeviceContext)

   return function supplySlotActiveSelectAndClose() {
      setAnchorEl(null)
      setSelectedDevice(foundDevices.tiers)
      setSelectedDeviceTypeOverlay('supplySlotActive')
      addSelectedDevice(archeType, foundDevices.tiers?.id ?? 0)

      if (foundDevices.tiers?.incompatibleTags) {
         deviceDispatch({
            type: 'SET_INCOMPATIBLE_DEVICES',
            payload: foundDevices.tiers.incompatibleTags,
         })
      }

      if (foundDevices.tiers?.modifiers) {
         foundDevices.tiers.modifiers.forEach((modifier) => {
            deviceDispatch({
               type: 'SET_DEVICE_MODIFIER',
               payload: {
                  archeType,
                  name: modifier.name,
                  value: modifier.specValue ?? modifier.value,
                  isSupplySlot: true,
               },
            })
         })
      } else if (foundDevices.tiers?.aggregateModifiers) {
         foundDevices.tiers.aggregateModifiers.forEach((aggregatedModifier) => {
            if (aggregatedModifier.vehicleTypes.includes(vehicleType)) {
               deviceDispatch({
                  type: 'SET_DEVICE_MODIFIER',
                  payload: {
                     archeType,
                     name: aggregatedModifier.name,
                     value: aggregatedModifier.specValue ?? aggregatedModifier.value,
                     isSupplySlot: true,
                  },
               })
            }
         })
      }
   }
}
