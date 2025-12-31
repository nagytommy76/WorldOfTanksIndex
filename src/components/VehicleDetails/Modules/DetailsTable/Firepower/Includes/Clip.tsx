import type { IClip } from '@/types/VehicleDetails/Guns'
import TableRowComponent from '../../Includes/TableRow'

export default function Clip({
   reloadBetweenShells,
   clipDamage,
   clip,
}: {
   reloadBetweenShells: number
   clipDamage: number
   clip: IClip
}) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/firepower/burstFireRate.png'
            titleText='Clip size'
            valueText={clip.count}
            unit='rounds'
         />
         <TableRowComponent
            iconSrc='/icons/firepower/burstFireRate.png'
            titleText='Reload between shells'
            valueText={reloadBetweenShells}
            unit='s'
         />
         <TableRowComponent
            iconSrc='/icons/firepower/chargeableBurstSize.png'
            titleText='Clip damage'
            valueText={clipDamage}
            unit='HP'
         />
      </>
   )
}
