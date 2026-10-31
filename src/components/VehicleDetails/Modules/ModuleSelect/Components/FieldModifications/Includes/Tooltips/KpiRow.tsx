import Typography from '@mui/material/Typography'

import type { IModifierOp } from '@Models/FieldModifications/FieldModificationTypes'
import { formatKpi } from '../../Helpers/formatKpi'

/**
 * @description One stat change, e.g. "+3% to engine power". Green when it improves the vehicle, red when it does not.
 */
export default function KpiRow({ kpi }: { kpi: IModifierOp }) {
   const { amount, text, isBeneficial } = formatKpi(kpi)

   return (
      <Typography variant='body2'>
         <span className={`font-bold ${isBeneficial ? 'text-green-500' : 'text-red-500'}`}>{amount}</span>
         <span>{text}</span>
      </Typography>
   )
}
