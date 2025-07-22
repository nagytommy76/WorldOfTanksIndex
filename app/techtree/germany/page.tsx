import { ITechTreeVehicleType } from '@Types/techTreeTypes'
import { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Tech tree for German vehicles | World of Tanks Index',
   description: 'Tech tree for German vehicles in World of Tanks game',
}

import PremiumTanks from '@/TechtreeTanks/PremiumTanks'

async function getAllGermanVehicles() {
   const filteredData = await fetch(
      `https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=${process.env.WOT_APP_ID}&nation=germany&fields=tank_id%2C+is_premium%2C+images%2C+type%2C+short_name%2C+name%2C+nation%2C+tier%2C+price_gold%2C+price_credit%2C+next_tanks`,
      { method: 'GET' }
   )
   const response = (await filteredData.json()) as Promise<{
      data: { [index: number]: ITechTreeVehicleType }
   }>
   return await response
}

export default async function page() {
   const allGermanVehicles = await getAllGermanVehicles()

   const groupedTanksByTier: { [index: number]: ITechTreeVehicleType[] } = {}
   const groupedPremiumTanksByTier: { [index: number]: ITechTreeVehicleType[] } = {}
   const groupedCollectorTanksByTier: { [index: number]: ITechTreeVehicleType[] } = {}

   Object.keys(allGermanVehicles.data).map((key) => {
      const currentVehicle = allGermanVehicles.data[Number(key)]
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

   console.log(groupedTanksByTier[8])
   console.log(groupedPremiumTanksByTier[8])
   // console.log(groupedCollectorTanksByTier[4])
   return (
      <>
         {/* {groupedTanksByTier[10].map((techTreeVehicle) => (
            <div key={techTreeVehicle.tank_id}>
               <h1>{techTreeVehicle.name}</h1>
            </div>
         ))} */}
         <PremiumTanks groupedPremiumTanksByTier={groupedPremiumTanksByTier} />
      </>
   )
}
