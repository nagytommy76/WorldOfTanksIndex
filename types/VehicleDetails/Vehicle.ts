import type { IEngines, IRocketAcceleration } from './Engines'
import type { IChassis, IHull } from './Hull'
import type { ITurrets } from './Turrets'
import type { IFuelTank, IRadios, ISpeedLimit, IHydropneumatic, ISiegeMode, VehicleTypes } from './Other'

/**
 * @description From WG API
 */
export interface ITankDetails {
   tank_id: number
   is_gift: boolean
   is_premium: boolean
   is_premium_igr: boolean
   next_tanks: {
      [tank_id: number]: number
   } | null
   prices_xp: {
      [tank_id: number]: number
   } | null
   images: {
      small_icon: string
      contour_icon: string
      big_icon: string
   }
   /**
    * @description Equivalent to `tankName` -> A182_T803
    */
   tag: string
   short_name: string
   description: string
   name: string
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
   fuelTank: IFuelTank[]
   hull: IHull
   radios: IRadios[]
   speedLimit: ISpeedLimit
   turrets: ITurrets[]
   hydropneumatic?: IHydropneumatic | null
   siegeMode?: Partial<ISiegeMode> | null
   rocketAcceleration?: IRocketAcceleration | null
}

export interface ITankData {
   _id: string
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
   type: VehicleTypes
   xmlId: string
   notInShop: boolean
   crew: {
      primary: string
      secondary: string[]
   }[]
   siegeMode: null | Partial<ITankStats>
   stats: ITankStats
   mechanics: unknown
}

export type CardTanksType = Pick<
   ITankData,
   '_id' | 'id' | 'xmlId' | 'name' | 'type' | 'tier' | 'price' | 'nation' | 'tags' | 'tankDetails'
>
