export interface IChassis {
   price: number
   armor: number
   dispersion: {
      vehicleMovement: number
      vehicleRotation: number
   }
   id: string
   level: number
   maxHealth: number
   maxRegenHealth: number
   name: string
   repairTime: number
   rotatesInPlace: boolean
   rotationSpeed: number
   terrainResistance: number[]
   weight: number
   wheelAngle: number[] | null
   wheeled: boolean
}

export interface IHull {
   ammoRackHealth: {
      maxHealth: number
      maxRegenHealth: number
      repairCost: number
   }
   armor: number[]
   weight: number
}
