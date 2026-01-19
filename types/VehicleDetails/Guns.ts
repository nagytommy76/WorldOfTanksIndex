import type { IShells } from './Shells'

export interface ISecondaryGuns {
   reloadTime: number
   burst: {
      count: number
      rate: number
   }
   aimingTime: number
   shotDispersionRadius: number
   shotDispersionFactors: {
      turretRotation: number
      afterShot: number
      whileGunDamaged: number
   }
   invisibilityFactorAtShot: number
}

export interface IAutoShoot {
   shotDispersionPerSec: number
   maxShotDispersion: number
   groupSize: number
   aimingDelay?: number | null
   shotDispersionPerShot?: number | null
}

export interface IAutoReload {
   reloadTime: number[]
   boostFraction: number
   boostResidueTime: number
   boostStartTime: number
}

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
   autoreload: IAutoReload | null
   clip: IClip | null
   autoShoot?: IAutoShoot | null
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
   invisibilityFactorAtShot: number
   shells: IShells[]
   twinGun: null | ITwinGun
   weight: number
   /**
    * @description Tier XI tanks like usa:A179_Black_Rock
    */
   mechanics?: Record<string, unknown>
}

export interface IClip {
   count: number
   rate: number
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
