'use client'
import React from 'react'

import useGetModuleDetails from '../Hooks/useGetModuleDetails'

export default function DetailsTable() {
   useGetModuleDetails()
   return (
      <section className='w-full'>
         <h1>Details list</h1>
      </section>
   )
}
