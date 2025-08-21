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

export interface Engine {
   name: string
   power: number
   weight: number
   /**Name of the engine */
   tag: string
   fire_chance: number
   tier: number
}

export interface Suspension {
   name: string
   weight: number
   load_limit: number
   tag: string
   traverse_speed: number
   tier: number
   steering_lock_angle: number
}

export interface ArmorSection {
   front: number
   sides: number
   rear: number
}

export interface Armor {
   turret: ArmorSection
   hull: ArmorSection
}

export interface Modules {
   gun_id: number
   suspension_id: number
   turret_id: number
   radio_id: number
   engine_id: number
}

export interface Gun {
   move_down_arc: number
   caliber: number
   name: string
   weight: number
   move_up_arc: number
   fire_rate: number
   dispersion: number
   tag: string
   traverse_speed: number
   reload_time: number
   tier: number
   aim_time: number
}

export interface Turret {
   name: string
   weight: number
   view_range: number
   hp: number
   tag: string
   traverse_speed: number
   traverse_right_arc: number
   tier: number
   traverse_left_arc: number
}

export interface Radio {
   tier: number
   signal_range: number
   tag: string
   name: string
   weight: number
}

/**
 * Type of ammo
 * @ARMOR_PIERCING_CR = armor piercing Premium
 */
export type AmmoType = 'ARMOR_PIERCING' | 'ARMOR_PIERCING_CR' | 'HIGH_EXPLOSIVE'

export interface Ammo {
   penetration: number[]
   stun: null | unknown
   type: AmmoType
   damage: number[]
}

export interface IModuleDetails {
   engine: Engine
   siege: null | unknown
   max_ammo: number
   suspension: Suspension
   weight: number
   armor: Armor
   hp: number
   profile_id: string
   modules: Modules
   gun: Gun
   is_default: boolean
   turret: Turret
   hull_weight: number
   radio: Radio
   rapid: null | unknown
   speed_forward: number
   hull_hp: number
   speed_backward: number
   tank_id: number
   ammo: Ammo[]
   max_weight: number
}
