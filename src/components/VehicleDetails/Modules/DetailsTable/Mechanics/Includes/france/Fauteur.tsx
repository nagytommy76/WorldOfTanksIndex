import TableRowComponent from '../../../Includes/TableRow'
import { FauteurMechanics } from '../../Types'

export default function Fauteur({ mechanics }: { mechanics: FauteurMechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/fauteur/propellantPreLimitDamageBonus.png'
            titleText='Maximum Pre-Limit Damage Bonus'
            valueText={mechanics.mechanics.propellantPreLimitDamageBonus}
            unit='%'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/fauteur/propellantPostLimitDamageSpike.png'
            titleText='Post-Limit Damage Spike'
            valueText={mechanics.mechanics.propellantPostLimitDamageSpike}
            unit='HP'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/fauteur/propellantPostLimitDamageBonus.png'
            titleText='Maximum Post-Limit Damage Bonus'
            valueText={mechanics.mechanics.propellantPostLimitDamageBonus}
            unit='%'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/fauteur/propellantChargingPerSec.png'
            titleText='Charge Accumulation Speed'
            valueText={mechanics.mechanics.propellantChargingPerSec}
            unit='%/s'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/fauteur/propellantChargeSpendingAfterShot.png'
            titleText='Charge Spent per Shot'
            valueText={mechanics.mechanics.propellantChargeSpendingAfterShot}
            unit='%'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/fauteur/propellantChargeLimit.png'
            titleText='Charge Limit'
            valueText={mechanics.mechanics.propellantChargeLimit}
            unit='%'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/fauteur/propellantDischargingPerSec.png'
            titleText='Charge Loss Speed'
            valueText={mechanics.mechanics.propellantDischargingPerSec}
            unit='%/s'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/fauteur/propellantPostLimitDispersion.png'
            titleText='Post-Limit Dispersion at 100m'
            valueText={mechanics.mechanics.propellantPostLimitDispersion}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/fauteur/propellantPostLimitAimingTime.png'
            titleText='Post-Limit Aiming Time'
            valueText={mechanics.mechanics.propellantPostLimitAimingTime}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/fauteur/propellantOverchargeSwitchCooldown.png'
            titleText='Limiter Toggle Cooldown'
            valueText={mechanics.mechanics.propellantOverchargeSwitchCooldown}
            unit='seconds'
         />
      </>
   )
}
