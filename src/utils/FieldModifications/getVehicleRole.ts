import { VEHICLE_ROLES, type VehicleRoles } from '@Types/types'

/**
 * @description Finds the vehicle role tag, which is also the key of the vehicle's field modification tree
 * @param tags Vehicle tags, e.g. ['mediumTank', 'role_MT_sniper', ...]
 * @returns e.g. 'role_MT_sniper', or null when the vehicle has no role
 */
export function getVehicleRole(tags: string[] | null | undefined): VehicleRoles | null {
   const role = tags?.find((tag) => VEHICLE_ROLES.includes(tag as VehicleRoles))
   return (role as VehicleRoles | undefined) ?? null
}
