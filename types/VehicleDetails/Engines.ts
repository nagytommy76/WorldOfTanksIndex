export interface IEngines {
   fireStartingChance: number
   level: number
   maxHealth: number
   maxRegenHealth: number
   name: string
   power: number
   price: number
   realPower: number
   repairCost: number
   rpm_max: number
   rpm_min: number
   tags: string[]
   userString: string
   weight: number
   wwsoundNPC: string
   wwsoundPC: string
}

export interface IRocketAcceleration {
   deployTime: number
   reloadTime: number
   reuseCount: number
   duration: number
   vehicleEnginePower: number
   vehicleForwardMaxSpeed: number
   vehicleBackwardMaxSpeed: number
   vehicleAllGroundRotationSpeed: number
}
