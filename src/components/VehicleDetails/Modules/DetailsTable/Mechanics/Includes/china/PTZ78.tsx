import TableRowComponent from '../../../Includes/TableRow'
import type { Ptz78Mechanics } from '../../Types'

export default function PTZ78({ mechanics }: { mechanics: Ptz78Mechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/pzt78/stagedJetBoostersEnginePower.png'
            titleText='Engine Power (boosters)'
            valueText={mechanics.mechanics.stagedJetBoostersEnginePower}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/pzt78/stagedJetBoostersTopSpeed.png'
            titleText='Top Speed'
            valueText={mechanics.mechanics.stagedJetBoostersTopSpeed}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/pzt78/stagedJetBoostersSpeedLimits.png'
            titleText='Reverse Speed'
            valueText={mechanics.mechanics.stagedJetBoostersSpeedLimits}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/pzt78/stagedJetBoostersRotationSpeed.png'
            titleText='Traverse Speed'
            valueText={mechanics.mechanics.stagedJetBoostersRotationSpeed}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/pzt78/stagedJetBoostersChargesCount.png'
            titleText='Boosts Available'
            valueText={mechanics.mechanics.stagedJetBoostersChargesCount}
            unit='pieces'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/pzt78/stagedJetBoostersChargeDuration.png'
            titleText='Boosts Duration'
            valueText={mechanics.mechanics.stagedJetBoostersChargeDuration}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/pzt78/stagedJetBoostersCooldownTime.png'
            titleText='Boost Cooldown'
            valueText={mechanics.mechanics.stagedJetBoostersCooldownTime}
            unit='seconds'
         />
      </>
   )
}
