import { Metadata } from 'next'

type Props = {
   params: Promise<{ nation: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { nation } = await params
   const nationText = flagSources[nation].text
   return {
      title: `Tech tree for ${nationText} vehicles | World of Tanks Index`,
      description: `Tech tree for ${nationText} vehicles in World of Tanks game`,
   }
}

import returnVehicles from '@/lib/getVehicles'

import Image from 'next/image'
import Link from 'next/link'

import getIcon from '@/lib/getVehicleTypeIcon'
import { flagSources } from '@/Base/FlagLinks/FlagLinks'
import tiers from '@/lib/tierList'

import FlagLinks from '@/componentsTechtree/Header/FlagLinks'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default async function page({ params }: { params: Promise<{ nation: string }> }) {
   const { nation } = await params
   const allTechTreeVehicles = await returnVehicles(nation)
   return (
      <>
         <FlagLinks />
         <section className='w-3xl mx-auto my-11'>
            <div className='w-full my-3 flex flex-row justify-start items-center gap-6'>
               <Typography className='w-[50px]' variant='subtitle1'>
                  Nation
               </Typography>
               <Typography className='w-[30px]' variant='subtitle1'>
                  Type
               </Typography>
               <Typography variant='subtitle1'>Tier</Typography>
               <Typography className='w-[250px]' variant='subtitle1'>
                  Vehicle name
               </Typography>
               <Typography variant='subtitle1'>Credits</Typography>
            </div>
            {allTechTreeVehicles.map((techTreeVehicle, index) => (
               <div key={index} id={`tier-${index}`}>
                  <Link
                     id={techTreeVehicle.id?.toString()}
                     className='w-full flex flex-row justify-start items-center gap-6 
                     border-b-1 border-neutral-600 py-2 transition-all hover:bg-neutral-800'
                     href={`/${techTreeVehicle.id}/${techTreeVehicle.xmlId}`}
                     key={techTreeVehicle.id}
                  >
                     <div className='w-[50px] flex flex-row justify-center' title={techTreeVehicle.nation}>
                        <Image
                           src={flagSources[techTreeVehicle.nation].source}
                           alt={flagSources[techTreeVehicle.nation].alt}
                           width={90}
                           height={90}
                           className='object-cover w-[45px]'
                        />
                     </div>
                     <div className='w-[30px] flex flex-row justify-center' title={techTreeVehicle.type}>
                        <Image
                           src={getIcon(techTreeVehicle.type)}
                           alt={techTreeVehicle.name}
                           width={15}
                           height={15}
                        />
                     </div>
                     <Typography className='w-[30px] text-center' textAlign={'center'}>
                        {tiers[Number(techTreeVehicle.tier - 1)]}
                     </Typography>
                     <div className={'w-[250px] flex flex-row items-center '}>
                        <Image
                           src={techTreeVehicle.tankDetails?.images.contour_icon || ''}
                           width={65}
                           height={65}
                           alt={techTreeVehicle.name}
                        />
                        <Typography>{techTreeVehicle.tankDetails?.name}</Typography>
                     </div>
                     {techTreeVehicle.tier === 1 ? (
                        <Typography className='min-w-[80px]'>0</Typography>
                     ) : (
                        <Typography className='min-w-[80px]'>
                           {techTreeVehicle.price.toLocaleString()}
                        </Typography>
                     )}
                     <Button>More details</Button>
                  </Link>
               </div>
            ))}
         </section>
      </>
   )
}
