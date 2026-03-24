import { useState } from 'react'

import type { OverlayTypes } from '../../Types'
import type { IDevice } from '@/types/Devices/Devices'

export default function useDeviceStates(foundTiersDevice: IDevice) {
   // selectedDeviceTypeOverlay drives which overlay icon is shown on the button
   const [selectedDeviceTypeOverlay, setSelectedDeviceTypeOverlay] = useState<OverlayTypes>('none')
   // selectedDevice drives the icon + tooltip content shown on the button
   const [selectedDevice, setSelectedDevice] = useState(foundTiersDevice)

   return { selectedDeviceTypeOverlay, setSelectedDeviceTypeOverlay, selectedDevice, setSelectedDevice }
}
