'use client'
import React from 'react'
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import useSlider from './Hooks/useSlider'

import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import type { IMoe, IMastery } from '@/types/MOE/moeTypes'

export default function LineChartComponent({
   data,
   LegendComponent,
   LineComponent,
}: {
   data: IMoe[] | IMastery[]
   LegendComponent: React.ReactNode
   LineComponent: React.ReactNode
}) {
   const { handleSliderChange, moe, NUMBER_OF_DAYS } = useSlider(data)

   return (
      <section
         className='py-12 px-6'
         style={{
            borderRadius: 5,
            background: 'radial-gradient(1200px 400px at 50% 0%, #1a253f 0%, #0b1220 45%, #050813 100%)',
         }}
      >
         <header style={{ textAlign: 'center', marginBottom: 12 }} className='relative'>
            <div className=''>
               <Typography gutterBottom variant='h5' fontWeight={700}>
                  Marks of Excellence expectation values for Europe
               </Typography>
               <Typography gutterBottom variant='caption'>
                  Source of data: Poliroid
               </Typography>
            </div>
            <div className='w-[270px] absolute top-1 right-1'>
               <Typography gutterBottom variant='body1'>
                  Number of days to display: {moe.length}
               </Typography>
               <Slider
                  aria-label='Days'
                  color='info'
                  defaultValue={NUMBER_OF_DAYS}
                  onChange={handleSliderChange}
                  valueLabelDisplay='auto'
                  step={2}
                  min={3}
                  max={data.length}
               />
            </div>
         </header>

         <div className={'w-full h-[360px]'}>
            <ResponsiveContainer>
               <LineChart data={moe} margin={{ top: 10, right: 26, left: 10, bottom: 10 }}>
                  <CartesianGrid stroke='rgba(255,255,255,.25)' vertical={false} />
                  <XAxis
                     dataKey='date'
                     tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 12 }}
                     tickLine={false}
                     axisLine={false}
                     interval={0}
                     angle={-45}
                     textAnchor='end'
                     height={60}
                  />
                  <YAxis
                     tickLine={false}
                     axisLine={false}
                     tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 12 }}
                     width={65}
                     label={{ value: 'Damage', angle: -90, position: 'left' }}
                     domain={['dataMin - 350', 'dataMax + 350']}
                     dx={-15}
                  />
                  {LineComponent}
                  {LegendComponent}
               </LineChart>
            </ResponsiveContainer>
         </div>
      </section>
   )
}
