'use client'
import type { IMoe } from '@/types/MOE/moeTypes'
import { CartesianGrid, Legend, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import useSlider from './Hooks/useSlider'

import MoeLegend from './Includes/MoeLegend'
import LineComponent from './Includes/LineComponent'

import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'

const COLORS = {
   p65: '#149103',
   p85: '#001bb6',
   p95: '#5700a8',
   p100: '#e8b108',
} as const

export default function Moe({ marksOfExcellence }: { marksOfExcellence: IMoe[] }) {
   const { handleSliderChange, moe, NUMBER_OF_DAYS } = useSlider(marksOfExcellence)
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
                  max={marksOfExcellence.length}
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
                  <LineComponent name='100%' color={COLORS.p100} dataKey='marks.100' />
                  <LineComponent name='95%' color={COLORS.p95} dataKey='marks.95' />
                  <LineComponent name='85%' color={COLORS.p85} dataKey='marks.85' />
                  <LineComponent name='65%' color={COLORS.p65} dataKey='marks.65' />

                  <Legend verticalAlign='bottom' align='center' content={<MoeLegend />} />
               </LineChart>
            </ResponsiveContainer>
         </div>
      </section>
   )
}
