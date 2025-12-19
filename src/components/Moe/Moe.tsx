'use client'
import type { IMoe } from '@/types/MOE/moeTypes'
import { Legend } from 'recharts'

import MoeLegend from './Includes/MoeLegend'
import LineChart from '@/Base/LineChart/LineChart'
import LineComponent from '@/Base/LineChart/Includes/LineComponent'

const COLORS = {
   p65: '#149103',
   p85: '#001bb6',
   p95: '#5700a8',
   p100: '#e8b108',
} as { [dataKey: string]: string }

export default function Moe({ marksOfExcellence }: { marksOfExcellence: IMoe[] }) {
   return (
      <LineChart
         data={marksOfExcellence}
         LegendComponent={<Legend verticalAlign='bottom' align='center' content={<MoeLegend />} />}
         headerText='Marks of Excellence expectation values for '
         LineComponent={
            <>
               <LineComponent name='100%' color={COLORS.p100} dataKey='marks.100' />
               <LineComponent name='95%' color={COLORS.p95} dataKey='marks.95' />
               <LineComponent name='85%' color={COLORS.p85} dataKey='marks.85' />
               <LineComponent name='65%' color={COLORS.p65} dataKey='marks.65' />
            </>
         }
      ></LineChart>
   )
}
