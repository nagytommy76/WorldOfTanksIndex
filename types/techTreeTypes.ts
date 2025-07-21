export interface ITechTreeVehicleType {
   images: {
      big_icon: string
      contour_icon: string
      small_icon: string
   }
   // If collector's vehicle = is_premium: false, naxt_tanks: null, price_credit > 0
   next_tanks: {
      [index: number]: number
   } | null
   is_premium: boolean
   name: string
   short_name: string
   nation: string
   price_credit: number | null
   price_gold: number | null
   tank_id: number
   tier: number
   type: string
}
