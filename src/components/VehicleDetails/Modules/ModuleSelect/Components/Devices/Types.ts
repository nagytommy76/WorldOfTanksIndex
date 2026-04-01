export type DeviceTypes = Exclude<OverlayTypes, 'none' | 'supplySlotActive'>

export type SupplySlotTypes = 'mobility' | 'survivability' | 'firepower' | 'stealth'

export type OverlayTypes =
   | 'equipmentTrophyBasic'
   | 'equipmentTrophyUpgraded'
   | 'equipmentPlus'
   | 'equipmentModernized_1'
   | 'equipmentModernized_2'
   | 'equipmentModernized_3'
   | 'none'
   | 'tiers'
   | 'supplySlotActive'
