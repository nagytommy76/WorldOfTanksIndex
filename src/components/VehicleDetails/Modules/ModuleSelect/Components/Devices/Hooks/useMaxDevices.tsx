import { useState, useEffect, useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

export default function useMaxDevices() {
   const { vehicleTier } = useContext(VehicleContext)
   const [maxDevices, setMaxDevices] = useState(3)

   useEffect(() => {
      if (vehicleTier === 3) setMaxDevices(2)
      else if (vehicleTier === 2 || vehicleTier === 1) setMaxDevices(1)
   }, [vehicleTier])
   return maxDevices
}
