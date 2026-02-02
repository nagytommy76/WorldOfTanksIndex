import type { IGuns } from './Guns'
import type { IShells } from './Shells'

export interface ITurrets {
   armor: number[]
   price: number
   guns: IGuns[]
   hp: number
   id: string
   level: number
   name: string
   openTop: boolean
   ringHealth: {
      maxHealth: number
      maxRegenHealth: number
      repairCost: number
   }
   traverse: number
   viewRange: number
   viewportHealth: {
      maxHealth: number
      maxRegenHealth: number
      repairCost: number
   }
   weight: number
   secondaryGuns?: ISecondaryGuns[] | null
}

/**
 * @description Secondary guns used in some turrets (e.g. Tier XI Taschenratte)
 */
export interface ISecondaryGuns {
   name: string
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
   shells: Partial<IShells>[]
}
