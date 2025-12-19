'use client'
import React from 'react'
import type { IMoe, IMastery } from '@/types/MOE/moeTypes'
import Link from 'next/link'
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

import useSlider from './Hooks/useSlider'
import useQueryData from './Hooks/useQueryData'
import useSelect from './Hooks/useSelect'

import SliderComponent from './Includes/SliderComponent'
import TooltipComponent from './Includes/TooltipComponent'
import ServerSelect from './Includes/ServerSelect'

import Typography from '@mui/material/Typography'

export default function LineChartComponent({
   data,
   LegendComponent,
   LineComponent,
   headerText,
   YAxisLabel = 'Damage',
   dataMinMax = '350',
}: {
   data: IMoe[] | IMastery[]
   LegendComponent: React.ReactNode
   LineComponent: React.ReactNode
   headerText: string
   YAxisLabel?: string
   dataMinMax?: string
}) {
   const { server, handleChange } = useSelect()
   const { allData } = useQueryData(data, server)
   const { handleSliderChange, moe, NUMBER_OF_DAYS } = useSlider(allData === undefined ? data : allData)

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
                  {headerText} {server === 'eu' ? 'Europe' : server === 'com' ? 'North America' : 'Asia'}
               </Typography>
               <Typography gutterBottom variant='caption'>
                  Source of data:{' '}
                  <Link href={'https://poliroid.me/'} target='_blank'>
                     <Typography gutterBottom variant='caption' color='primary'>
                        Poliroid
                     </Typography>
                  </Link>
               </Typography>
            </div>
            <SliderComponent
               NUMBER_OF_DAYS={NUMBER_OF_DAYS}
               displayDays={moe.length}
               data={data}
               handleSliderChange={handleSliderChange}
            />
            <ServerSelect server={server} handleChange={handleChange} />
         </header>

         <div className={'w-full h-[360px]'}>
            <ResponsiveContainer>
               <LineChart data={moe} margin={{ top: 10, right: 26, left: 10, bottom: 10 }} responsive>
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
                     label={{ value: YAxisLabel, angle: -90, position: 'left' }}
                     domain={[`dataMin - ${dataMinMax}`, `dataMax + ${dataMinMax}`]}
                     dx={-15}
                  />
                  <Tooltip
                     animationDuration={50}
                     content={TooltipComponent}
                     cursor={{ stroke: 'rgba(255,255,255,0.12)' }}
                  />
                  {LineComponent}
                  {LegendComponent}
               </LineChart>
            </ResponsiveContainer>
         </div>
      </section>
   )
}
