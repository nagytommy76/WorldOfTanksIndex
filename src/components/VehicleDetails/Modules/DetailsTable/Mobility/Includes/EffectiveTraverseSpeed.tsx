import { useContext, useEffect, useState } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import TableRowComponent from '../../Includes/TableRow'
import { calculateEffectiveTraverseSpeed } from '../../../Helpers/calculate'

export default function EffectiveTraverseSpeed({
   traverseSpeed,
   hardTerrainResistance,
   mediumTerrainResistance,
   softTerrainResistance,
}: {
   traverseSpeed: number
   hardTerrainResistance: number
   mediumTerrainResistance: number
   softTerrainResistance: number
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
   )
   const effectiveMediumTraverseSpeedBase = calculateEffectiveTraverseSpeed(
      vehicleChassisRotationSpeedBase,
      hardTerrainResistance,
      mediumTerrainResistance,
   )
   const effectiveSoftTraverseSpeedBase = calculateEffectiveTraverseSpeed(
      vehicleChassisRotationSpeedBase,
      hardTerrainResistance,
      softTerrainResistance,
   )

   useEffect(() => {
      setEffectiveHardTraverseSpeed(
         calculateEffectiveTraverseSpeed(traverseSpeed, hardTerrainResistance, hardTerrainResistance),
      )
      setEffectiveMediumTraverseSpeed(
         calculateEffectiveTraverseSpeed(traverseSpeed, hardTerrainResistance, mediumTerrainResistance),
      )
      setEffectiveSoftTraverseSpeed(
         calculateEffectiveTraverseSpeed(traverseSpeed, hardTerrainResistance, softTerrainResistance),
      )
   }, [
      traverseSpeed,
      vehicleChassisRotationSpeedBase,
      softTerrainResistance,
      mediumTerrainResistance,
      hardTerrainResistance,
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
