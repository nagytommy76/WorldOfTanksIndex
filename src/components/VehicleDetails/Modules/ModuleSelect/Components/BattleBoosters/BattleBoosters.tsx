import React from 'react'
import Image from 'next/image'

import type { IDevice } from '@/types/Devices/Devices'

import HtmlTooltip from '@/helpers/HtmlTooltip'
import ReturnTypography from '../../Includes/ModuleType'
import TooltipTitle from '../Devices/DeviceGroup/Includes/TooltipTitle/TooltipTitle'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function BattleBoosters({ battleBoosters }: { battleBoosters: IDevice[] }) {
   const isBlocked = true
   return (
      <>
         <ReturnTypography text='Directives' variant='h6' />
         <section className='grid grid-cols-3 gap-1 w-full'>
            {battleBoosters.map((booster) => (
               <HtmlTooltip
                  key={booster.id}
                  placement='top'
                  title={
                     <TooltipTitle
                        selectedDeviceTypeOverlay={'boosters'}
                        modifiers={booster.modifiers}
                        aggregateModifiers={booster.aggregateModifiers}
                     >
                        <Typography textAlign={'center'} variant='body1' gutterBottom className='font-bold'>
                           {booster.displayName}
                        </Typography>
                     </TooltipTitle>
                  }
                  disableInteractive
               >
                  <span>
                     <Button
                        disabled={isBlocked}
                        id='boosters-button'
                        onClick={() => {
                           console.log('BOOSTER CLICKED')
                        }}
                        sx={{
                           opacity: isBlocked ? 0.5 : 1,
                        }}
                     >
                        <div className='w-[70px] h-[70px] flex items-center justify-center' key={booster.id}>
                           <Image
                              src={`/icons/vehicle_modifiers/battle_booster/${booster.name}.png`}
                              alt={booster.name}
                              width={70}
                              height={70}
                           />
                        </div>
                     </Button>
                  </span>
               </HtmlTooltip>
            ))}
         </section>
      </>
   )
}
