import { useMemo } from 'react'
import { useContext } from 'react'
import { OrderContext } from '@/OrderContext/OrderContext'

export default function useFilteredVehicles() {
   const {
      orderReducer: { vehicleTierToggle, vehicleTypesToggle, orderVehicles },
   } = useContext(OrderContext)

   const filteredVehicles = useMemo(() => {
      // If no filters selected, return all
      if (vehicleTierToggle.length === 0 && vehicleTypesToggle.length === 0) {
         return orderVehicles
      }

      return orderVehicles.filter((vehicle) => {
         const tierMatch = vehicleTierToggle.length === 0 || vehicleTierToggle.includes(vehicle.tier)
         const typeMatch = vehicleTypesToggle.length === 0 || vehicleTypesToggle.includes(vehicle.type)

         return tierMatch && typeMatch
      })
   }, [orderVehicles, vehicleTierToggle, vehicleTypesToggle])

   return filteredVehicles
}
