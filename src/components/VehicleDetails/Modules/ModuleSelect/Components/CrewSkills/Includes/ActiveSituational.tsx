import { useContext } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'

import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'

export default function ActiveSituational() {
   const { isCalculateSituational, setIsCalculateSituational } = useContext(CrewContext)

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsCalculateSituational(event.target.checked)
   }

   return (
      <div className='flex flex-row items-center'>
         <FormGroup title='Turn on/off situational crew skills'>
            <FormControlLabel
               control={
                  <Switch
                     checked={isCalculateSituational}
                     onChange={handleChange}
                     slotProps={{ input: { 'aria-label': 'Active Situational' } }}
                  />
               }
               label='Active Situational'
            />
         </FormGroup>
      </div>
   )
}
