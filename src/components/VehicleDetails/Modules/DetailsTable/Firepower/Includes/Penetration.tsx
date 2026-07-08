import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { CrewContext } from '@/CrewContext/CrewContext'

import applyStatPipeline from '@/utils/applyStatPipeline'
import createCrewSkillsTransformer from '@/utils/ApplyCrewSkillModifier'

import TableRowComponent from '../../Includes/TableRow'
import Typography from '@mui/material/Typography'

export default function Penetration() {
   const {
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { shells },
      },
      modifiersReducer: {
         modifiers: { shells: shellsModifiers },
      },
   } = useContext(VehicleContext)
   const {
      crewReducer: { crewMembers },
      isCalculateSituational,
   } = useContext(CrewContext)

   const piercingPower = useMemo(
      () => shells[selectedModuleNames.shells].piercingPower,
      [shells, selectedModuleNames],
   )

   const { minPenetration50, minPenetration500, maxPenetration50, maxPenetration500 } = useMemo(
      () =>
         applyStatPipeline(
            {
               minPenetration50: 0.75,
               minPenetration500: 0.75,
               maxPenetration50: 1.25,
               maxPenetration500: 1.25,
            },
            [
               createCrewSkillsTransformer(crewMembers.loader, isCalculateSituational),
               createCrewSkillsTransformer(crewMembers.gunner, isCalculateSituational),
            ],
         ),
      [crewMembers, isCalculateSituational],
   )

   const minimumPenetrationAt50 = useMemo(
      () => piercingPower[0] * minPenetration50,
      [piercingPower, minPenetration50],
   )
   const maximumPenetrationAt50 = useMemo(
      () => piercingPower[0] * maxPenetration50,
      [piercingPower, maxPenetration50],
   )

   const minimumPenetrationAt500 = useMemo(
      () => piercingPower[1] * minPenetration500,
      [piercingPower, minPenetration500],
   )
   const maximumPenetrationAt500 = useMemo(
      () => piercingPower[1] * maxPenetration500,
      [piercingPower, maxPenetration500],
   )

   const avgPenetrationAt50 = useMemo(
      () => (maximumPenetrationAt50 + minimumPenetrationAt50) / 2,
      [minimumPenetrationAt50, maximumPenetrationAt50],
   )
   const avgPenetrationAt500 = useMemo(
      () => (maximumPenetrationAt500 + minimumPenetrationAt500) / 2,
      [minimumPenetrationAt500, maximumPenetrationAt500],
   )

   return (
      <TableRowComponent
         iconSrc='/icons/firepower/avgPiercingPower.png'
         titleText='Penetration (at 50/500 m)'
         valueText={[avgPenetrationAt50, avgPenetrationAt500]}
         unit='mm'
         modifiers={
            shellsModifiers && [
               {
                  difference: shellsModifiers['piercingPower[0]']?.difference ?? 0,
                  improved: shellsModifiers?.['piercingPower[0]']?.improved || false,
               },
               {
                  difference: shellsModifiers?.['piercingPower[1]']?.difference ?? 0,
                  improved: shellsModifiers?.['piercingPower[1]']?.improved || false,
               },
            ]
         }
         TooltipTitle={
            <section className='min-w-[220px] min-h-[90px] flex flex-col gap-2'>
               <Typography variant='body1'>Avarage Penetration +/- 25%</Typography>
               <div>
                  <Typography variant='body1'>At 50 meters</Typography>
                  <Typography variant='body2'>Min: {minimumPenetrationAt50} pen</Typography>
                  <Typography variant='body2'>Max: {maximumPenetrationAt50} pen</Typography>
               </div>
               <div>
                  <Typography variant='body1'>At 500 meters</Typography>
                  <Typography variant='body2'>Min: {minimumPenetrationAt500} pen</Typography>
                  <Typography variant='body2'>Max: {maximumPenetrationAt500} pen</Typography>
               </div>
            </section>
         }
      />
   )
}
