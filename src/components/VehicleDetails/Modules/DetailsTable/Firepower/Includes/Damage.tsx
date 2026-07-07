import TableRowComponent from '../../Includes/TableRow'
import Typography from '@mui/material/Typography'
import type { ShellDiffMapState } from '@/types/VehicleDetails/Modifiers'

import AvgDpm from './AvgDpm'

export default function Damage({
   damage,
   minimumDamagePercent,
   shellDamageDiff,
   clipDamage,
   totalReloadTime,
   reloadBetweenShells,
   reloadTime,
}: {
   damage: number | number[]
   minimumDamagePercent: number
   shellDamageDiff: ShellDiffMapState['damage.armor']
   clipDamage: number
   totalReloadTime: number
   reloadBetweenShells: number
   reloadTime: number
}) {
   let avgArmorDMG: number | number[] = 0
   if (Array.isArray(damage)) {
      const minimumDamage = damage[0] * minimumDamagePercent
      const maximumDamage = damage[0] * 1.25

      const maximumDamageBase = damage[1] * 1.25
      const minimumDamageBase = damage[1] * minimumDamagePercent
      avgArmorDMG = []
      avgArmorDMG.push((minimumDamage + maximumDamage) / 2)
      avgArmorDMG.push((minimumDamageBase + maximumDamageBase) / 2)

      return (
         <>
            <TableRowComponent
               iconSrc='/icons/firepower/avgDamage.png'
               titleText='Damage'
               valueText={[avgArmorDMG[0], avgArmorDMG[1]]}
               unit='HP'
               TooltipTitle={
                  <section className='w-[250px] h-[110px] flex flex-col gap-2'>
                     <Typography variant='body1'>Avarage Damage +/- 25%</Typography>
                     <Typography variant='body2'>50m / 500m</Typography>
                     <Typography variant='body2'>
                        Min: {minimumDamage} / {minimumDamageBase} dmg
                     </Typography>
                     <Typography variant='body2'>
                        Max: {maximumDamage} / {maximumDamageBase} dmg
                     </Typography>
                  </section>
               }
            />
            <AvgDpm
               totalReloadTime={totalReloadTime}
               clipDamage={clipDamage}
               reloadBetweenShells={reloadBetweenShells}
               reloadTime={reloadTime}
               armorDamage={avgArmorDMG}
            />
         </>
      )
   }

   const minDamage = damage * minimumDamagePercent
   const maxDmg = damage * 1.25
   avgArmorDMG = (minDamage + maxDmg) / 2

   return (
      <>
         <TableRowComponent
            iconSrc='/icons/firepower/avgDamage.png'
            titleText='Damage'
            valueText={avgArmorDMG}
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
                  <Typography variant='body2'>Min: {minDamage} dmg</Typography>
                  <Typography variant='body2'>Max: {maxDmg} dmg</Typography>
               </section>
            }
         />
         <AvgDpm
            totalReloadTime={totalReloadTime}
            clipDamage={clipDamage}
            reloadBetweenShells={reloadBetweenShells}
            reloadTime={reloadTime}
            armorDamage={avgArmorDMG}
         />
      </>
   )
}
