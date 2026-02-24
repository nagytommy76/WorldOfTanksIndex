'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import { styled } from '@mui/material/styles'

const LinkTab = styled((props: LinkTabProps) => (
   <Tab component={Link as 'a' | typeof Link} aria-current={props.selected && 'page'} {...props} />
))(({ theme }) => ({
   minWidth: 0,
   [theme.breakpoints.up('sm')]: {
      minWidth: 0,
   },
   fontWeight: theme.typography.fontWeightBold,
   marginRight: 6,
   color: 'rgb(236, 236, 236)',
   backgroundColor: 'rgba(126, 125, 125, 0.329)',
   borderRadius: 3,
   '&:hover': {
      color: theme.palette.primary.main,
      opacity: 1,
   },
   '&.Mui-selected': {
      color: theme.palette.primary.main,
   },
   '&.Mui-focusVisible': {
      backgroundColor: '#924519',
   },
}))

interface LinkTabProps {
   label?: string
   href: string
   selected?: boolean
}

const PATHS: {
   [index: string]: {
      displayText: string
      index: number
   }
} = {
   modules: { displayText: 'Modules', index: 0 },
   gunmarks: { displayText: 'Marks of excellence', index: 1 },
   mastery: { displayText: 'Mastery Badge', index: 2 },
   // wn8: { displayText: 'WN8', index: 3 },
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
         <Tabs
            value={value}
            onChange={handleChange}
            aria-label='Vehicle tabs'
            role='navigation'
            variant='scrollable'
            scrollButtons='auto'
         >
            {Object.entries(PATHS).map(([index, path]) => (
               <LinkTab key={path.index} label={path.displayText} href={`${baseHref}/${index}`} />
            ))}
         </Tabs>
      </section>
   )
}
