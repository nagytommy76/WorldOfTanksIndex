import { useContext, useEffect, useState } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import TableRowComponent from '../../Includes/TableRow'
import { calculateEffectiveTraverseSpeed } from '../../../Helpers/calculate'

export default function EffectiveTraverseSpeed({
   traverseSpeed,
   hardTerrainResistance,
   mediumTerrainResistance,
   softTerrainResistance,
   enginePower,
   stockEnginePower,
}: {
   traverseSpeed: number
   hardTerrainResistance: number
   mediumTerrainResistance: number
   softTerrainResistance: number
   enginePower: number
   stockEnginePower: number
}) {
   const {
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleChassis },
      },
   } = useContext(VehicleContext)
   const [effectiveHardTraverseSpeed, setEffectiveHardTraverseSpeed] = useState<number>(0)
   const [effectiveMediumTraverseSpeed, setEffectiveMediumTraverseSpeed] = useState<number>(0)
   const [effectiveSoftTraverseSpeed, setEffectiveSoftTraverseSpeed] = useState<number>(0)

   const vehicleChassisRotationSpeedBase = vehicleChassis[selectedModuleNames.vehicleChassis].rotationSpeed

   const effectiveHardTraverseSpeedBase = calculateEffectiveTraverseSpeed(
      vehicleChassisRotationSpeedBase,
      hardTerrainResistance,
      hardTerrainResistance,
      enginePower,
      stockEnginePower,
   )
   const effectiveMediumTraverseSpeedBase = calculateEffectiveTraverseSpeed(
      vehicleChassisRotationSpeedBase,
      hardTerrainResistance,
      mediumTerrainResistance,
      enginePower,
      stockEnginePower,
   )
   const effectiveSoftTraverseSpeedBase = calculateEffectiveTraverseSpeed(
      vehicleChassisRotationSpeedBase,
      hardTerrainResistance,
      softTerrainResistance,
      enginePower,
      stockEnginePower,
   )

   useEffect(() => {
      setEffectiveHardTraverseSpeed(
         calculateEffectiveTraverseSpeed(
            traverseSpeed,
            hardTerrainResistance,
            hardTerrainResistance,
            enginePower,
            stockEnginePower,
         ),
      )
      setEffectiveMediumTraverseSpeed(
         calculateEffectiveTraverseSpeed(
            traverseSpeed,
            hardTerrainResistance,
            mediumTerrainResistance,
            enginePower,
            stockEnginePower,
         ),
      )
      setEffectiveSoftTraverseSpeed(
         calculateEffectiveTraverseSpeed(
            traverseSpeed,
            hardTerrainResistance,
            softTerrainResistance,
            enginePower,
            stockEnginePower,
         ),
      )
   }, [
      traverseSpeed,
      vehicleChassisRotationSpeedBase,
      softTerrainResistance,
      mediumTerrainResistance,
      hardTerrainResistance,
      enginePower,
      stockEnginePower,
   ])

   return (
      <TableRowComponent
         iconSrc='/icons/mobility/chassisRotationSpeed.png'
         titleText='Effective Traverse Speed'
         valueText={[effectiveHardTraverseSpeed, effectiveMediumTraverseSpeed, effectiveSoftTraverseSpeed]}
         toFixed={2}
         unit='°/s'
         paddingLeft
         modifiers={[
            {
               difference: parseFloat(
                  (effectiveHardTraverseSpeed - effectiveHardTraverseSpeedBase).toFixed(2),
               ),
               improved: true,
            },
            {
               difference: parseFloat(
                  (effectiveMediumTraverseSpeed - effectiveMediumTraverseSpeedBase).toFixed(2),
               ),
               improved: true,
            },
            {
               difference: parseFloat(
                  (effectiveSoftTraverseSpeed - effectiveSoftTraverseSpeedBase).toFixed(2),
               ),
               improved: true,
            },
         ]}
      />
   )
}
