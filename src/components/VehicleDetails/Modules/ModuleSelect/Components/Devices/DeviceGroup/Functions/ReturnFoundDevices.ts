import type { IDevice } from '@/types/Devices/Devices'
import type { DeviceTypes } from '../../Types'

/**
 * @description Find each variant within this archeType
 * @param devices
 * @returns {foundDevices}
 */
export default function ReturnFoundDevices(devices: IDevice[]) {
   // const foundModernized = devices.find((device) => device.deviceType === 'modernized')
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
      equipmentModernized_1: undefined,
      equipmentModernized_2: undefined,
      equipmentModernized_3: undefined,
   }

   return foundDevices
}
