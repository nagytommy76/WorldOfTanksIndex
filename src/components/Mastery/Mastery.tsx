'use client'
import type { IMastery } from '@/types/MOE/moeTypes'

import { Legend } from 'recharts'

import LineChart from '@/Base/LineChart/LineChart'
import LineComponent from '@/Base/LineChart/Includes/LineComponent'
import MasteryLegend from './MasteryLegend'

const COLORS: string[] = ['#149103', '#001bb6', '#5700a8', '#e8b108']

export default function Mastery({ mastery }: { mastery: IMastery[] }) {
   return (
      <LineChart
         data={mastery}
         LegendComponent={<Legend verticalAlign='bottom' align='center' content={<MasteryLegend />} />}
         headerText='Mastery Badge requirement values for '
         YAxisLabel='Experience'
         dataMinMax='50'
         LineComponent={
            <>
               <LineComponent name='Ace Tanker' color={COLORS[3]} dataKey='mastery[3]' />
               <LineComponent name='1st Class' color={COLORS[2]} dataKey='mastery[2]' />
               <LineComponent name='2nd Class' color={COLORS[1]} dataKey='mastery[1]' />
               <LineComponent name='3rd Class' color={COLORS[0]} dataKey='mastery[0]' />
            </>
         }
      ></LineChart>
   )
}
