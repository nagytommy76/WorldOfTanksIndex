import type { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'

export default function useSelect() {
   const [server, setServer] = useState<'eu' | 'com' | 'asia'>('eu')

   const handleChange = (event: SelectChangeEvent) => {
      setServer(event.target.value as 'eu' | 'com' | 'asia')
   }

   return { handleChange, server }
}
