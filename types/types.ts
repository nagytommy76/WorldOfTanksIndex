export type Params = Promise<{ tank_id: string; tank_name: string }>

export type VehicleRoles =
   | 'role_ATSPG_assault'
   | 'role_ATSPG_sniper'
   | 'role_ATSPG_support'
   | 'role_ATSPG_universal'
   | 'role_HT_assault'
   | 'role_HT_break'
   | 'role_HT_support'
   | 'role_HT_universal'
   | 'role_LT_universal'
   | 'role_LT_wheeled'
   | 'role_MT_assault'
   | 'role_MT_sniper'
   | 'role_MT_support'
   | 'role_MT_universal'
   | 'role_SPG'
