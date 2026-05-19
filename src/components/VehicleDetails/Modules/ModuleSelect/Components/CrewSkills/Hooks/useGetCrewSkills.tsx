import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/Providers/AxiosProvider'

import CrewSkills, { type CrewSkillRoles } from '@/Classes/CrewSkills'

export default function useGetCrewSkills() {
   const { data } = useQuery<{
      data: { grouppedCrewSkills: { [Roles in CrewSkillRoles]: CrewSkills[] } }
   }>({
      queryKey: ['crewSkills'],
      queryFn: () => axiosInstance.get('/crew_skills'),
   })

   return data?.data.grouppedCrewSkills
}
