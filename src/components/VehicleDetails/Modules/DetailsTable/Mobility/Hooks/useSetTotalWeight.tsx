import { useContext, useEffect, useState } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

export default function useSetTotalWeight() {
   const [totalWeight, setTotalWeight] = useState<number>(0)
   const {
      hull,
      fuelTank,
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleChassis, vehicleTurret, vehicleGun, vehicleEngine, vehicleRadio },
      },
   } = useContext(VehicleContext)

   useEffect(() => {
      const totalWeight =
         fuelTank[0]?.weight +
         hull?.weight +
         vehicleChassis[selectedModuleNames.vehicleChassis]?.weight +
         vehicleEngine[selectedModuleNames.vehicleEngine]?.weight +
         vehicleTurret[selectedModuleNames.vehicleTurret]?.weight +
         vehicleGun[selectedModuleNames.vehicleGun]?.weight +
         vehicleRadio[selectedModuleNames.vehicleRadio]?.weight
      if (totalWeight) setTotalWeight(totalWeight)
   }, [
      selectedModuleNames,
      hull,
      fuelTank,
      vehicleChassis,
      vehicleEngine,
      vehicleTurret,
      vehicleGun,
      vehicleRadio,
   ])

   return totalWeight
}
