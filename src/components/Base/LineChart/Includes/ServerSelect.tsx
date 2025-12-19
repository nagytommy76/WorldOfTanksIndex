import React from 'react'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { type SelectChangeEvent } from '@mui/material/Select'

export default function ServerSelect({
   handleChange,
   server,
}: {
   server: 'eu' | 'com' | 'asia'
   handleChange: (event: SelectChangeEvent) => void
}) {
   return (
      <div className='w-[200px] absolute top-1 left-1'>
         <FormControl fullWidth>
            <InputLabel id='server-select-label'>Select server</InputLabel>
            <Select
               labelId='server-select-label'
               id='server-select'
               value={server}
               label='Select server'
               onChange={handleChange}
            >
               <MenuItem value={'eu'} selected>
                  Europe
               </MenuItem>
               <MenuItem value={'com'}>North America</MenuItem>
               <MenuItem value={'asia'}>Asia</MenuItem>
            </Select>
         </FormControl>
      </div>
   )
}
