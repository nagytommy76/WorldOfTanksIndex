import TableRowComponent from '../../../Includes/TableRow'
import type { STK2Mechanics } from '../../Types'

export default function STK2({ mechanics }: { mechanics: STK2Mechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/stk2/coolingDelay.png'
            titleText='Cooling Delay'
            valueText={mechanics.mechanics.coolingDelay}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/stk2/coolingTime.png'
            titleText='Fully Heated Gun Cooling Time'
            valueText={mechanics.mechanics.coolingTime}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/stk2/heatingPerShot.png'
            titleText=' Heat Per Shot'
            valueText={mechanics.mechanics.heatingPerShot}
            unit=''
         />
      </>
   )
}
