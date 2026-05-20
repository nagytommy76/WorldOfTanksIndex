'use client'

import Modules from './Components/Modules'
import Shells from './Components/Shells'
import Devices from './Components/Devices/Devices'
import CrewSkills from './Components/CrewSkills/CrewSkills'

export default function ModuleSelect() {
   return (
      <aside className={'w-full flex flex-col items-center gap-4 py-5 xl:py-0 xl:w-[300px]'}>
         <Modules />
         <Shells />
         <Devices />
         <CrewSkills />
      </aside>
   )
}
