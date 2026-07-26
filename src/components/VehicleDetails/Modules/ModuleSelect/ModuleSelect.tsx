'use client'
import { useState } from 'react'
import Image from 'next/image'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import Modules from './Components/Modules'
import Shells from './Components/Shells'
import Devices from './Components/Devices/Devices'
import CrewSkills from './Components/CrewSkills/CrewSkills'

export default function ModuleSelect() {
   const [value, setValue] = useState(0)

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue)
   }

   return (
      <>
         <aside className={'w-full flex flex-col items-center gap-4 py-5 xl:py-0 xl:w-[300px]'}>
            <Tabs
               variant='scrollable'
               scrollButtons='auto'
               value={value}
               onChange={handleChange}
               aria-label='basic tabs example'
            >
               <Tab
                  title='Modules'
                  icon={
                     <Image
                        src={'/icons/survivability/maxHealth.png'}
                        alt='Crew skills '
                        width={50}
                        height={50}
                     />
                  }
                  {...a11yProps(0)}
               />
               <Tab
                  title='Shells'
                  icon={
                     <Image
                        src={'/icons/shells/ARMOR_PIERCING.png'}
                        alt='Crew skills '
                        width={50}
                        height={50}
                     />
                  }
                  {...a11yProps(1)}
               />
               <Tab
                  title='Equipments'
                  icon={
                     <Image
                        src={'/icons/vehicle_modifiers/equipments/commandersView.png'}
                        alt='Crew skills '
                        width={50}
                        height={50}
                     />
                  }
                  {...a11yProps(2)}
               />
               <Tab
                  title='Crew Skills'
                  icon={
                     <Image
                        src={'/icons/vehicle_modifiers/crew_skills/brotherhood.png'}
                        alt='Crew skills '
                        width={50}
                        height={50}
                     />
                  }
                  {...a11yProps(3)}
               />
               <Tab
                  title='Field Modifications'
                  icon={
                     <Image
                        src={'/icons/field_modification/field_modification.png'}
                        alt='Crew skills '
                        width={50}
                        height={50}
                     />
                  }
                  {...a11yProps(4)}
               />
            </Tabs>
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
