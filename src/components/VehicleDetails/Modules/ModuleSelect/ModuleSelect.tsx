'use client'
import { useState } from 'react'

import Modules from './Components/Modules'
import Shells from './Components/Shells'
import Devices from './Components/Devices/Devices'
import CrewSkills from './Components/CrewSkills/CrewSkills'

import SingleTab from './Includes/ModuleTabs/SingleTab'
import CustomTabPanel from './Includes/ModuleTabs/CustomTabPanel'
import Typography from '@mui/material/Typography'

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
      <aside className={'flex flex-col items-center gap-4 py-5 xl:py-0 xl:w-[300px]'}>
         <div className='w-[275px] flex justify-center my-4 '>
            {Object.entries(Pages).map(([pageName, data], index) => {
               return (
                  <SingleTab
                     key={index}
                     title={data.title}
                     imgSrc={data.imgSrc}
                     pageName={pageName}
                     index={index}
                     handleChange={handleChange}
                     value={value}
                  />
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
         <CustomTabPanel value={value} index={4}>
            <Typography variant='h6'>Field Modifications are coming soon!</Typography>
         </CustomTabPanel>
      </aside>
   )
}
