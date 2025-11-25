import type { IGuns } from './Guns'

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
}
