// https://worldoftanks.fandom.com/wiki/Crew#Proficiency

import type { MeasureType, IRolesNonCommander } from '@/Classes/CrewSkills'
import affectedFields from './Roles'
import Member from './Member'

export default class CrewMember extends Member {
   /**
    * @param primaryRole - The crew member's main role (commander, gunner, driver, loader, radioman)
    */
   primaryRole: IRolesNonCommander
   /**
    * @param primaryRole - The crew member's secondary role (commander, gunner, driver, loader, radioman)
    */
   secondaryRole: IRolesNonCommander[]

   /**
    * @description Which vehicle parameters this crew member affects, used to determine which stats to apply the crew formula to. E.g. commander affects circular vision radius, driver affects traverse speed and ground rotation speed, etc.
    */
   affectedVehicleStats: string[] // e.g. aiming time, reload time
   /**
    * @description e.g. ventilation, brother in arms, extra combat ration
    */
   isCommanderBonusApplied?: boolean = undefined
   appliedCrewModifiers:
      | Map<
           string,
           {
              value: number
              paramName: string
           }
        >
      | undefined = undefined
   /**
    * @description e.g: driver_motorExpert: paramName: "vehPenaltyForDamagedEngine"
    */
   appliedCrewSkills:
      | Map<
           string,
           {
              situationalParam: boolean
              value: number
              paramName: string
              measureType: MeasureType
           }[]
        >
      | undefined = undefined

   constructor({
      primaryRole,
      secondaryRole,
   }: {
      primaryRole: IRolesNonCommander
      secondaryRole: IRolesNonCommander[]
   }) {
      super()
      this.primaryRole = primaryRole
      this.secondaryRole = secondaryRole

      this.affectedVehicleStats = this.setAffectedVehicleStats()
   }

   private setAffectedVehicleStats() {
      let affectedStats: string[] = []
      affectedStats = affectedFields[this.primaryRole]
      this.secondaryRole.map((role) => {
         affectedStats = affectedStats.concat(affectedFields[role])
      })
      return affectedStats
   }

   applyCommanderBonus() {
      const bonusLevel = this.efficiencyLevel * 0.1
      const efficiency = this.computeEfficiencyLevel()

      console.log('APPLY BONUS:::: ', this.primaryRole, bonusLevel)
      this.efficiencyLevel = efficiency + bonusLevel
   }

   removeCommanderBonus() {
      this.efficiencyLevel = this.computeEfficiencyLevel()
   }
}
