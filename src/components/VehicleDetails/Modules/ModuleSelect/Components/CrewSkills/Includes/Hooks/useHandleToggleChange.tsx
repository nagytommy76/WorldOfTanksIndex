import { useState } from 'react'

export default function useHandleToggleChange() {
   const [selectedSkills, setSelectedSkills] = useState<string[]>(() => [])

   function handleToggleChancge(event: React.MouseEvent<HTMLElement>, newFormats: string[]) {
      setSelectedSkills(newFormats)
   }
   return { handleToggleChancge, selectedSkills }
}
