'use client'

import MenuItem from '@mui/material/MenuItem'
import Image from 'next/image'
import Link from 'next/link'

import { flagSources } from '@/Base/FlagLinks/FlagLinks'

export default function Dropdown({ handleClose }: { handleClose: () => void }) {
   return (
      <>
         {Object.keys(flagSources).map((key) => {
            return (
               <Link href={`/techtree/${key}`} key={key}>
                  <MenuItem onClick={handleClose} className={'w-[190px] flex flex-row gap-2'}>
                     <Image src={flagSources[key].source} alt={flagSources[key].alt} width={30} height={30} />{' '}
                     {flagSources[key].text}
                  </MenuItem>
               </Link>
            )
         })}
      </>
   )
}
