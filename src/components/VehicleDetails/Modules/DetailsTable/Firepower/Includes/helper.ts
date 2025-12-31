import type { IClip } from '@/types/VehicleDetails/Guns'

export default function returnDPM(
   reloadTime: number,
   damage: number,
   clip?: null | IClip,
   reloadBetweenShells?: number,
   clipDamage?: number
) {
   if (clip && reloadBetweenShells && clipDamage) {
      /**
       * clip.count - 1 -> the first shell is in the magazine already
       */
      const totalReloadTime = (clip.count - 1) * reloadBetweenShells + reloadTime
      const dpm = (60 / totalReloadTime) * clipDamage
      return dpm
   }
   const DPM = (60 / reloadTime) * damage
   return DPM
}
