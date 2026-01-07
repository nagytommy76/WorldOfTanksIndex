export interface ICamo {
   camoBonus: number
   firePenalty: number
   moving: number
   stationary: number
}

export interface ISiegeMode {
   device: string
   switchOffTime: number
   switchOnTime: number
   engineDamageCoeff: number
   autoSwitchOffRequiredVehicleSpeed: number
   autoSwitchOnRequiredVehicleSpeed: number
}

export interface IHydropneumatic {
   depression: number
   elevation: number
}

export interface IFuelTank {
   tags: string[]
   price: number
   weight: number
   maxHealth: number
   maxRegenHealth: number
   repairCost: number
}

export interface ISpeedLimit {
   backward: number
   forward: number
}

export interface IRadios {
   distance: number
   level: number
   maxHealth: number
   maxRegenHealth: number
   name: string
   price: number
   repairCost: number
   tags: string[]
   userString: string
   weight: number
}

export type VehicleTypes = 'lightTank' | 'mediumTank' | 'heavyTank' | 'AT-SPG' | 'SPG'
