import TableRowComponent from '../../../Includes/TableRow'
import type { CavMod71Mechanics } from '../../Types'

export default function CAVmod71({ mechanics }: { mechanics: CavMod71Mechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/cavMod71/autoreloaderSurgeMaxCharges.png'
            titleText='Charges'
            valueText={mechanics.mechanics.autoreloaderSurgeMaxCharges}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/cavMod71/autoreloaderSurgeInitCharges.png'
            titleText='Charges at Start of Battle'
            valueText={mechanics.mechanics.autoreloaderSurgeInitCharges}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/cavMod71/autoreloaderSurgeChargeTimeSlow.png'
            titleText='Base Charge Cooldown'
            valueText={mechanics.mechanics.autoreloaderSurgeChargeTimeSlow}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/cavMod71/autoreloaderSurgeChargeTimeFast.png'
            titleText='Charge Cooldown at Full clip'
            valueText={mechanics.mechanics.autoreloaderSurgeChargeTimeFast}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/cavMod71/autoreloaderSurgeInitCharges.png'
            titleText='Accelerated Shell Loading Time'
            valueText={mechanics.mechanics.autoreloaderSurgeInitCharges}
            unit='seconds'
         />
      </>
   )
}
