import { useContext, useState, useEffect } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import TableRowComponent from '../../Includes/TableRow'
import { calculateEffectiveTopSpeed } from '../../../Helpers/calculate'

export default function EffectiveTopSpeed({
   enginePower,
   totalWeight,
   forwardSpeed,
   forwardSpeedBase,
   vehicleEnginePowerBase,
}: {
   enginePower: number
   totalWeight: number
   forwardSpeed: number
   forwardSpeedBase: number
   vehicleEnginePowerBase: number
}) {
   const {
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleChassis },
      },
   } = useContext(VehicleContext)
   const [effectiveHardTopSpeed, setEffectiveHardTopSpeed] = useState<number>(0)
   const [effectiveMediumTopSpeed, setEffectiveMediumTopSpeed] = useState<number>(0)
   const [effectiveSoftTopSpeed, setEffectiveSoftTopSpeed] = useState<number>(0)

   const effectiveHardTopSpeedBase = calculateEffectiveTopSpeed(
      vehicleEnginePowerBase,
      totalWeight / 1000,
      vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[0],
      forwardSpeedBase,
   )
   const effectiveMediumTopSpeedBase = calculateEffectiveTopSpeed(
      vehicleEnginePowerBase,
      totalWeight / 1000,
      vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[1],
      forwardSpeedBase,
   )
   const effectiveSoftTopSpeedBase = calculateEffectiveTopSpeed(
      vehicleEnginePowerBase,
      totalWeight / 1000,
      vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[2],
      forwardSpeedBase,
   )

   useEffect(() => {
      setEffectiveHardTopSpeed(
         calculateEffectiveTopSpeed(
            enginePower,
            totalWeight / 1000,
            vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[0],
            forwardSpeed,
         ),
      )
      setEffectiveMediumTopSpeed(
         calculateEffectiveTopSpeed(
            enginePower,
            totalWeight / 1000,
            vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[1],
            forwardSpeed,
         ),
      )

      setEffectiveSoftTopSpeed(
         calculateEffectiveTopSpeed(
            enginePower,
            totalWeight / 1000,
            vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[2],
            forwardSpeed,
         ),
      )
   }, [enginePower, forwardSpeed, selectedModuleNames.vehicleChassis, totalWeight, vehicleChassis])

   return (
      <TableRowComponent
         iconSrc='/icons/mobility/speedLimits.png'
         titleText='Effective Top Speed'
         valueText={[effectiveHardTopSpeed, effectiveMediumTopSpeed, effectiveSoftTopSpeed]}
         unit='km/h'
         toFixed={2}
         paddingLeft
         modifiers={[
            {
               difference: parseFloat((effectiveHardTopSpeed - effectiveHardTopSpeedBase).toFixed(2)),
               improved: true,
            },
            {
               difference: parseFloat((effectiveMediumTopSpeed - effectiveMediumTopSpeedBase).toFixed(2)),
               improved: true,
            },
            {
               difference: parseFloat((effectiveSoftTopSpeed - effectiveSoftTopSpeedBase).toFixed(2)),
               improved: true,
            },
         ]}
      />
   )
}
