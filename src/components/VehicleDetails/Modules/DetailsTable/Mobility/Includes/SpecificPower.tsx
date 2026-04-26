import { useMemo } from 'react'
import useSetTotalWeight from '../Hooks/useSetTotalWeight'

import TableRowComponent from '../../Includes/TableRow'

export default function SpecificPower({
   enginePower,
   vehicleEnginePowerBase,
}: {
   enginePower: number
   vehicleEnginePowerBase: number
}) {
   const totalWeight = useSetTotalWeight()

   const specificPower = useMemo(() => {
      return (enginePower / totalWeight) * 1000
   }, [enginePower, totalWeight])

   const specificPowerBase = useMemo(() => {
      return (vehicleEnginePowerBase / totalWeight) * 1000
   }, [vehicleEnginePowerBase, totalWeight])

   const specificPowerDifference = useMemo(() => {
      return specificPower - specificPowerBase
   }, [specificPower, specificPowerBase])

   if (totalWeight === 0) return null

   return (
      <TableRowComponent
         iconSrc='/icons/mobility/enginePowerPerTon.png'
         titleText='Specific Power'
         valueText={specificPower}
         toFixed={2}
         unit='hp/tn'
         modifiers={[
            {
               difference: parseFloat(specificPowerDifference.toFixed(2)),
               improved: true,
            },
         ]}
      />
   )
}
