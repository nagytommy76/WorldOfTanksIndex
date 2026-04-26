import { useContext, useEffect, useState } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import TableRowComponent from '../../Includes/TableRow'
import { calculateEffectiveTraverseSpeed } from '../../../Helpers/calculate'

export default function EffectiveTraverseSpeed({ traverseSpeed }: { traverseSpeed: number }) {
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
      vehicleChassis[selectedModuleNames.vehicleChassis].terrainResistance[0],
      vehicleChassis[selectedModuleNames.vehicleChassis].terrainResistance[0],
   )
   const effectiveMediumTraverseSpeedBase = calculateEffectiveTraverseSpeed(
      vehicleChassisRotationSpeedBase,
      vehicleChassis[selectedModuleNames.vehicleChassis].terrainResistance[0],
      vehicleChassis[selectedModuleNames.vehicleChassis].terrainResistance[1],
   )
   const effectiveSoftTraverseSpeedBase = calculateEffectiveTraverseSpeed(
      vehicleChassisRotationSpeedBase,
      vehicleChassis[selectedModuleNames.vehicleChassis].terrainResistance[0],
      vehicleChassis[selectedModuleNames.vehicleChassis].terrainResistance[2],
   )

   useEffect(() => {
      setEffectiveHardTraverseSpeed(
         calculateEffectiveTraverseSpeed(
            traverseSpeed,
            vehicleChassis[selectedModuleNames.vehicleChassis].terrainResistance[0],
            vehicleChassis[selectedModuleNames.vehicleChassis].terrainResistance[0],
         ),
      )
      setEffectiveMediumTraverseSpeed(
         calculateEffectiveTraverseSpeed(
            traverseSpeed,
            vehicleChassis[selectedModuleNames.vehicleChassis].terrainResistance[0],
            vehicleChassis[selectedModuleNames.vehicleChassis].terrainResistance[1],
         ),
      )
      setEffectiveSoftTraverseSpeed(
         calculateEffectiveTraverseSpeed(
            traverseSpeed,
            vehicleChassis[selectedModuleNames.vehicleChassis].terrainResistance[0],
            vehicleChassis[selectedModuleNames.vehicleChassis].terrainResistance[2],
         ),
      )
   }, [traverseSpeed, vehicleChassisRotationSpeedBase, vehicleChassis, selectedModuleNames.vehicleChassis])

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
