// https://worldoftanks.fandom.com/wiki/Crew#Proficiency

import type { ICrewRoles } from '@/types/VehicleDetails/Crew'

export default class Crew {
   primaryRole: ICrewRoles
   secondaryRole: ICrewRoles[]
   efficiencyLevel?: number

   constructor({
      efficiencyLevel,
      primaryRole,
      secondaryRole,
   }: {
      primaryRole: ICrewRoles
      secondaryRole: ICrewRoles[]
      efficiencyLevel?: number
   }) {
      this.primaryRole = primaryRole
      this.secondaryRole = secondaryRole

      if (efficiencyLevel) this.efficiencyLevel = efficiencyLevel
      else this.setEfficiencyLevel()
   }

   private setEfficiencyLevel() {
      if (this.primaryRole === 'commander') this.efficiencyLevel = 100
      else this.efficiencyLevel = 110
   }
}
