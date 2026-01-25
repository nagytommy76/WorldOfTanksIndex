import type { IClip, IAutoReload } from '@/types/VehicleDetails/Guns'

export function returnDPM(reloadTime: number, damage: number) {
   const DPM = (60 / reloadTime) * damage
   return DPM
}

export function returnAutoReloadDPM(autoReaload: IAutoReload, clipDamage: number) {
   let totalReloadTime = 0
   autoReaload.reloadTime.reverse().map((time) => {
      totalReloadTime += time
   })
   return (clipDamage / totalReloadTime) * 60
}

export function returnClipReloadTime(
   reloadTime: number,
   clip: IClip,
   clipDamage: number,
   reloadBetweenShells: number,
) {
   /**
    * clip.count - 1 -> the first shell is in the magazine already
    */
   const totalReloadTime = (clip?.count - 1) * reloadBetweenShells + reloadTime
   const dpm = (60 / totalReloadTime) * clipDamage
   return dpm
}
