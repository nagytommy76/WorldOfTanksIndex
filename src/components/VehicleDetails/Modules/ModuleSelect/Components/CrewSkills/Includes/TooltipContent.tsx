import React from 'react'
import Image from 'next/image'

import Typography from '@mui/material/Typography'

export default function TooltipContent({
   skillName,
   description,
   iconName,
   isSituational = false,
}: {
   skillName: string
   description: string
   iconName: string
   isSituational?: boolean
}) {
   return (
      <section className='bg-[#121212] min-w-[350px]'>
         <div className='p-2 flex align-center items-center mb-1'>
            <Image src={`/crewSkills/${iconName}.png`} alt={skillName} width={80} height={80} className='' />
            <div className=''>
               <Typography variant='h6' fontWeight={700}>
                  {skillName}
               </Typography>
               {isSituational ? (
                  <Typography className='text-white/50' variant='caption'>
                     Perk with a situational effect <span className='text-amber-500'>*</span>
                  </Typography>
               ) : (
                  <Typography className='text-white/50' variant='caption'>
                     Perk
                  </Typography>
               )}
            </div>
         </div>
         <div className='p-3 '>
            <Typography variant='body2'>{description}</Typography>
         </div>
         {isSituational && (
            <div className='p-3 my-2'>
               <Typography className='text-white/50' variant='caption'>
                  <span className='text-amber-500'>*</span> Situational effects trigger when certain
                  conditions are met in battle.
               </Typography>
            </div>
         )}
      </section>
   )
}
