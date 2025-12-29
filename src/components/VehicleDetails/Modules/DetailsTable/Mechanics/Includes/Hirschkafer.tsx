import TableRowComponent from '../../Includes/TableRow'
import type { HirschkaferMechanics } from '../Types'

export default function Hirschkafer({ mechanics }: { mechanics: HirschkaferMechanics }) {
   const preheatDispersionCap = -Number(mechanics.mechanics.preheatDispersionCap.split('%')[0])

   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/hirsch/furyMaxReloadEffAvgDpm.png'
            titleText='Damage Bonus at full preheat'
            valueText={((mechanics.overheatStacks.dmgBonus - 1) * 100).toFixed(2)}
            unit='%'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/hirsch/accuracyDispersionCap.png'
            titleText='Dispersion bonus at full preheat'
            valueText={preheatDispersionCap.toFixed(2)}
            unit='%'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/hirsch/preheatSpeedLimit.png'
            titleText='Preheat speed limit'
            valueText={mechanics.mechanics.preheatSpeedLimit.toFixed(2)}
            unit='km/h'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/hirsch/preheatTimeToFull.png'
            titleText='Time to full preheat'
            valueText={mechanics.mechanics.preheatTimeToFull}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/hirsch/preheatTimeToZero.png'
            titleText='Time to zero preheat'
            valueText={mechanics.mechanics.preheatTimeToZero}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/hirsch/preheatTransitionDelay.png'
            titleText='Preheat transition delay'
            valueText={mechanics.mechanics.preheatTransitionDelay}
            unit='seconds'
         />
      </>
   )
}
