import { useState, useEffect } from 'react'

import type { IMoe } from '@/types/MOE/moeTypes'

export default function useSlider(marksOfExcellence: IMoe[]) {
   const [moe, setMoe] = useState(marksOfExcellence)
   const NUMBER_OF_DAYS = 21

   useEffect(() => {
      setMoe(marksOfExcellence.slice(0, NUMBER_OF_DAYS))
   }, [marksOfExcellence])

   function handleSliderChange(event: Event, newValue: number) {
      const days = marksOfExcellence.length - newValue
      setMoe(marksOfExcellence.slice(days))
   }

   return { moe, NUMBER_OF_DAYS, handleSliderChange }
}
