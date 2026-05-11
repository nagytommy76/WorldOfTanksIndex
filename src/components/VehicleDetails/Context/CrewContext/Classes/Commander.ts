import CrewMember from './Crew'

export default class Commander extends CrewMember {
   constructor({}: { primaryRole: 'commander'; secondaryRole: ICrewRoles[] }) {
      super({
         primaryRole: 'commander',
         secondaryRole: [],
      })
   }
}
