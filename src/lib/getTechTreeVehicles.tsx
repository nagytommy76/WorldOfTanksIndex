import type { ITechTreeVehicleType } from '@/types/techTreeTypes'

async function getAllVehicles(nation: string) {
   const filteredData = await fetch(
      `https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=${process.env.WOT_APP_ID}&nation=${nation}&fields=tank_id%2C+is_premium%2C+images%2C+type%2C+short_name%2C+name%2C+nation%2C+tier%2C+price_gold%2C+price_credit%2C+next_tanks`,
      { method: 'GET' }
   )
   const response = (await filteredData.json()) as Promise<{
      data: { [index: number]: ITechTreeVehicleType }
   }>
   return await response
}

export default async function returnVehicles(nation: string) {
   const allVehicles = await getAllVehicles(nation)

   const groupedTanksByTier: { [index: number]: ITechTreeVehicleType[] } = {}
   const groupedPremiumTanksByTier: { [index: number]: ITechTreeVehicleType[] } = {}
   const groupedCollectorTanksByTier: { [index: number]: ITechTreeVehicleType[] } = {}

   Object.keys(allVehicles.data).map((key) => {
      const currentVehicle = allVehicles.data[Number(key)]
      if (currentVehicle.is_premium === true) {
         groupedPremiumTanksByTier[currentVehicle.tier] ||= []
         groupedPremiumTanksByTier[currentVehicle.tier].push(currentVehicle)
      } else if (currentVehicle.price_credit !== null || currentVehicle.is_premium === false) {
         groupedTanksByTier[currentVehicle.tier] ||= []
         groupedTanksByTier[currentVehicle.tier].push(currentVehicle)
      } else if (
         currentVehicle.price_credit !== null &&
         currentVehicle.price_gold === 0 &&
         currentVehicle.next_tanks === null
      ) {
         groupedCollectorTanksByTier[currentVehicle.tier] ||= []
         groupedCollectorTanksByTier[currentVehicle.tier].push(currentVehicle)
      }
   })

   return { groupedTanksByTier, groupedPremiumTanksByTier, groupedCollectorTanksByTier }
}
