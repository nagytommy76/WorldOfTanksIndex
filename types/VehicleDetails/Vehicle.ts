import type { IEngines } from './Engines'
import type { IChassis, IHull } from './Hull'
import type { ITurrets } from './Turrets'
import type { IFuelTank, IRadios, ISpeedLimit, IHydropneumatic, ISiegeMode } from './Other'

/**
 * @description From WG API
 */
export interface ITankDetails {
   is_gift: boolean
   next_tanks: {
      [tank_id: number]: number
   } | null
   prices_xp: {
      [tank_id: number]: number
   } | null
   is_premium: boolean
   images: {
      small_icon: string
      contour_icon: string
      big_icon: string
   }
   tank_id: number
   /**
    * @description Equivalent to `tankName` -> A182_T803
    */
   tag: string
}

interface ITankStats {
   camo: {
      moving: number
      stationary: number
      camoBonus: number
      firePenalty: number
   }
   chassis: IChassis[]
   engines: IEngines[]
   fuelTank: IFuelTank
   hull: IHull
   radios: IRadios[]
   speedLimit: ISpeedLimit
   turrets: ITurrets[]
   hydropneumatic?: IHydropneumatic | null
   siegeMode?: ISiegeMode | null
}

export interface ITankData {
   id: number | null
   /**
    * @description Coming from WG API: /encyclopedia/vehicles
    */
   tankDetails: ITankDetails | null
   name: string
   nation: string
   price: number | { gold: number }
   role: string
   shortName: string
   tags: string[]
   tier: number
   type: string
   xmlId: string
   notInShop: boolean
   crew: {
      primary: string
      secondary: string[]
   }[]
   isSiegeMode: boolean
   siegeMode: null | Partial<ITankStats>
   stats: ITankStats
}

export interface ITomatoTankStats {
   tankData: ITankData
}
