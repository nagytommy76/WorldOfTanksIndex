import { useMemo, useContext } from 'react'
import { OrderContext } from '@/OrderContext/OrderContext'

import type { CardTanksType } from '@/types/VehicleDetails/Vehicle'

export default function useFilteredVehicles(orderVehicles: CardTanksType[]) {
   const {
      orderReducer: { vehicleTierToggle, vehicleTypesToggle, vehicleByName },
   } = useContext(OrderContext)

   const filteredVehicles = useMemo(() => {
      // If a vehicle name is selected, filter by name
      if (vehicleByName && vehicleByName.length > 0) {
         return orderVehicles.filter(
            (vehicle) => vehicle.tankDetails?.short_name === vehicleByName || vehicle.name === vehicleByName,
         )
      }
      // If no filters selected, return all
      if (vehicleTierToggle.length === 0 && vehicleTypesToggle.length === 0) {
         return orderVehicles
      }

      return orderVehicles.filter((vehicle) => {
         const tierMatch = vehicleTierToggle.length === 0 || vehicleTierToggle.includes(vehicle.tier)
         const typeMatch = vehicleTypesToggle.length === 0 || vehicleTypesToggle.includes(vehicle.type)

         return tierMatch && typeMatch
      })
   }, [orderVehicles, vehicleTierToggle, vehicleTypesToggle, vehicleByName])

   return filteredVehicles
}
