import TableRowComponent from '../../Includes/TableRow'
import Typography from '@mui/material/Typography'

export default function Damage({ damage }: { damage: number }) {
   return (
      <TableRowComponent
         iconSrc='/icons/firepower/avgDamage.png'
         titleText='Damage'
         valueText={damage}
         unit='HP'
         TooltipTitle={
            <section className='w-[220px] h-[90px] flex flex-col gap-2'>
               <Typography variant='body1'>Avarage Damage +/- 25%</Typography>
               <Typography variant='body2'>Min: {damage * 0.75} dmg</Typography>
               <Typography variant='body2'>Max: {damage * 1.25} dmg</Typography>
            </section>
         }
      />
   )
}
