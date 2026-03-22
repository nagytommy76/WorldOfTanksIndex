/**
 * @param {crystal} crystal Bond equipments (DELUXE)
 * @param {credits} credits Tiers equipments
 * @param {equipCoin} equipCoin Components
 */
type IDevicePrice = { crystal: number } | { credits: number } | { equipCoin: number }

interface IModifier {
   /**
    * @param {string} name The name of the modifier
    */
   name: string
   /**
    * @param {number} value The value of the modifier
    */
   value: number
   /**
    * @param {number | null} specValue Tiers devices have this value -> if put in the correct slot
    */
   specValue: number | null // required: false, default: null
}

interface IAggregateModifier {
   /**
    * @param {string} name The name of the modifier
    */
   name: string
   /**
    * @param {number} value The value of the modifier
    */
   value: number
   /**
    * @param {string[]} vehicleTypes Compatible with vehicle types
    */
   vehicleTypes: string[]
}

interface IVehicleLevel {
   min: number
   max: number | null // required: false, default: null
}

export interface IDevice {
   /**
    * @param {number} id The ID of the device
    */
   id: number // required: true
   /**
    * @param {string} icon The icon name of the device
    */
   icon: string
   /**
    * @param {string} name The XMLname of the device
    */
   name: string
   /**
    * @param {string} displayName The display name of the device from WG API
    */
   displayName: string
   modifiers: IModifier[] | null // default: null
   aggregateModifiers: IAggregateModifier[] | null // default: null
   price: IDevicePrice
   /**
    * @param vehicleLevel The vehicle level of the device (min, max)
    */
   vehicleLevel: IVehicleLevel
   /**
    * @param {string[] |null} vehicleIncludeFilterTags vehicle class INCLUDE tags (lightTank, mediumTank...)
    */
   vehicleIncludeFilterTags: string[] | null
   /**
    * @param {string[] |null} vehicleExcludeFilterTags vehicle class EXLUDE tags (lightTank, mediumTank...)
    */
   vehicleExcludeFilterTags: string[] | null
   /**
    * @param {string[] |null} incompatibleTags Equipment EXLUDE tags (improvedSights, additInvisibilityDevice...)
    */
   incompatibleTags: string[] | null
   /**
    * @param {string[] |null} tags The tags of the device
    */
   tags: string[]
   /**
    * @param {string} deviceType The type of the device (deluxe, trophy, tier, boost, modernized)
    */
   deviceType: string
   /**
    * @param {string} archeType Can be groupped by it. (turbocharger, )
    */
   archeType: string
}
