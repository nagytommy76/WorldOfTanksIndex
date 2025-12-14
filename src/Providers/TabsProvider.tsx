'use client'
import Link from 'next/link'
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

export default function TabsProvider({ baseHref }: { baseHref: string }) {
   const [value, setValue] = useState(0)

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
