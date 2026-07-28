import React from 'react'

interface TabPanelProps {
   children?: React.ReactNode
   index: number
   value: number
}

export default function CustomTabPanel({ index, value, children, ...other }: TabPanelProps) {
   return (
      <div
         className='my-4'
         role='tabpanel'
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && children}
      </div>
   )
}
