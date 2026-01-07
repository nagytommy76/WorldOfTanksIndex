import type { AmmoType } from './module'

export interface ISharedShell {
   damage: {
      armor: number
      devices: number
   }
   caliber: number
   effects: string
   icon: string
   id: number
   isTracer?: boolean
   kind: AmmoType
   normalizationAngle?: number
   price: number
   ricochetAngle: number
   userString: string
   armorSpalls: {
      impactRadius: number
      coneAngle: number
      damage: {
         armor: number
         devices: number
      }
   } | null
   hasStun?: boolean
   stunDuration?: number
   /**
    * @description stunDuration * guaranteedStunDuration = minimum stun duration
    */
   guaranteedStunDuration?: number
   explosionRadius: number | null
   mechanics: string | null
}

export interface IShells extends ISharedShell {
   defaultPortion: number
   gravity: number
   maxDistance: number
   name: string
   piercingPower: number[]
   speed: number
}
