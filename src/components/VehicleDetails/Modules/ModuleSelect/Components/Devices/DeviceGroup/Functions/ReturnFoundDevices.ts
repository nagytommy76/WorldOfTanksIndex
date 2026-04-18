import type { IDevice } from '@/types/Devices/Devices'
import type { DeviceTypes } from '../../Types'

/**
 * @description Find each variant within this archeType
 * @param devices
 * @returns {foundDevices}
 */
export default function ReturnFoundDevices(devices: IDevice[]) {
   const foundModernizedT1 = devices.find(
      (device) => device.deviceType === 'modernized' && device.tags?.includes('modernized_1'),
   )
   const foundModernizedT2 = devices.find(
      (device) => device.deviceType === 'modernized' && device.tags?.includes('modernized_2'),
   )
   const foundModernizedT3 = devices.find(
      (device) => device.deviceType === 'modernized' && device.tags?.includes('modernized_3'),
   )

   const foundTiers = devices.find((device) => device.deviceType === 'tiers')
   const foundDeluxe = devices.find((device) => device.deviceType === 'deluxe')
   const foundBasicTrophy = devices.find(
      (device) => device.deviceType === 'trophy' && device.tags?.includes('trophyBasic'),
   )
   const foundUpgradedTrophy = devices.find(
      (device) => device.deviceType === 'trophy' && device.tags?.includes('trophyUpgraded'),
   )

   const foundDevices: Record<DeviceTypes, IDevice | undefined> = {
      tiers: foundTiers,
      equipmentTrophyBasic: foundBasicTrophy,
      equipmentTrophyUpgraded: foundUpgradedTrophy,
      equipmentPlus: foundDeluxe,
      equipmentModernized_1: foundModernizedT1,
      equipmentModernized_2: foundModernizedT2,
      equipmentModernized_3: foundModernizedT3,
   }

   return foundDevices
}
