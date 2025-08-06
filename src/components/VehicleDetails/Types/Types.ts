export interface IModule {
   is_default: boolean
   module_id: number
   name: string
   next_modules: null | number[]
   next_tanks: number[]
   price_credit: number
   price_xp: number
   type: 'vehicleGun' | 'vehicleChassis' | 'vehicleTurret' | 'vehicleEngine' | 'vehicleRadio'
}
