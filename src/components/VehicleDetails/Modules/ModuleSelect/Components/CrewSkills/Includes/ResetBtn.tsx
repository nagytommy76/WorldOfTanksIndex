import { type Dispatch, type SetStateAction, useContext } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'

import Button from '@mui/material/Button'
import { CrewSkillRoles } from '@/src/Classes/CrewSkills'

export default function ResetBtn({
   setSelectedCounts,
}: {
   setSelectedCounts: Dispatch<SetStateAction<Partial<Record<CrewSkillRoles, number>>>>
}) {
   const { crewDispatch } = useContext(CrewContext)

   const handleResetSkills = () => {
      setSelectedCounts({
         common: 0,
         commander: 0,
         driver: 0,
         gunner: 0,
         loader: 0,
         radioman: 0,
      })
      crewDispatch({ type: 'RESET_APPLIED_CREW_SKILLS' })
   }

   return (
      <Button onClick={handleResetSkills} size='small' variant='outlined'>
         Reset skills
      </Button>
   )
}
