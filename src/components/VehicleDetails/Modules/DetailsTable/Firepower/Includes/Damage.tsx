import TableRowComponent from '../../Includes/TableRow'
import Typography from '@mui/material/Typography'
import type { ShellDiffMapState } from '@/types/VehicleDetails/Modifiers'

export default function Damage({
   damage,
   shellDamageDiff,
}: {
   damage: number | number[]
   shellDamageDiff: ShellDiffMapState['damage.armor']
}) {
   if (Array.isArray(damage)) {
      return (
         <TableRowComponent
            iconSrc='/icons/firepower/avgDamage.png'
            titleText='Damage'
            valueText={`${damage[0]} / ${damage[1]}`}
            unit='HP'
            TooltipTitle={
               <section className='w-[250px] h-[110px] flex flex-col gap-2'>
                  <Typography variant='body1'>Avarage Damage +/- 25%</Typography>
                  <Typography variant='body2'>50m / 500m</Typography>
                  <Typography variant='body2'>
                     Min: {damage[0] * 0.75} / {damage[1] * 0.75} dmg
                  </Typography>
                  <Typography variant='body2'>
                     Max: {damage[0] * 1.25} / {damage[1] * 1.25} dmg
                  </Typography>
               </section>
            }
         />
      )
   }

   return (
      <TableRowComponent
         iconSrc='/icons/firepower/avgDamage.png'
         titleText='Damage'
         valueText={damage}
         unit='HP'
         modifiers={[
            {
               difference: shellDamageDiff?.difference || 0,
               improved: shellDamageDiff?.improved || false,
            },
         ]}
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
