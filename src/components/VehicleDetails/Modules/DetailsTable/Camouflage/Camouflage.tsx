'use client'
import React from 'react'
import Image from 'next/image'

import Checkbox from '@mui/material/Checkbox'

export default function Camouflage() {
   return (
      <div>
         <Checkbox
            title='Paint camouflage on this vehicle'
            //   checked={checked}
            //   onChange={(e) => onChange(e.target.checked)}
            icon={baseImage}
            checkedIcon={checkedImage}
            disableRipple
            sx={{
               padding: 0,
            }}
         />
      </div>
   )
}

const baseImage = (
   <div className='relative h-[70px] w-[70px] overflow-hidden rounded-xs border-1 border-transparent transition-all'>
      <Image
         src={'/icons/concealment/camouflage.png'}
         className='profile-img'
         width={70}
         height={70}
         alt='camouflage'
      />
   </div>
)
const checkedImage = (
   <div className='relative h-[70px] w-[70px] overflow-hidden rounded-xs border-1 border-amber-400/80 transition-all'>
      <Image
         src={'/icons/concealment/camouflage.png'}
         className='profile-img'
         width={70}
         height={70}
         alt='camouflage'
      />
   </div>
)
