'use client'

import MenuItem from '@mui/material/MenuItem'
import Image from 'next/image'
import Link from 'next/link'

import GermanyFlag from '@/Imagesgermany_small.png'
import USSRFlag from '@/Imagesussr_small.png'
import USAFlag from '@/Imagesusa_small.png'
import FrenchFlag from '@/Imagesfrance_small.png'
import UKFlag from '@/Imagesuk_small.png'
import ChinaFlag from '@/Imageschina_small.png'
import JapanFlag from '@/Imagesjapan_small.png'
import CzechFlag from '@/Imagesczech_small.png'
import PolandFlag from '@/Imagespoland_small.png'
import SwedenFlag from '@/Imagessweden_small.png'
import ItalyFlag from '@/Imagesitaly_small.png'

interface FlagArray {
   [index: string]: { source: string; alt: string; text: string }
}

const flagSources: FlagArray = {
   germany: { source: GermanyFlag.src, alt: 'Germany flag', text: 'Germany' },
   ussr: { source: USSRFlag.src, alt: 'U.S.S.R flag', text: 'U.S.S.R' },
   usa: { source: USAFlag.src, alt: 'U.S.A flag', text: 'U.S.A' },
   france: { source: FrenchFlag.src, alt: 'France flag', text: 'France' },
   uk: { source: UKFlag.src, alt: 'U.K flag', text: 'U.K' },
   china: { source: ChinaFlag.src, alt: 'China flag', text: 'China' },
   japan: { source: JapanFlag.src, alt: 'Japan flag', text: 'Japan' },
   czech: { source: CzechFlag.src, alt: 'Czech flag', text: 'Czechoslovakia' },
   poland: { source: PolandFlag.src, alt: 'Poland flag', text: 'Poland' },
   sweden: { source: SwedenFlag.src, alt: 'Sweden flag', text: 'Sweden' },
   italy: { source: ItalyFlag.src, alt: 'Italy flag', text: 'Italy' },
}

export default function Dropdown() {
   return (
      <>
         {Object.keys(flagSources).map((key) => {
            return (
               <Link href={`/techtree/${key}`} key={key}>
                  <MenuItem className={'w-[190px] flex flex-row gap-2'}>
                     <Image src={flagSources[key].source} alt={flagSources[key].alt} width={30} height={30} />{' '}
                     {flagSources[key].text}
                  </MenuItem>
               </Link>
            )
         })}
      </>
   )
}
