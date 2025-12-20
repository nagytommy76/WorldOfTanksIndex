export type ModuleType =
   | 'vehicleTurret'
   | 'vehicleEngine'
   | 'vehicleChassis'
   | 'vehicleGun'
   | 'vehicleRadio'
   | 'shells'

/**
 * Type of ammo
 * @ARMOR_PIERCING_CR = armor piercing Premium
 */
export type AmmoType =
   | 'ARMOR_PIERCING'
   | 'ARMOR_PIERCING_CR'
   | 'ARMOR_PIERCING_CR_PREMIUM'
   | 'ARMOR_PIERCING_PREMIUM'
   | 'HIGH_EXPLOSIVE'
   | 'HIGH_EXPLOSIVE_MODERN'
   | 'HIGH_EXPLOSIVE_MODERN_PREMIUM'
   | 'HIGH_EXPLOSIVE_SPG_STUN'
   | 'HIGH_EXPLOSIVE_SPG'
   | 'HOLLOW_CHARGE_PREMIUM'
   | 'HOLLOW_CHARGE'
