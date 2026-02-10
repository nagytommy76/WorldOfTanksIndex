import type { CardTanksType } from '@/types/VehicleDetails/Vehicle'

async function getAllVehicles(nation: string, prefixUrl: string = '') {
   const URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
   const filteredData = await fetch(`${URL}/api/techtree${prefixUrl}/?nation=${nation}`, { method: 'GET' })
   const response = (await filteredData.json()) as Promise<{
      vehicles: CardTanksType[]
   }>

   return (await response).vehicles
}

/**
 *
 * @param nation Vehicle's nation
 * @param url url -> /collectors or /premium default: 'empty string'
 * @returns
 */
export default async function returnVehicles(
   nation: string,
   prefixUrl: string = '',
): Promise<CardTanksType[]> {
   const collectorsVehicles = await getAllVehicles(nation, prefixUrl)
   return collectorsVehicles
}
