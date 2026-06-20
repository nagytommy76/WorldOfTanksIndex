import type { ICrewRoles } from '@/Classes/CrewSkills'
import Member from './Member'
import affectedFields from './Roles'

export default class Commander extends Member {
   /**
    * @param primaryRole - The crew member's main role (commander, gunner, driver, loader, radioman)
    */
   primaryRole: 'commander'
   /**
    * @param primaryRole - The crew member's secondary role (commander, gunner, driver, loader, radioman)
    */
   secondaryRole: ICrewRoles[]
   /**
    * @description Which vehicle parameters this crew member affects, used to determine which stats to apply the crew formula to. E.g. commander affects circular vision radius, driver affects traverse speed and ground rotation speed, etc.
    */
   affectedVehicleStats: string[] // e.g. aiming time, reload time

   constructor({ secondaryRole }: { primaryRole: 'commander'; secondaryRole: ICrewRoles[] }) {
      super()
      this.primaryRole = 'commander'
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
}
