import { Dispatch, SetStateAction, useContext } from 'react'
import { DeviceContext } from '@/DevicesContext/DeviceContext'
import { CrewContext } from '@/CrewContext/CrewContext'

import type { IDevice } from '@/types/Devices/Devices'
import type { OverlayTypes, DeviceTypes } from '../../Types'
import type { DeviceModifierKeys } from '@/VehicleContext/DevicesContext/Types'

/**
 * @description
 * Called ONLY when Deselect equipment is selected from the dropdown.
 * selectedDeviceTypeOverlay set to none, selectedDevice set to tiers
 */
export default function useSetCloseNone(
   selectedDevice: IDevice | undefined,
   foundDevices: Record<DeviceTypes, IDevice | undefined>,
   archeType: DeviceModifierKeys,
   setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>,
   setSelectedDevice: Dispatch<SetStateAction<IDevice | undefined>>,
   setSelectedDeviceTypeOverlay: Dispatch<SetStateAction<OverlayTypes>>,
) {
   const { deviceDispatch, addSelectedDevice } = useContext(DeviceContext)
   const { crewDispatch } = useContext(CrewContext)

   return function selectAndCloseNoneDeviceType() {
      setAnchorEl(null)
      // ── Deselect ──────────────────────────────────────────────────────
      // Reset the button back to the default tiers icon
      setSelectedDevice(foundDevices.equipmentModernized_1 || foundDevices.tiers)
      setSelectedDeviceTypeOverlay('none')
      // Notify parent: deviceId 0 means "remove this slot"
      addSelectedDevice(archeType, 0)
      deviceDispatch({
         type: 'REMOVE_DEVICE_MODIFIER',
         payload: { archeType },
      })
      // Remove incompatible tag
      if (selectedDevice?.incompatibleTags?.length) {
         deviceDispatch({
            type: 'REMOVE_INCOMPATIBLE_DEVICE',
            payload: selectedDevice.incompatibleTags?.[0],
         })
      }
      if (selectedDevice?.archeType === 'improvedVentilation') {
         crewDispatch({
            type: 'REMOVE_APPLIED_CREW_MODIFIER',
            payload: selectedDevice.archeType,
         })
      }
   }
}
