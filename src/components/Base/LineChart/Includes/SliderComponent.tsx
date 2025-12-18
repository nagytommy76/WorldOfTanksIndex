import React from 'react'
import type { IMastery, IMoe } from '@/types/MOE/moeTypes'

import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'

export default function SliderComponent({
   data,
   NUMBER_OF_DAYS,
   displayDays,
   handleSliderChange,
}: {
   data: IMoe[] | IMastery[]
   NUMBER_OF_DAYS: number
   displayDays: number
   handleSliderChange: (event: Event, newValue: number) => void
}) {
   return (
      <div className='w-[270px] absolute top-1 right-1'>
         <Typography gutterBottom variant='body1'>
            Number of days to display: {displayDays}
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
   )
}
