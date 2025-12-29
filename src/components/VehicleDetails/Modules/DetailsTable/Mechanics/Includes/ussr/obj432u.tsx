import TableRowComponent from '../../../Includes/TableRow'
import type { Obj432UMechanics } from '../../Types'

export default function obj432u({ mechanics }: { mechanics: Obj432UMechanics }) {
   const heatTimeToReachLevel = mechanics.mechanics.heatTimeToReachLevel.split('/')
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/obj432/heatAvgDmgPerLvl.png'
            titleText='Avg damage per heat level'
            valueText={mechanics.mechanics.heatAvgDmgPerLvl}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/obj432/heatTimeToReachLevel.png'
            titleText='Time to reach heat level'
            valueText={`
                ${heatTimeToReachLevel[0]} / ${heatTimeToReachLevel[1]} / ${heatTimeToReachLevel[2]}
            `}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/obj432/heatTimeBeforeOverheat.png'
            titleText='Time before charge overheating'
            valueText={mechanics.mechanics.heatTimeBeforeOverheat}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/obj432/heatChargeOverheatDuration.png'
            titleText='Charge overheat duration'
            valueText={mechanics.mechanics.heatChargeOverheatDuration}
            unit='seconds'
         />
      </>
   )
}
