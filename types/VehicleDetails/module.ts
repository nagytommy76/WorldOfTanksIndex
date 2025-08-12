export type ModuleType = 'vehicleTurret' | 'vehicleEngine' | 'vehicleChassis' | 'vehicleGun' | 'vehicleRadio'
export interface IModules {
   is_default: boolean
   module_id: number
   name: string
   next_modules: null | number[]
   next_tanks: null | number[]
   price_credit: number
   price_xp: number
   type: ModuleType
}
