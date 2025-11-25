import type { IShells } from './Shells'

export interface IGuns {
   accuracy: number
   aimTime: number
   arc: number[]
   burst: {
      // BlackRock T11 USA
      count: number
      rate: number
      syncReloading?: boolean
   } | null
   autoreload: {
      reloadTime: number[]
   } | null
   clip: {
      count: number
      rate: number
   } | null
   depression: number
   dispersion: {
      turretRotation: number
      afterShot: number
      whileDamaged: number
   }
   dualAccuracy: IDualAccuracy | null
   dualGun: IDualGun | null
   elevation: number
   elevationLimits: {
      elevation: number[]
      depression: number[]
   }
   gunArc: number[]
   id: string
   level: number
   maxAmmo: number
   name: string
   reloadTime: number
   shells: IShells[]
   twinGun: null | ITwinGun
   weight: number
}

export interface IDualGun {
   afterShotDelay: number
   chargeThreshold: number
   chargeTime: number
   preChargeIndication: number
   rateTime: number
   reloadLockTime: number
   reloadTimes: number[]
   shootImpulse: number
}

export interface IDualAccuracy {
   afterShotDispersionRadius: number
   coolingDelay: number
}

export interface ITwinGun {
   afterShotDelay: number
   twinGunReloadTime: number
}
