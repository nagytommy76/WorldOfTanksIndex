import type { TechTreeVehiclesType } from '@/types/VehicleDetails/Vehicle'

// async function getAllVehicles(nation: string) {
//    const filteredData = await fetch(
//       `https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=${process.env.WOT_APP_ID}&nation=${nation}&fields=tag%2C+tank_id%2C+is_premium%2C+images%2C+type%2C+short_name%2C+name%2C+nation%2C+tier%2C+price_gold%2C+price_credit%2C+next_tanks%2C+prices_xp`,
//       { method: 'GET' }
//    )
//    const response = (await filteredData.json()) as Promise<{
//       data: { [tank_id: number]: ITechTreeVehicleType }
//    }>
//    return await response
// }
async function getAllTechTreeVehicles(nation: string) {
   const filteredData = await fetch(`http://localhost:3000/api/techtree/?nation=${nation}`, { method: 'GET' })
   const response = (await filteredData.json()) as Promise<{
      techTreeVehicles: TechTreeVehiclesType[]
   }>

   return (await response).techTreeVehicles
}

export default async function returnVehicles(nation: string) {
   const allTechTreeVehicles = await getAllTechTreeVehicles(nation)
   console.log(allTechTreeVehicles)

   // const groupedTanksByTier: { [tier: number]: ITechTreeVehicleType[] } = {}
   // const groupedPremiumTanksByTier: { [tier: number]: ITechTreeVehicleType[] } = {}
   // const groupedCollectorTanksByTier: { [tier: number]: ITechTreeVehicleType[] } = {}
   const groupedTanksByTier: TechTreeVehiclesType[] = allTechTreeVehicles
   const groupedPremiumTanksByTier = {}
   const groupedCollectorTanksByTier = {}

   // Object.keys(allVehicles.data).map((key) => {
   //    const currentVehicle = allVehicles.data[Number(key)]
   //    if (currentVehicle.is_premium === true) {
   //       groupedPremiumTanksByTier[currentVehicle.tier] ||= []
   //       groupedPremiumTanksByTier[currentVehicle.tier].push(currentVehicle)
   //    } else if (currentVehicle.price_credit !== null || currentVehicle.is_premium === false) {
   //       groupedTanksByTier[currentVehicle.tier] ||= []
   //       groupedTanksByTier[currentVehicle.tier].push(currentVehicle)
   //    }
   //    if (
   //       currentVehicle.price_credit !== null &&
   //       currentVehicle.price_gold === 0 &&
   //       currentVehicle.prices_xp === null
   //    ) {
   //       groupedCollectorTanksByTier[currentVehicle.tier] ||= []
   //       groupedCollectorTanksByTier[currentVehicle.tier].push(currentVehicle)
   //    }
   // })

   return { groupedTanksByTier, groupedPremiumTanksByTier, groupedCollectorTanksByTier }
}
