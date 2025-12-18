'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

interface LinkTabProps {
   label?: string
   href: string
   selected?: boolean
}

function LinkTab(props: LinkTabProps) {
   return <Tab component={Link as 'a' | typeof Link} aria-current={props.selected && 'page'} {...props} />
}

const PATHS: {
   [index: string]: {
      displayText: string
      index: number
   }
} = {
   modules: { displayText: 'Modules', index: 0 },
   excellence: { displayText: 'Marks of excellence', index: 1 },
   mastery: { displayText: 'Mastery Badge', index: 2 },
   wn8: { displayText: 'WN8', index: 3 },
}

export default function TabsProvider({ baseHref }: { baseHref: string }) {
   const pathname = usePathname().split('/')
   const currentPath = pathname[pathname.length - 1]

   const [value, setValue] = useState<number>(PATHS[currentPath].index)

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue)
   }
   return (
      <section className='my-7'>
         <Tabs value={value} onChange={handleChange} aria-label='nav tabs example' role='navigation'>
            {Object.entries(PATHS).map(([index, path]) => (
               <LinkTab key={path.index} label={path.displayText} href={`${baseHref}/${index}`} />
            ))}
         </Tabs>
      </section>
   )
}
