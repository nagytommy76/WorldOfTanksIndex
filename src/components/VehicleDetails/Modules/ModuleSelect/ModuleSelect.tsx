'use client'
import { useState } from 'react'
import Image from 'next/image'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Modules from './Components/Modules'
import Shells from './Components/Shells'
import Devices from './Components/Devices/Devices'
import CrewSkills from './Components/CrewSkills/CrewSkills'

const Pages = {
   modules: {
      title: 'Modules',
      imgSrc: '/icons/survivability/maxHealth.png',
   },
   shells: {
      title: 'Shells',
      imgSrc: '/icons/shells/ARMOR_PIERCING.png',
   },
   equipments: {
      title: 'Equipments',
      imgSrc: '/icons/vehicle_modifiers/equipments/commandersView.png',
   },
   crew_skills: {
      title: 'Crew Skills',
      imgSrc: '/icons/vehicle_modifiers/crew_skills/brotherhood.png',
   },
   field_modifications: {
      title: 'Field Modifications',
      imgSrc: '/icons/field_modification/field_modification.png',
   },
}

export default function ModuleSelect() {
   const [value, setValue] = useState(0)

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue)
   }

   return (
      <>
         <aside className={'flex flex-col items-center gap-4 py-5 xl:py-0 xl:w-[300px]'}>
            <div className='max-w-full flex flex-row gap-3'>
               {Object.entries(Pages).map(([pageName, data], index) => {
                  return (
                     <>
                        <Image
                           src={data.imgSrc}
                           alt={`${pageName}-image`}
                           width={50}
                           height={50}
                           onClick={(event) => handleChange(event, index)}
                           className={`
                           cursor-pointer
                           transition-colors
                           hover:bg-neutral-800
                           ${value === index ? 'bg-amber-300' : ''} 
                           `}
                        />
                     </>
                  )
               })}
            </div>
            <CustomTabPanel value={value} index={0}>
               <Modules />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
               <Shells />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
               <Devices />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
               <CrewSkills />
            </CustomTabPanel>
         </aside>
      </>
   )
}

interface TabPanelProps {
   children?: React.ReactNode
   index: number
   value: number
}

function CustomTabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props

   return (
      <div
         role='tabpanel'
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
   )
}

function a11yProps(index: number) {
   return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   }
}
