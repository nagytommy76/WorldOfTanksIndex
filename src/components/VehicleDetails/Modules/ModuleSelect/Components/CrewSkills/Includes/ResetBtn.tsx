import { useContext } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'

import Button from '@mui/material/Button'

export default function ResetBtn() {
   const { crewDispatch } = useContext(CrewContext)

   const handleResetSkills = () => {
      crewDispatch({ type: 'RESET_APPLIED_CREW_SKILLS' })
   }

   return (
      <Button onClick={handleResetSkills} size='small' variant='outlined'>
         Reset skills
      </Button>
   )
}
