import type { IClip } from '@/types/VehicleDetails/Guns'

export default function returnDPM(
   reloadTime: number,
   damage: number,
   clip?: null | IClip,
   reloadBetweenShells?: number,
   clipDamage?: number,
   autoReaload?: number[]
) {
   if (autoReaload && clipDamage && reloadBetweenShells) {
      let totalReloadTime = 0
      autoReaload.reverse().map((time) => {
         totalReloadTime += time
      })

      const dpm = (60 / (totalReloadTime - reloadBetweenShells)) * clipDamage
      // console.log('TIME: ', (60 / (totalReloadTime - 5.61)) * clipDamage)
      return dpm
   }

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
