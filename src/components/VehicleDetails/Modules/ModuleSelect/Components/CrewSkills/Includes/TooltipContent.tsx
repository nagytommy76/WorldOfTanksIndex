import React from 'react'
import Image from 'next/image'

import CrewSkills from '@/Classes/CrewSkills'

import Typography from '@mui/material/Typography'

export default function TooltipContent({ skill }: { skill: CrewSkills }) {
   return (
      <section className='bg-[#121212] min-w-[350px]'>
         <div className='p-2 flex align-center items-center mb-1'>
            <Image
               src={`/crewSkills/${skill.xmlName}.png`}
               alt={skill.name || ''}
               width={80}
               height={80}
               className=''
            />
            <div className=''>
               <Typography variant='h6' fontWeight={700}>
                  {skill.name}
               </Typography>
               {skill.typeName === 'situational' ? (
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
            <Typography variant='body2'>{skill.description}</Typography>
         </div>
         {skill.typeName === 'situational' && (
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
