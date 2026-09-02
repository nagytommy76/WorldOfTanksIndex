import { useContext } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'

import Image from 'next/image'

import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import CheckIcon from '@mui/icons-material/Check'

import HtmlTooltip from '@/helpers/HtmlTooltip'
import ReturnTypography from '../../../Includes/ModuleType'
import TooltipTitle from '../../Devices/DeviceGroup/Includes/TooltipTitle/TooltipTitle'

import Typography from '@mui/material/Typography'

import useGetCrewBoosters from '../Hooks/useGetCrewBoosters'
import { CrewSkillRoles } from '@/Classes/CrewSkills'
import type { IDevice } from '@/types/Devices/Devices'

export default function CrewBattleBoosters() {
   const crewBoosters = useGetCrewBoosters()
   const {
      crewReducer: { commander, crewMembers },
   } = useContext(CrewContext)

   function AddCrewBooster(boosterName: string, crewBooster: IDevice) {
      const boosterSplit = boosterName.split('_')

      switch (boosterSplit.length) {
         /**
          * naturalCover || fireFighting
          */
         case 1:
            break
         default:
            const crewSkillRole = boosterSplit[0] as 'commander' | 'gunner' | 'loader' | 'driver'

            if (crewSkillRole === 'commander') {
               const commanderHasSkill: boolean = commander.appliedCrewSkills?.has(boosterName) ? true : false
            } else {
               const currentCrewMember = crewMembers[crewSkillRole]
               let crewMemberHasSkill: boolean = false

               /**
                * in this case a crew member has an applied crew skill: gunner_rancorous, loader_pedant
                */
               if (currentCrewMember && currentCrewMember.appliedCrewSkills?.has(boosterName)) {
                  crewMemberHasSkill = true

                  const test = currentCrewMember.appliedCrewSkills.get(boosterName)?.map((skill) => {
                     return {
                        ...skill,
                        value: (skill.value *= crewBooster.crewSkillModifier?.mul?.value || 1),
                     }
                  })

                  console.log(test)

                  if (test) currentCrewMember.appliedCrewSkills.set(boosterName, test)
               } else {
               }
            }

            break
      }
   }

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
                        price={crewBooster.price}
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
                        onClick={() => AddCrewBooster(crewBooster.icon, crewBooster)}
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
