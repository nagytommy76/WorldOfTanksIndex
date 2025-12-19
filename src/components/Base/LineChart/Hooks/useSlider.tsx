import { useState, useEffect } from 'react'

import type { IMoe, IMastery } from '@/types/MOE/moeTypes'

export default function useSlider(data: IMoe[] | IMastery[]) {
   const [moe, setMoe] = useState<IMastery[] | IMoe[]>([])
   const NUMBER_OF_DAYS = 21

   useEffect(() => {
      const copiedData = [...data] // make a copy, don't modify the original data
      const slicedData = copiedData.splice(0, NUMBER_OF_DAYS)

      setMoe(slicedData.reverse())
   }, [data])

   function handleSliderChange(event: Event, newValue: number) {
      const copiedData = [...data]
      setMoe(copiedData.splice(0, newValue).reverse())
   }
   return { moe, NUMBER_OF_DAYS, handleSliderChange }
}
