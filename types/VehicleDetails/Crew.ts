export type ICrewRoles = 'commander' | 'driver' | 'gunner' | 'radioman' | 'loader'
export interface ICrewMembers {
   primary: ICrewRoles
   secondary: ICrewRoles[]
}
