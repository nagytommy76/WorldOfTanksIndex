import { useContext, useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'

export default function useSetBlocked(boosterIcon: string, setIsBolcked: Dispatch<SetStateAction<boolean>>) {
   const { hasAppliedCrewBooster } = useContext(CrewContext)

   useEffect(() => {
      switch (hasAppliedCrewBooster) {
         case undefined:
            setIsBolcked(false)
            break
         case boosterIcon:
            setIsBolcked(false)
            break
         default:
            setIsBolcked(true)
            break
      }
   }, [hasAppliedCrewBooster, boosterIcon, setIsBolcked])
}
