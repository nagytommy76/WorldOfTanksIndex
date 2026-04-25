import React from 'react'
import type { ExecutorMechanics } from '../../Types'
import TableRowComponent from '../../../Includes/TableRow'

export default function Executor({ mechanics }: { mechanics: ExecutorMechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mobility/enginePower.png'
            titleText='Engine Power'
            valueText={mechanics.mechanics.wheeledDashEnginePower}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/executor/wheeledDashTopSpeed.png'
            titleText='Top Speed'
            valueText={mechanics.mechanics.wheeledDashTopSpeed}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/executor/wheeledDashReverseSpeed.png'
            titleText='Reverse Speed'
            valueText={mechanics.mechanics.wheeledDashReverseSpeed}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/executor/wheeledDashAbilityDuration.png'
            titleText='Duration'
            valueText={mechanics.mechanics.wheeledDashAbilityDuration}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/executor/wheeledDashAbilityReloadTime.png'
            titleText='Cooldown'
            valueText={mechanics.mechanics.wheeledDashAbilityReloadTime}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/executor/wheeledDashAbilityReloadTimeBonus.png'
            titleText='Cooldown Bonus'
            valueText={mechanics.mechanics.wheeledDashAbilityReloadTimeBonus}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/executor/wheeledDashSpeedLimits.png'
            titleText='Cooldown Bonus Speed Threshold'
            valueText={mechanics.mechanics.wheeledDashSpeedLimits}
            unit='km/h'
         />
      </>
   )
}
