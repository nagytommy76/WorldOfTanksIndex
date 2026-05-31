import { useState } from 'react'

export default function useHandleToggleChange() {
   const [selectedSkills, setSelectedSkills] = useState<string[]>(() => [])

   function handleToggleChancge(event: React.MouseEvent<HTMLElement>, newFormats: string) {
      if (selectedSkills.includes(newFormats)) {
         const filteredCrewSkill = selectedSkills.filter((skill) => skill !== newFormats)
         setSelectedSkills(filteredCrewSkill)
      } else {
         setSelectedSkills((prevSelectedSkills) => [...prevSelectedSkills, newFormats])
      }
   }
   return { handleToggleChancge, selectedSkills }
}
