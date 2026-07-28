import React from 'react'
import Image from 'next/image'

export default function SingleTab({
   title,
   pageName,
   imgSrc,
   index,
   value,
   handleChange,
}: {
   title: string
   pageName: string
   imgSrc: string
   index: number
   value: number
   handleChange: (event: React.SyntheticEvent, newValue: number) => void
}) {
   return (
      <div
         title={title}
         key={index}
         className={`cursor-pointer transition-all hover:bg-neutral-800 
                  ${value === index ? 'bg-neutral-600/40 border-b-3 border-b-amber-700' : 'border-b-3 border-b-amber-400'}
               `}
      >
         <Image
            src={imgSrc}
            alt={`${pageName}-image`}
            width={45}
            height={45}
            onClick={(event) => handleChange(event, index)}
            className={`w-[45px] h-[45px] object-cover m-1`}
         />
      </div>
   )
}
