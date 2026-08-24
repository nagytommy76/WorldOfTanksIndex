import React from 'react'

import type { IDevice } from '@/types/Devices/Devices'

import Image from 'next/image'

import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import CheckIcon from '@mui/icons-material/Check'

import HtmlTooltip from '@/helpers/HtmlTooltip'
import ReturnTypography from '../../../Includes/ModuleType'
import TooltipTitle from '../../Devices/DeviceGroup/Includes/TooltipTitle/TooltipTitle'

import Typography from '@mui/material/Typography'

import useGetCrewBoosters from '../Hooks/useGetCrewBoosters'

export default function CrewBattleBoosters() {
   const crewBoosters = useGetCrewBoosters()
   if (!crewBoosters) return
   return (
      <>
         <ReturnTypography text='Crew Directives' variant='h6' />
         <section className='grid grid-cols-3 gap-1 w-full'>
            {crewBoosters.map((crewBooster) => (
               <HtmlTooltip
                  key={crewBooster.id}
                  placement='top'
                  title={
                     <TooltipTitle
                        selectedDeviceTypeOverlay={'boosters'}
                        modifiers={crewBooster.modifiers}
                        aggregateModifiers={crewBooster.aggregateModifiers}
                        crewSkillModifier={crewBooster.crewSkillModifier}
                     >
                        <Typography textAlign={'center'} variant='body1' gutterBottom className='font-bold'>
                           {crewBooster.displayName}
                        </Typography>
                     </TooltipTitle>
                  }
                  disableInteractive
               >
                  <span>
                     <Button
                        disabled={false}
                        id='boosters-button'
                        onClick={() => {}}
                        //  sx={{
                        //     opacity: isBlocked ? 0.5 : 1,
                        //  }}
                     >
                        <Badge color='success' badgeContent={<CheckIcon />} invisible={true}>
                           <div
                              className='w-[70px] h-[70px] flex items-center justify-center relative'
                              key={crewBooster.id}
                           >
                              <Image
                                 src={`/icons/vehicle_modifiers/battle_booster/${crewBooster.name}.png`}
                                 alt={crewBooster.name}
                                 width={70}
                                 height={70}
                              />
                           </div>
                        </Badge>
                     </Button>
                  </span>
               </HtmlTooltip>
            ))}
         </section>
      </>
   )
}
