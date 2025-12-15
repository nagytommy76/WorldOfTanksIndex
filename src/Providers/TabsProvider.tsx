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

const PATHS: { [index: string]: number } = {
   modules: 0,
   excellence: 1,
   WN8: 2,
}

export default function TabsProvider({ baseHref }: { baseHref: string }) {
   const pathname = usePathname().split('/')
   const currentPath = pathname[pathname.length - 1]

   const [value, setValue] = useState(PATHS[currentPath])

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue)
   }
   return (
      <section className='my-7'>
         <Tabs value={value} onChange={handleChange} aria-label='nav tabs example' role='navigation'>
            <LinkTab label='Modules' href={`${baseHref}/modules`} />
            <LinkTab label='Marks of excellence' href={`${baseHref}/excellence`} />
            <LinkTab label='WN8' href={`${baseHref}/`} />
         </Tabs>
      </section>
   )
}
