import { useState, useEffect } from 'react'

import TableRowComponent from '../../Includes/TableRow'
import { calculateEffectiveTopSpeed } from '../../../Helpers/calculate'

export default function EffectiveTopSpeed({
   enginePower,
   totalWeight,
   forwardSpeed,
   forwardSpeedBase,
   vehicleEnginePowerBase,
   hardTerrainResistance,
   mediumTerrainResistance,
   softTerrainResistance,
}: {
   enginePower: number
   totalWeight: number
   forwardSpeed: number
   forwardSpeedBase: number
   vehicleEnginePowerBase: number
   hardTerrainResistance: number
   mediumTerrainResistance: number
   softTerrainResistance: number
}) {
   const [effectiveHardTopSpeed, setEffectiveHardTopSpeed] = useState<number>(0)
   const [effectiveMediumTopSpeed, setEffectiveMediumTopSpeed] = useState<number>(0)
   const [effectiveSoftTopSpeed, setEffectiveSoftTopSpeed] = useState<number>(0)

   const effectiveHardTopSpeedBase = calculateEffectiveTopSpeed(
      vehicleEnginePowerBase,
      totalWeight / 1000,
      hardTerrainResistance,
      forwardSpeedBase,
   )
   const effectiveMediumTopSpeedBase = calculateEffectiveTopSpeed(
      vehicleEnginePowerBase,
      totalWeight / 1000,
      mediumTerrainResistance,
      forwardSpeedBase,
   )
   const effectiveSoftTopSpeedBase = calculateEffectiveTopSpeed(
      vehicleEnginePowerBase,
      totalWeight / 1000,
      softTerrainResistance,
      forwardSpeedBase,
   )

   useEffect(() => {
      setEffectiveHardTopSpeed(
         calculateEffectiveTopSpeed(enginePower, totalWeight / 1000, hardTerrainResistance, forwardSpeed),
      )
      setEffectiveMediumTopSpeed(
         calculateEffectiveTopSpeed(enginePower, totalWeight / 1000, mediumTerrainResistance, forwardSpeed),
      )

      setEffectiveSoftTopSpeed(
         calculateEffectiveTopSpeed(enginePower, totalWeight / 1000, softTerrainResistance, forwardSpeed),
      )
   }, [
      enginePower,
      forwardSpeed,
      totalWeight,
      softTerrainResistance,
      mediumTerrainResistance,
      hardTerrainResistance,
   ])

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
